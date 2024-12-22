import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const saveToken = async (key, value) => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};

export const saveUserInfo = async (key, value) => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error("Failed to save userInfo:", error);
  }
};


export const getToken = async (key) => {
  try {
    if (Platform.OS === "web") {
      const token = await AsyncStorage.getItem(key);
      if (token) {
        console.log("Token retrieved:", token);
      } else {
        console.log("No token found");
      }
      return token;
    } else {
      const token = await SecureStore.getItemAsync(key);
      if (token) {
        console.log("Token retrieved:", token);
      } else {
        console.log("No token found");
      }
      return token;
    }
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

export const getUserInfo = async (key) => {
  try {
    if (Platform.OS === "web") {
      const userInfo = await AsyncStorage.getItem(key);
      if (userInfo) {
        console.log("userInfo retrieved:", userInfo);
      } else {
        console.log("No userInfo found");
      }
      return JSON.parse(userInfo);
    } else {
      const userInfo = await SecureStore.getItemAsync(key);
      if (userInfo) {
        console.log("userInfo retrieved:", userInfo);
      } else {
        console.log("No userInfo found");
      }
      return JSON.parse(token);
    }
  } catch (error) {
    console.error("Failed to retrieve userInfo:", error);
    return null;
  }
};

// Xóa token
export const deleteToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key); // Xóa dữ liệu
    console.log("Token deleted successfully!");
  } catch (error) {
    console.error("Failed to delete token:", error);
  }
};
