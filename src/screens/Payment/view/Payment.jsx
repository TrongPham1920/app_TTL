import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { createOder } from "../../../api/app/app";
import { useAuth } from "../../../global/context/AuthenticationContext";
import GuestModal from "../modal/GuestModal";
import QRModal from "../modal/QRModal";

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { hotelId, selectedKey, date, user } = route.params;

  const { profile } = useAuth();
  const [qr, setQr] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const { fromDate, toDate } = date || [];
  const checkInDate = fromDate;
  const checkOutDate = toDate;

  useEffect(() => {
    setQr(
      `https://img.vietqr.io/image/${user?.bankShortName}-${user?.accountNumber}-compact.jpg?amount=100000&addInfo=Chuyen khoan dat phong - ${hotelId}`
    );
  }, [hotelId, selectedKey, date, user, profile]);

  const handleConfirm = async () => {
    if (!profile && (!guestName || !guestPhone || !guestEmail)) {
      setIsModalVisible(true);
      return;
    }

    try {
      const values = profile
        ? {
            userId: profile?.id,
            accommodationId: +hotelId,
            roomId: selectedKey,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          }
        : {
            guestName: guestName,
            guestEmail: guestEmail,
            guestPhone: guestPhone,
            accommodationId: +hotelId,
            roomId: selectedKey,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          };

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

      <TouchableOpacity
        onPress={() => setIsQrModalVisible(true)}
        style={styles.qrTouchable}
      >
        <Image source={{ uri: qr }} style={styles.qrImage} />
      </TouchableOpacity>

      <View style={styles.transparentButtonContainer}>
        <TouchableOpacity style={[styles.button, styles.transparentButton]}>
          <Text style={styles.transparentButtonText}>Tải lại mã QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.transparentButton]}>
          <Text style={styles.transparentButtonText}>Lưu mã QR về máy</Text>
        </TouchableOpacity>
      </View>

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

      <GuestModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        guestName={guestName}
        setGuestName={setGuestName}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
        guestPhone={guestPhone}
        setGuestPhone={setGuestPhone}
        onConfirm={() => {
          setIsModalVisible(false);
          handleConfirm();
        }}
      />

      <QRModal
        visible={isQrModalVisible}
        qrCode={qr}
        onClose={() => setIsQrModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  qrText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  qrTouchable: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 400,
  },
  qrImage: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    borderRadius: 10,
  },
  transparentButtonContainer: {
    marginTop: 20,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transparentButton: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "transparent",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  transparentButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
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
