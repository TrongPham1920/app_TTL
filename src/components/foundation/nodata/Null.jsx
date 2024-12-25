// components/NoData.jsx
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const NoData = ({ title = "Chưa có đơn" }) => {
  return (
    <View style={styles.centered}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dqipg0or3/image/upload/v1735137166/avatars/itqo3at1b1jyt5d21uxb.jpg",
        }}
        style={styles.noDataImage}
        resizeMode="contain"
      />
      <Text style={styles.noDataText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noDataImage: {
    width: 450,
    height: 400,
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "600",
  },
});

export default NoData;
