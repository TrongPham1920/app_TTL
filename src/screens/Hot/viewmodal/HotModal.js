import { useState, useEffect } from "react";
import { accommodationuser } from "../../../api/app/app.js";

const useHotModal = () => {
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
      const response = await accommodationuser(filterParams);
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
    fetchData(filterParams);
  }, [filterParams]);

  return { accommodationData, loading };
};

export default useHotModal;
