import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getroom } from "../../../api/app/app.js";

const useHotModal = ({ route }) => {
  const navigation = useNavigation();
  const { hotelId, date, user } = route.params;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const handleRoomPress = (roomId) => {
    navigation.navigate("RoomDetail", { roomId });
  };

  const handleCheckboxChange = (roomId, price) => {
    setSelectedRooms((prev) => {
      const existingRoom = prev.find((room) => room.id === roomId);
      if (existingRoom) {
        return prev.filter((room) => room.id !== roomId);
      } else {
        return [...prev, { id: roomId, price }];
      }
    });
    setSelectedKey((prev) => {
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      } else {
        return [...prev, roomId];
      }
    });
  };

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, room) => total + room?.price, 0);
  };

  const fetchData = async (info) => {
    try {
      setLoading(true);
      const response = await getroom(info);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu room: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigation.navigate("Payment", { hotelId, selectedKey, date, user });
  };

  useEffect(() => {
    const newFilter = {
      ...filterParams,
      accommodationId: hotelId,
      fromDate: date.fromDate,
      toDate: date.toDate,
    };
    setSelectedKey([]);
    setSelectedRooms([]);
    fetchData(newFilter);
  }, [hotelId, date, user]);

  return {
    list,
    selectedKey,
    selectedRooms,
    loading,
    handleBookNow,
    calculateTotalPrice,
    handleCheckboxChange,
    handleRoomPress,
  };
};

export default useHotModal;
