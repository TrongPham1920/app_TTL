import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { createOder } from "../../../api/app/app";
import { useAuth } from "../../../global/context/AuthenticationContext";

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { hotelId, selectedKey, date, user } = route.params;
  const { profile } = useAuth();
  const [qr, setQr] = useState("");

  const { fromDate, toDate } = date || [];
  const checkInDate = fromDate ? dayjs(fromDate).format("DD/MM/YYYY") : null;
  const checkOutDate = toDate ? dayjs(toDate).format("DD/MM/YYYY") : null;

  useEffect(() => {
    setQr(
      `https://img.vietqr.io/image/${user?.bankShortName}-${user?.accountNumber}-compact.jpg?amount=100000&addInfo=Chuyen khoan dat phong - ${hotelId}`
    );
  }, [hotelId, selectedKey, date, user, profile]);

  const handleConfirm = async () => {
    try {
      let values;
      if (profile) {
        values = {
          userId: profile?.id,
          accommodationId: +hotelId,
          roomId: selectedKey,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        };
      } else {
        values = {
          guestName: guestName,
          guestEmail: guestEmail,
          guestPhone: guestPhone,
          accommodationId: +hotelId,
          roomId: selectedKey,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        };
      }

      const response = await createOder(values);

      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.mess,
          text2: "Kiểm tra hộp thư của bạn để nhận mã.",
        });
        navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Đặt phòng thất bại!!",
          text2: response?.mess || "Đã xảy ra lỗi.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đặt phòng thất bại!!",
        text2: "Đã xảy ra lỗi, vui lòng thử lại.",
      });
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.qrText}>Quét mã QR để được xác nhận nhanh hơn</Text>

      <Image source={{ uri: qr }} style={styles.qrImage} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  qrText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  qrImage: {
    width: "80%",
    height: 400,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 60,
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#1E90FF",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Payment;
