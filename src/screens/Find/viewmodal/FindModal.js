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

  const fetchData = async (filterParams, reset) => {
    try {
      setLoading(true);

      const response = await accommodationuser(filterParams);
      if (response?.data) {
        if (reset !== true) {
          setAccommodationData(response.data);
        } else {
          setAccommodationData((prevData) => [...prevData, ...response.data]);
        }

        const total = response.pagination?.total || 0;
        const fetchedDataLength = response.data.length;
        const totalPages = Math.ceil(total / pageSize);

        setHasMore(fetchedDataLength < total);
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
      setFilterParams(updatedParams);
      setLoading(true);
      fetchData(updatedParams, false);
      setFromdate(route?.params?.fromDate);
      setToDate(route?.params?.toDate);
    }
  }, [route?.params]);

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setLoading(true);

    if (trimmedValue) {
      const updatedParams = {
        limit: 20,
        page: 0,
        search: trimmedValue,
        fromDate: fromDate,
        toDate: toDate,
      };

      fetchData(updatedParams, false);
      setFilterParams(updatedParams);
    } else {
      const updatedParams = {
        limit: 20,
        page: 0,
        fromDate: fromDate,
        toDate: toDate,
      };

      fetchData(updatedParams, false);
      setFilterParams(updatedParams);
    }
  };

  const onOK = (info) => {
    setLoading(true);
    const updatedParams = {
      ...filterParams,
      page: 0,
      ...info,
      fromDate: fromDate,
      toDate: toDate,
    };

    setFilterParams(updatedParams);
    fetchData(updatedParams, false);
  };

  const handleEndReached = () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    const updatedParams = {
      ...filterParams,
      page: page + 1,
    };
    setPage(page + 1);
    setFilterParams(updatedParams);
    fetchData(updatedParams, true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    console.log(filterParams);
  }, [filterParams]);

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
