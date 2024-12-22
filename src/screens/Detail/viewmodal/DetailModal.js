import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { detailaccommodation } from "../../../api/app/app";

const DetailModal = ({ id, date }) => {
  const navigation = useNavigation();

  const [detailData, setDetailData] = useState({});
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [loading, setLoading] = useState(true);

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
    fetchData(id);
  }, [id]);

  const goToRoomList = () => {
    if (detailData?.type === 0) {
      navigation.navigate("ListRoom", {
        hotelId: detailData?.id,
        date: date,
        user: detailData?.user,
      });
    } else {
      navigation.navigate("Payment", {
        hotelId: detailData?.id,
        date: date,
        user: detailData?.user,
      });
    }
  };

  const handleToggleDescription = () => {
    setIsDescriptionLong(!isDescriptionLong);
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
  };
};

export default DetailModal;
