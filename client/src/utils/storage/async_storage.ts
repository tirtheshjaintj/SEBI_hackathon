import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a value to AsyncStorage
 * @param key Storage key
 * @param value Value to store (any)
 */
export async function saveItem(key: string, value: any): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to AsyncStorage:', error);
  }
}

/**
 * Get a stored value from AsyncStorage
 * @param key Storage key
 * @returns Stored value or null if not found
 */
export async function getSavedItem(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error reading from AsyncStorage:', error);
    return null;
  }
}

/**
 * Remove a stored value from AsyncStorage
 * @param key Storage key
 */
export async function removeSavedItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from AsyncStorage:', error);
  }
}
