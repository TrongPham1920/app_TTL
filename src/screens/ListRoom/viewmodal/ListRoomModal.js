import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getroom } from "../../../api/app/app.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const useHotModal = ({ route }) => {
  const navigation = useNavigation();

  const [params, setParams] = useState(route.params);

  const { hotelId, date, user } = params;

  const [list, setList] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);

  const [toDate, setToDate] = useState([]);
  const [fromDate, setFromDate] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

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

  const handleOpenDateModal = () => {
    setShowDateModal(true);
  };

  const handleCloseDateModal = () => {
    setShowDateModal(false);
  };

  const handleDateSelection = (fromDate, toDate) => {
    const formattedFromDate = dayjs(fromDate).format("DD/MM/YYYY");
    const formattedToDate = dayjs(toDate).format("DD/MM/YYYY");

    setParams((prev) => ({
      ...prev,
      ...route.params,
      date: {
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      },
    }));
    setShowDateModal(false);
  };

  useEffect(() => {
    const formattedFromDate = dayjs(date.fromDate, "DD/MM/YYYY").toDate();
    const formattedToDate = dayjs(date.toDate, "DD/MM/YYYY").toDate();
    setFromDate(formattedFromDate);
    setToDate(formattedToDate);

    const newFilter = {
      ...filterParams,
      accommodationId: hotelId,
      fromDate: date.fromDate,
      toDate: date.toDate,
    };

    setSelectedKey([]);
    setSelectedRooms([]);
    fetchData(newFilter);
  }, [params]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      ...route.params,
    }));
  }, [route.params]);

  return {
    list,
    selectedKey,
    selectedRooms,
    loading,
    params,
    hotelId,
    date,
    user,
    showDateModal,
    fromDate,
    toDate,
    setToDate,
    setFromDate,
    setParams,
    setShowDateModal,
    handleBookNow,
    calculateTotalPrice,
    handleCheckboxChange,
    handleRoomPress,
    handleCloseDateModal,
    handleOpenDateModal,
    handleDateSelection,
  };
};

export default useHotModal;
