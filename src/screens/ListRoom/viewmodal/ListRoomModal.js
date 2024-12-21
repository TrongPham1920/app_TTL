import { useState, useEffect } from "react";
import { getroom } from "../../../api/app/app.js";

const useHotModal = () => {
  const [list, setList] = useState([]);

  const [generalLoading, setGeneralLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const fetchData = async (filterParams) => {
    try {
      setGeneralLoading(true);
      const response = await getroom(filterParams);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu room: ", error);
    } finally {
      setGeneralLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  return {
    list,
    generalLoading,
  };
};

export default useHotModal;
