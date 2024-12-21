import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => handleTabPress("Home")}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dqipg0or3/image/upload/v1733214581/avatars/zbk32ncj7njdmw3igbra.jpg",
            }}
            style={styles.headerImage}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress("Search")}>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 20,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImage: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  icon: {
    marginLeft: 10,
  },
});

export default Header;
