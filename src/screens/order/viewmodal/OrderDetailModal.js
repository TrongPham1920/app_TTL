import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getOrderDetail, deleteOrder } from "../../../api/app/app.js";

const useOrderDetailModal = ({ id }) => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const response = await getOrderDetail(id);
      if (response?.data) {
        setDetail(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onOk = async () => {
    try {
      setLoading(true);
      const value = {
        id: id,
        status: 2,
      };
      const response = await deleteOrder(value);
      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Hủy thành công",
        });
        fetchData(id);
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Hủy thất bại",
          text2: response.message || "Có lỗi xảy ra vùi lòng thử lại",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Hủy thất bại",
        text2: response.message || "Có lỗi xảy ra vùi lòng thử lại",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { detail, loading, onOk };
};

export default useOrderDetailModal;
