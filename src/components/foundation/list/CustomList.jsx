import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import AccommodationCard from "../../../components/foundation/card/AccommodationCard";
import Loading from "../../../components/foundation/loading/Loading";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

const CustomList = ({ data, loading, onEndReached, date, hasMore }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <AccommodationCard
      accommodation={item}
      onPress={() => navigation.navigate("Detail", { id: item.id, date: date })}
    />
  );

  const keyExtractor = (item) => item.id.toString();

  const handleEndReached = useCallback(() => {
    if (!loading && hasMore) {
      onEndReached(); // Gọi callback để tải thêm dữ liệu
    }
  }, [loading, hasMore, onEndReached]);

  if (loading && data.length === 0) return <Loading />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={loading && <Loading />}
        onEndReached={handleEndReached} // Sự kiện cuộn đến cuối
        onEndReachedThreshold={0.6} // Ngưỡng khi cuộn đến cuối
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  listContent: {
    paddingBottom: 30,
  },
  footer: {
    height: 35,
  },
  separator: {
    height: 2,
  },
});

export default CustomList;
