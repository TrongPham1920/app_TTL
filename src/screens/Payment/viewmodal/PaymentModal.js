import { useEffect, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../global/context/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const usePaymentModal = ({ route }) => {
  const { profile } = useAuth();
  const navigation = useNavigation();
  const { hotelId, selectedKey, date, user } = route.params;

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [qr, setQr] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
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
    }
  }, [route.params]);

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

      setLoading(true);

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
    } finally {
      setLoading(false);
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
    guestEmail,
    guestPhone,
    isModalVisible,
    loading,
    isImageLoading,
    setIsImageLoading,
    handleConfirm,
    handleCancel,
    setIsModalVisible,
    setGuestPhone,
    setGuestEmail,
    setGuestName,
    handleDownloadImage,
  };
};

export default usePaymentModal;
