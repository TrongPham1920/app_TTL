import React from "react";
import { StyleSheet, View } from "react-native";
import OrderList from "../../../components/foundation/list/OrderList";
import useHotModal from "../viewmodal/OrderModal";

const OrderScreen = ({ navigation }) => {
  const { accommodationData, loading } = useHotModal();

  return (
    <View style={styles.container}>
      <OrderList
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

export default OrderScreen;
