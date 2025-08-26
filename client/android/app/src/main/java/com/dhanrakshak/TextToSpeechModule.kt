package com.dhanrakshak

import android.os.Build
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.*

@ReactModule(name = TextToSpeechModule.NAME)
class TextToSpeechModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), TextToSpeech.OnInitListener {

    companion object {
        const val NAME = "TextToSpeechModule"
    }

    private var tts: TextToSpeech? = null
    private var isInitialized = false
    private var initPromise: Promise? = null

    private var selectedVoiceName: String? = null
    private var language: Locale = Locale.US
    private var speechRate: Float = 1.0f
    private var pitch: Float = 1.0f

    override fun getName(): String = NAME

    override fun initialize() {
        super.initialize()
        tts = TextToSpeech(reactApplicationContext, this)
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val result = tts?.setLanguage(language)
            isInitialized = result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED
            setupUtteranceListener()
            initPromise?.let {
                if (isInitialized) it.resolve(true) else it.reject("E_TTS_LANG_NOT_SUPPORTED", "Language not supported")
                initPromise = null
            }
        } else {
            isInitialized = false
            initPromise?.reject("E_TTS_INIT_FAILED", "TTS initialization failed")
            initPromise = null
        }
    }

    private fun setupUtteranceListener() {
        tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) {
                sendEvent("tts-start", null)
            }

            override fun onDone(utteranceId: String?) {
                sendEvent("tts-done", null)
            }

            override fun onError(utteranceId: String?) {
                sendEvent("tts-error", null)
            }

            @Deprecated("Deprecated in Java")
            override fun onError(utteranceId: String?, errorCode: Int) {
                sendEvent("tts-error", null)
            }
        })
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    @ReactMethod
    fun init(promise: Promise) {
        if (tts == null) {
            tts = TextToSpeech(reactApplicationContext, this)
            initPromise = promise
        } else {
            if (isInitialized) {
                promise.resolve(true)
            } else {
                initPromise = promise
            }
        }
    }

    @ReactMethod
    fun setLanguage(languageTag: String, promise: Promise) {
        try {
            val loc = Locale.forLanguageTag(languageTag)
            language = loc
            if (!isInitialized) {
                promise.reject("E_TTS_NOT_INITIALIZED", "TTS not initialized")
                return
            }
            val res = tts?.setLanguage(loc)
            if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                promise.reject("E_TTS_LANG_NOT_SUPPORTED", "Language not supported")
            } else {
                promise.resolve(true)
            }
        } catch (e: Exception) {
            promise.reject("E_TTS_LANG_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getAvailableVoices(promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TTS not initialized")
            return
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val voices = tts?.voices
            val result = Arguments.createArray()
            voices?.forEach { voice ->
                val map = Arguments.createMap()
                map.putString("name", voice.name)
                map.putString("locale", voice.locale.toLanguageTag())
                map.putBoolean("isNetworkConnectionRequired", voice.isNetworkConnectionRequired)

                // Add voice features as array
                val featuresArray = Arguments.createArray()
                voice.features.forEach { feature ->
                    featuresArray.pushString(feature)
                }
                map.putArray("features", featuresArray)

                result.pushMap(map)
            }
            promise.resolve(result)
        } else {
            promise.reject("E_TTS_VOICE_UNSUPPORTED", "Voices are only supported on API 21+")
        }
    }

    @ReactMethod
    fun setVoice(voiceName: String, promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TTS not initialized")
            return
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val voice = tts?.voices?.firstOrNull { it.name == voiceName }
            if (voice != null) {
                val result = tts?.setVoice(voice)
                selectedVoiceName = voiceName
                if (result == TextToSpeech.SUCCESS) {
                    promise.resolve(true)
                } else {
                    promise.reject("E_TTS_VOICE_FAILED", "Failed to set voice")
                }
            } else {
                promise.reject("E_TTS_VOICE_NOT_FOUND", "Voice not found")
            }
        } else {
            promise.reject("E_TTS_VOICE_UNSUPPORTED", "Voices only supported on API 21+")
        }
    }

    @ReactMethod
    fun setSpeechRate(rate: Double, promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TTS not initialized")
            return
        }
        speechRate = rate.toFloat()
        val result = tts?.setSpeechRate(speechRate)
        if (result == TextToSpeech.SUCCESS) {
            promise.resolve(true)
        } else {
            promise.reject("E_TTS_RATE_FAILED", "Failed to set speech rate")
        }
    }

    @ReactMethod
    fun setPitch(p: Double, promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TTS not initialized")
            return
        }
        pitch = p.toFloat()
        val result = tts?.setPitch(pitch)
        if (result == TextToSpeech.SUCCESS) {
            promise.resolve(true)
        } else {
            promise.reject("E_TTS_PITCH_FAILED", "Failed to set pitch")
        }
    }

    @ReactMethod
    fun speak(text: String, promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TextToSpeech not initialized")
            return
        }
        val params = Bundle()
        val utteranceId = UUID.randomUUID().toString()

        val res = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId)
        } else {
            @Suppress("DEPRECATION")
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null)
        }

        if (res == TextToSpeech.SUCCESS) {
            promise.resolve(true)
        } else {
            promise.reject("E_TTS_SPEAK_FAILED", "Failed to speak")
        }
    }

    @ReactMethod
    fun stop(promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TextToSpeech not initialized")
            return
        }
        val res = tts?.stop()
        if (res == TextToSpeech.SUCCESS) {
            promise.resolve(true)
        } else {
            promise.reject("E_TTS_STOP_FAILED", "Failed to stop")
        }
    }

    @ReactMethod
    fun isSpeaking(promise: Promise) {
        if (!isInitialized) {
            promise.reject("E_TTS_NOT_INITIALIZED", "TextToSpeech not initialized")
            return
        }
        promise.resolve(tts?.isSpeaking ?: false)
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        tts?.stop()
        tts?.shutdown()
        tts = null
        isInitialized = false
    }
}
