import { useEffect, useState } from "react";
import { accommodationuser } from "../../../api/app/app.js";

const FindModal = ({ route }) => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromdate] = useState("");

  const fetchData = async (filterParams) => {
    try {
      setLoading(true);
      const response = await accommodationuser(filterParams);
      if (response?.data) {
        setAccommodationData((prevData) => [...prevData, ...response.data]);
        setHasMore(response.data.length === pageSize);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route?.params) {
      const updatedParams = {
        ...filterParams,
        page: 0,
        ...route?.params,
      };

      fetchData(updatedParams);
      setFromdate(route?.params?.fromDate);
      setToDate(route?.params?.toDate);
    }
  }, [route?.params]);

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      const updatedParams = {
        limit: 20,
        page: 0,
        search: trimmedValue,
        fromDate: fromDate,
        toDate: toDate,
      };

      fetchData(updatedParams);
    } else {
      const updatedParams = {
        limit: 20,
        page: 0,
        fromDate: fromDate,
        toDate: toDate,
      };

      fetchData(updatedParams);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onOK = (info) => {
    const updatedParams = {
      ...filterParams,
      page: 0,
      ...info,
    };

    fetchData(updatedParams);
  };

  const handleEndReached = () => {
    if (
      loading || // Nếu đang tải dữ liệu
      !hasMore // Nếu không còn dữ liệu để tải
    ) {
      return;
    }

    setLoading(true);

    const updatedParams = {
      ...filterParams,
      page: page + 1, // Cập nhật trang để tải thêm
    };

    fetchData(updatedParams);
  };

  return {
    accommodationData,
    hasMore,
    loading,
    isModalVisible,
    inputValue,
    fromDate,
    toDate,
    setInputValue,
    toggleModal,
    onOK,
    handleSearch,
    handleEndReached,
  };
};

export default FindModal;
