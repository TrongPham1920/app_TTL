import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Footer = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    if (navigationState && navigationState.index !== undefined) {
      const currentRoute = navigationState.routes[navigationState.index].name;
      setActiveTab(currentRoute);
    }
  }, [navigationState]);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={[styles.footerItem, activeTab === "Home" && styles.activeTab]}
        onPress={() => handleTabPress("Home")}
      >
        <AntDesign
          name="home"
          size={24}
          color={activeTab === "Home" ? "#1E90FF" : "black"}
        />
        <Text
          style={[styles.footerText, activeTab === "Home" && styles.activeText]}
        >
          Trang chủ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerItem, activeTab === "Hot" && styles.activeTab]}
        onPress={() => handleTabPress("Hot")}
      >
        <MaterialIcons
          name="local-fire-department"
          size={24}
          color={activeTab === "Hot" ? "#1E90FF" : "black"}
        />
        <Text
          style={[styles.footerText, activeTab === "Hot" && styles.activeText]}
        >
          Hot
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerItem, activeTab === "Search" && styles.activeTab]}
        onPress={() => handleTabPress("Search")}
      >
        <AntDesign
          name="search1"
          size={24}
          color={activeTab === "Search" ? "#1E90FF" : "black"}
        />
        <Text
          style={[
            styles.footerText,
            activeTab === "Search" && styles.activeText,
          ]}
        >
          Tìm kiếm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerItem, activeTab === "Order" && styles.activeTab]}
        onPress={() => handleTabPress("Order")}
      >
        <Entypo
          name="text"
          size={24}
          color={activeTab === "Order" ? "#1E90FF" : "black"}
        />
        <Text
          style={[
            styles.footerText,
            activeTab === "Order" && styles.activeText,
          ]}
        >
          Đơn của tôi
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerItem, activeTab === "Profile" && styles.activeTab]}
        onPress={() => handleTabPress("Profile")}
      >
        <FontAwesome
          name="user-o"
          size={24}
          color={activeTab === "Profile" ? "#1E90FF" : "black"}
        />
        <Text
          style={[
            styles.footerText,
            activeTab === "Profile" && styles.activeText,
          ]}
        >
          Tài khoản
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  footerText: {
    color: "black",
    fontSize: 14,
  },
  activeText: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  activeTab: {},
});

export default Footer;
