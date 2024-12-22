import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import OrderList from "../../../components/foundation/list/OrderList";
import useHotModal from "../viewmodal/OrderModal";

const OrderScreen = ({ navigation }) => {
  const { accommodationData, loading } = useHotModal();

  return (
    <View style={styles.container}>
      {accommodationData && accommodationData.length > 0 ? (
        <OrderList
          loading={loading}
          data={accommodationData}
          navigation={navigation}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Chưa có đơn</Text>
          <Image
            source={require("../../../../assets/NoOrder.png")} 
            style={styles.noDataImage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#888", 
  },
  noDataImage: {
    width: 300, 
    height: 300, 
    resizeMode: "contain", 
  },
});

export default OrderScreen;
