import * as SecureStore from "expo-secure-store";

/**
 * Save a value securely
 * @param key Storage key
 * @param value Value to store (string)
 */
export async function saveItem(key: string, value: any): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error saving to SecureStore:", error);
  }
}

/**
 * Get a stored value securely
 * @param key Storage key
 * @returns Stored value or null if not found
 */
export async function getSavedItem(key: string): Promise<any | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("Error reading from SecureStore:", error);
    return null;
  }
}

/**
 * Remove a stored value
 * @param key Storage key
 */
export async function removeSavedItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing from SecureStore:", error);
  }
}
