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
    const unsubscribe = navigation.addListener("focus", () => {
      if (!loading && !profile) {
        navigation.navigate("Login");
      } else {
        fetchData(filterParams);
      }
    });
    return unsubscribe;
  }, [loading, profile, navigation]);

  return { accommodationData, loading };
};

export default useHotModal;
