import React from "react";
import { StyleSheet, View } from "react-native";
import CustomList from "../../../components/foundation/list/CustomList";
import useHotModal from "../viewmodal/HotModal";

const ShowAllScreen = ({ navigation }) => {
  const { accommodationData, loading } = useHotModal();

  return (
    <View style={styles.container}>
      <CustomList
        loading={loading}
        data={accommodationData}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default ShowAllScreen;
