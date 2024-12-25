import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getOrder } from "../../../api/app/app.js";
import { useAuth } from "../../../global/context/AuthenticationContext";

const useHotModal = () => {
  const navigation = useNavigation();
  const { profile } = useAuth();

  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const fetchData = async (filterParams) => {
    try {
      const response = await getOrder(filterParams);
      if (response?.data) {
        setAccommodationData(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      if (!profile) {
        navigation.navigate("Login");
      } else if (profile) {
        fetchData(filterParams);
      }
    };

    const unsubscribe = navigation.addListener("focus", handleFocus);

    return () => {
      unsubscribe();
    };
  }, [profile, navigation]);

  return { accommodationData, loading };
};

export default useHotModal;
