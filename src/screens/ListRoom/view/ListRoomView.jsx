import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import FormatUtils from "../../../../utils/format/Format";
import useListRoomModal from "../viewmodal/ListRoomModal";
import Null from "../../../components/foundation/nodata/Null";

const getRoomType = (type) => {
  switch (type) {
    case 1:
      return "Phòng đơn";
    case 2:
      return "Phòng đôi";
    case 3:
      return "Phòng Deluxe";
    case 4:
      return "Phòng Suit";
    default:
      return "";
  }
};

const ListRoomView = () => {
  const route = useRoute();
  const {
    list,
    selectedKey,
    selectedRooms,
    loading,
    handleBookNow,
    calculateTotalPrice,
    handleCheckboxChange,
    handleRoomPress,
  } = useListRoomModal({ route });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (!list || list.length === 0) {
    return <Null title="Ngày bạn chọn không khả dụng hãy chọn ngày khác" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomCard}>
            <TouchableOpacity
              style={styles.roomCardTouchable}
              onPress={() => handleRoomPress(item.id)}
            >
              <View style={styles.header}>
                <View style={styles.roomInfoHeader}>
                  <Text style={styles.roomName}>{item?.roomName}</Text>
                  <Text style={styles.roomType}>{getRoomType(item?.type)}</Text>
                </View>
                <CheckBox
                  // style={styles.checkbox}
                  checked={selectedRooms.some((room) => room.id === item.id)}
                  onPress={() => handleCheckboxChange(item?.id, item?.price)}
                  size={30}
                />
              </View>

              <Image source={{ uri: item?.avatar }} style={styles.roomImage} />
              <View style={styles.roomInfo}>
                <View style={styles.roomDetailRow}>
                  <Icon name="arrows-alt" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>
                    {FormatUtils.formatSquareMeter(item?.acreage)}
                  </Text>
                </View>

                <View style={styles.roomDetailRow}>
                  <Icon name="bed" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>{item?.numBed} Giường</Text>
                </View>

                <View style={styles.roomDetailRow}>
                  <Icon name="bath" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>
                    {item?.numTolet} Phòng tắm
                  </Text>
                </View>
              </View>
              <View style={styles.roomInfoRow}>
                <View style={styles.people}>
                  <Icon name="users" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>
                    Tối đa {item?.people} người
                  </Text>
                </View>

                <Text style={styles.roomPrice}>
                  {FormatUtils.vndPrice(item?.price)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.totalPriceText}>
          Tạm tính: {FormatUtils.vndPrice(calculateTotalPrice())}
        </Text>
        <TouchableOpacity
          style={[
            styles.bookNowButton,
            selectedRooms.length === 0 && styles.disabledButton,
          ]}
          onPress={handleBookNow}
          disabled={selectedRooms.length === 0}
        >
          <Text style={styles.bookNowText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  roomCard: {
    position: "relative",
    flexDirection: "column",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fffefc",
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 20,
  },
  roomCardTouchable: {
    position: "relative",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  roomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  roomDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  roomInfoText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#57370D",
  },
  roomInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  people: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  roomType: {
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
    marginBottom: 5,
  },
  roomPrice: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "800",
    color: "#bd0d0d",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityInput: {
    width: 50,
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    fontSize: 16,
    marginLeft: 10,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bookNowButton: {
    backgroundColor: "#004E9A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  bookNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListRoomView;
