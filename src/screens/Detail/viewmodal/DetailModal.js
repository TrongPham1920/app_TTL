import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { detailaccommodation } from "../../../api/app/app";

const DetailModal = ({ id, date }) => {
  const navigation = useNavigation();

  const [detailData, setDetailData] = useState({});
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    date && date.fromDate && date.toDate
      ? { fromDate: date.fromDate, toDate: date.toDate }
      : { fromDate: null, toDate: null }
  );

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await detailaccommodation(id);
      setDetailData(response?.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu detail accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setDetailData({});
    setSelectedDate(
      date && date.fromDate && date.toDate
        ? { fromDate: date.fromDate, toDate: date.toDate }
        : { fromDate: null, toDate: null }
    );
    fetchData(id);
  }, [id, date]);

  const goToRoomList = () => {
    if (!selectedDate?.fromDate || !selectedDate?.toDate) {
      setShowDateModal(true);
      return;
    }
    if (detailData?.type === 0) {
      navigation.navigate("ListRoom", {
        hotelId: detailData?.id,
        date: selectedDate,
        user: detailData?.user,
      });
    } else {
      navigation.navigate("Payment", {
        hotelId: detailData?.id,
        date: selectedDate,
        user: detailData?.user,
      });
    }
  };

  const handleToggleDescription = () => {
    setIsDescriptionLong(!isDescriptionLong);
  };

  const handleDateSelection = (fromDate, toDate) => {
    setSelectedDate({ fromDate, toDate });
    setShowDateModal(false);
    // Điều hướng ngay sau khi chọn ngày
    if (detailData?.type === 0) {
      navigation.navigate("ListRoom", {
        hotelId: detailData?.id,
        date: { fromDate, toDate },
        user: detailData?.user,
      });
    } else {
      navigation.navigate("Payment", {
        hotelId: detailData?.id,
        date: { fromDate, toDate },
        user: detailData?.user,
      });
    }
  };
  return {
    loading,
    detailData,
    setDetailData,
    isDescriptionLong,
    setIsDescriptionLong,
    setLoading,
    goToRoomList,
    fetchData,
    handleToggleDescription,
    showDateModal,
    selectedDate,
    setShowDateModal,
    handleDateSelection,
    setSelectedDate,
  };
};

export default DetailModal;
