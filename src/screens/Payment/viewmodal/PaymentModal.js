import { useEffect, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../global/context/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { createOder } from "../../../api/app/app.js";

const usePaymentModal = ({ route }) => {
  const { profile } = useAuth();
  const navigation = useNavigation();
  const { hotelId, selectedKey, date, user } = route.params;

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [qr, setQr] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const { fromDate, toDate } = date || [];
  const checkInDate = fromDate;
  const checkOutDate = toDate;

  useEffect(() => {
    if (user) {
      const url = `https://img.vietqr.io/image/${user?.bankShortName}-${user?.accountNumber}-compact.jpg?amount=100000&addInfo=Chuyen khoan dat phong - ${hotelId}`;

      Image.prefetch(url)
        .then(() => {
          setQr(url);
          setIsImageLoading(false);
        })
        .catch(() => {
          setIsImageLoading(false);
          Toast.show({
            type: "error",
            text1: "Lỗi tải ảnh",
            text2: "Không thể tải ảnh QR",
          });
        });
      setGuestPhone("");
      setGuestName("");
    }
  }, [route.params]);

  const handleCcheck = async () => {
    if (!profile && (!guestName || !guestPhone || !guestEmail)) {
      setIsModalVisible(true);
      return;
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(false);

      const values = profile
        ? {
            userId: profile?.id,
            accommodationId: +hotelId,
            ...(selectedKey && { roomId: selectedKey }),
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          }
        : {
            guestName: guestName,
            guestPhone: guestPhone,
            accommodationId: +hotelId,
            ...(selectedKey && { roomId: selectedKey }),
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          };

      const response = await createOder(values);

      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.mess,
          text2: "Bạn đã đặt phòng thành công",
        });
        setGuestPhone("");
        setGuestName("");
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
      console.log(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đặt phòng thất bại!!!",
        text2: "Đã xảy ra lỗi, vui lòng thử lại!!!",
      });
    } finally {
      setLoading(true);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const downloadImageToGallery = async (url, fileName) => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Toast.show({
          type: "error",
          text1: "Quyền bị từ chối",
          text2: "Vui lòng cấp quyền để lưu ảnh.",
        });
        return;
      }

      const fileUri = FileSystem.documentDirectory + fileName;
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);

      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      Toast.show({
        type: "success",
        text1: "Tải ảnh thành công",
        text2: "Ảnh đã được lưu vào thư viện.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi tải ảnh",
        text2: "Không thể tải ảnh về thiết bị.",
      });
      console.error(error);
    }
  };

  const handleDownloadImage = () => {
    if (!qr) {
      Toast.show({
        type: "error",
        text1: "Không có ảnh",
        text2: "Không thể tải ảnh vì URL không tồn tại.",
      });
      return;
    }

    const fileName = `qr-${hotelId}.jpg`;
    downloadImageToGallery(qr, fileName);
  };

  return {
    qr,
    guestName,
    guestPhone,
    isModalVisible,
    loading,
    isImageLoading,
    setIsImageLoading,
    handleConfirm,
    handleCcheck,
    handleCancel,
    setIsModalVisible,
    setGuestPhone,
    setGuestName,
    handleDownloadImage,
  };
};

export default usePaymentModal;
