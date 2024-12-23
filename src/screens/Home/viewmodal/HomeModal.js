import { useState, useEffect } from "react";
import { accommodationuser } from "../../../api/app/app.js";
import dayjs from "dayjs";

const currentDate = dayjs().add(1, "day");
const defaultStartDate = currentDate.add(1, "day");
const StartDate = defaultStartDate.format("DD/MM/YYYY");
const date = currentDate.format("DD/MM/YYYY");

const useHotModal = () => {
  const [list, setList] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [homestay, setHomestay] = useState([]);
  const [villa, setVilla] = useState([]);

  const [generalLoading, setGeneralLoading] = useState(true);
  const [hotelLoading, setHotelLoading] = useState(true);
  const [homestayLoading, setHomestayLoading] = useState(true);
  const [villaLoading, setVillaLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
    fromDate: date,
    toDate: StartDate,
  });

  const [hotelParams, setHotelParams] = useState({
    limit: pageSize,
    fromDate: date,
    toDate: StartDate,
    type: 0,
  });

  const [homestayParams, setHomestayParams] = useState({
    limit: pageSize,
    fromDate: date,
    toDate: StartDate,
    type: 1,
  });

  const [villaParams, setVillaParams] = useState({
    limit: pageSize,
    fromDate: date,
    toDate: StartDate,
    type: 2,
  });

  const fetchData = async (filterParams) => {
    try {
      setGeneralLoading(true);
      const response = await accommodationuser(filterParams);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setGeneralLoading(false);
    }
  };

  const hotelData = async (hotelParams) => {
    try {
      setHotelLoading(true);
      const response = await accommodationuser(hotelParams);
      if (response?.data) {
        setHotels(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setHotelLoading(false);
    }
  };

  const homestayData = async (homestayParams) => {
    try {
      setHomestayLoading(true);
      const response = await accommodationuser(homestayParams);
      if (response?.data) {
        setHomestay(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setHomestayLoading(false);
    }
  };

  const villaData = async (villaParams) => {
    try {
      setVillaLoading(true);
      const response = await accommodationuser(villaParams);
      if (response?.data) {
        setVilla(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setVillaLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterParams);
    hotelData(hotelParams);
    homestayData(homestayParams);
    villaData(villaParams);
  }, [filterParams, hotelParams, homestayParams, villaParams]);

  return {
    date,
    StartDate,
    list,
    generalLoading,
    villa,
    homestay,
    hotels,
    hotelLoading,
    homestayLoading,
    villaLoading,
  };
};

export default useHotModal;
