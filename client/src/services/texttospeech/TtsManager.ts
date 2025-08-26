import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const { TextToSpeechModule } = NativeModules;

type Voice = {
    name: string;
    locale: string;
    isNetworkConnectionRequired: boolean;
    isNotInstalled: boolean;
    isDefault: boolean;
    isSynthetic: boolean;
};

type EventCallback = () => void;

class TtsManager {
    private static instance: TtsManager;

    private eventEmitter = new NativeEventEmitter(TextToSpeechModule);

    private pitch = 1.0;
    private rate = 1.0;
    private voiceName: string | null = null;
    private language = 'en-US';

    private onStartCallbacks: EventCallback[] = [];
    private onDoneCallbacks: EventCallback[] = [];
    private onErrorCallbacks: EventCallback[] = [];

    private constructor() {
        this.subscribeToEvents();
    }

    public static getInstance(): TtsManager {
        if (!TtsManager.instance) {
            TtsManager.instance = new TtsManager();
        }
        return TtsManager.instance;
    }

    private subscribeToEvents() {
        this.eventEmitter.addListener('tts-start', () => {
            this.onStartCallbacks.forEach(cb => cb());
        });
        this.eventEmitter.addListener('tts-done', () => {
            this.onDoneCallbacks.forEach(cb => cb());
        });
        this.eventEmitter.addListener('tts-error', () => {
            this.onErrorCallbacks.forEach(cb => cb());
        });
    }

    async init(language = 'en-US'): Promise<void> {
        await TextToSpeechModule.init();
        await this.setLanguage(language);
        await this.setPitch(this.pitch);
        await this.setSpeechRate(this.rate);
        if (this.voiceName) {
            try {
                await this.setVoice(this.voiceName);
            } catch {
                // ignore voice setting failure
            }
        }
    }

    async getAvailableVoices(): Promise<Voice[]> {
        if (Platform.OS === 'android') {
            return await TextToSpeechModule.getAvailableVoices();
        } else {
            return []; // Extend for iOS if needed
        }
    }

    async setVoice(voiceName: string): Promise<void> {
        await TextToSpeechModule.setVoice(voiceName);
        this.voiceName = voiceName;
    }

    async setLanguage(languageTag: string): Promise<void> {
        await TextToSpeechModule.setLanguage(languageTag);
        this.language = languageTag;
    }

    async setSpeechRate(rate: number): Promise<void> {
        if (rate < 0.1 || rate > 3) {
            throw new Error('Speech rate must be between 0.1 and 3');
        }
        await TextToSpeechModule.setSpeechRate(rate);
        this.rate = rate;
    }

    async setPitch(pitch: number): Promise<void> {
        if (pitch < 0.5 || pitch > 2) {
            throw new Error('Pitch must be between 0.5 and 2');
        }
        await TextToSpeechModule.setPitch(pitch);
        this.pitch = pitch;
    }

    async speak(text: string): Promise<void> {
        if (!text) throw new Error('Text is required to speak');
        await TextToSpeechModule.speak(text);
    }

    async stop(): Promise<void> {
        await TextToSpeechModule.stop();
    }

    async isSpeaking(): Promise<boolean> {
        return await TextToSpeechModule.isSpeaking();
    }

    // Event subscriptions (add / remove listeners)
    onStart(callback: EventCallback) {
        this.onStartCallbacks.push(callback);
    }

    onDone(callback: EventCallback) {
        this.onDoneCallbacks.push(callback);
    }

    onError(callback: EventCallback) {
        this.onErrorCallbacks.push(callback);
    }

    // Optional: remove listeners
    removeOnStart(callback: EventCallback) {
        this.onStartCallbacks = this.onStartCallbacks.filter(cb => cb !== callback);
    }

    removeOnDone(callback: EventCallback) {
        this.onDoneCallbacks = this.onDoneCallbacks.filter(cb => cb !== callback);
    }

    removeOnError(callback: EventCallback) {
        this.onErrorCallbacks = this.onErrorCallbacks.filter(cb => cb !== callback);
    }
}

export default TtsManager.getInstance();
