import React from "react";
import { StyleSheet, View } from "react-native";
import CustomList from "../../../components/foundation/list/CustomList";
import useHotModal from "../viewmodal/HotModal";
import DateInput from "../../../components/foundation/date/DateHome";

const ShowAllScreen = ({ navigation }) => {
  const { accommodationData, loading, onDateChange, dates } = useHotModal();

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <DateInput
          title="Ngày đặt phòng"
          startDate={dates.fromDate}
          endDate={dates.toDate}
          onDateChange={onDateChange}
        />
      </View>
      <CustomList
        loading={loading}
        data={accommodationData}
        navigation={navigation}
        date={{ fromDate: dates.fromDate, toDate: dates.toDate }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
});

export default ShowAllScreen;
