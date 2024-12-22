// components/Loading.jsx
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#1E90FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
