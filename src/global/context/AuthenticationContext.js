import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { logout } from "../../api/app/app";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Đăng xuất
  const onLogout = useCallback(async () => {
    try {
      await logout();

      await SecureStore.deleteItemAsync("profile");
      await SecureStore.deleteItemAsync("accessToken");

      setProfile(null);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [navigation]);

  // Đăng nhập
  const onLogin = (data) => {
    SecureStore.setItemAsync("profile", JSON.stringify(data?.user_info));
    SecureStore.setItemAsync("accessToken", JSON.stringify(data?.accessToken));

    setProfile(data?.user_info);
    navigation.navigate("Home");
  };

  const updateProfile = async (newProfileData) => {
    try {
      SecureStore.deleteItemAsync("profile");
      SecureStore.setItemAsync("profile", JSON.stringify(newProfileData));
      setProfile(newProfileData);
    } catch (error) {
      console.error("Error saving profile to SecureStore:", error);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await SecureStore.getItemAsync("profile");
        const tokenData = await SecureStore.getItemAsync("accessToken");

        if (profileData) {
          const profile = JSON.parse(profileData);
          setProfile(profile);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const isAuthenticated = () => {
    return !!profile;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onLogin,
        loading,
        onLogout,
        profile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
