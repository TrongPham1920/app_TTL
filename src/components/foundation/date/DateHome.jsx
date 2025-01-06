import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

const DualDateInput = ({
  title,
  startDate,
  endDate,
  onDateChange, // Dùng một hàm duy nhất
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const currentStartDate = dayjs(startDate, "DD/MM/YYYY", true).isValid()
    ? dayjs(startDate, "DD/MM/YYYY")
    : dayjs();

  const currentEndDate = dayjs(endDate, "DD/MM/YYYY", true).isValid()
    ? dayjs(endDate, "DD/MM/YYYY")
    : dayjs();

  // Hàm duy nhất để xử lý thay đổi ngày cho cả startDate và endDate
  const handleDateChange = (event, selectedDate, isStart) => {
    const selected =
      selectedDate || (isStart ? currentStartDate : currentEndDate);
    if (isStart) {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }

    // Gọi hàm onDateChange để thông báo thay đổi cho cả startDate và endDate
    if (onDateChange) {
      onDateChange(
        dayjs(selected).format("DD/MM/YYYY"),
        isStart ? "currentDate" : "endDate"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.datePickerContainer}>
        <View style={styles.datePicker}>
          <Text
            style={styles.input}
            onPress={() => setShowStartDatePicker(true)}
          >
            {currentStartDate.format("DD/MM/YYYY")}
          </Text>
          {showStartDatePicker && (
            <DateTimePicker
              value={currentStartDate.toDate()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateChange(event, selectedDate, true)
              }
            />
          )}
        </View>

        <View style={styles.datePicker}>
          <Text style={styles.input} onPress={() => setShowEndDatePicker(true)}>
            {currentEndDate.format("DD/MM/YYYY")}
          </Text>
          {showEndDatePicker && (
            <DateTimePicker
              value={currentEndDate.toDate()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateChange(event, selectedDate, false)
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: "rgb(65, 108, 171)",
    borderRadius: 8,
  },
  datePickerContainer: {
    flexDirection: "row", // Hiển thị hai ô chọn nằm ngang
    justifyContent: "space-between",
  },
  datePicker: {
    flex: 1, // Chia đều chiều rộng cho hai ô
    marginHorizontal: 5, // Khoảng cách giữa hai ô
  },
  label: {
    fontSize: 17,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
});

export default DualDateInput;
