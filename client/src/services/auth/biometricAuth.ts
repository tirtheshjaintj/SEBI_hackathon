// biometricUtils.ts
import * as SecureStore from 'expo-secure-store';

const BIOMETRIC_PREF_KEY = 'biometric_enabled';

export const saveBiometricPreference = async (value: boolean) => {
    await SecureStore.setItemAsync(BIOMETRIC_PREF_KEY, JSON.stringify(value));
};

export const getBiometricPreference = async (): Promise<boolean> => {
    const value = await SecureStore.getItemAsync(BIOMETRIC_PREF_KEY);
    return value === 'true';
};
