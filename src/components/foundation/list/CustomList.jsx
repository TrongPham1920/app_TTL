import React from "react";
import { StyleSheet, View } from "react-native";
import AccommodationCard from "../../../components/foundation/card/AccommodationCard";
import Loading from "../../../components/foundation/loading/Loading";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

const CustomList = ({ data, loading, onEndReached, date }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <AccommodationCard
      accommodation={item}
      onPress={() => navigation.navigate("Detail", { id: item.id, date: date })}
    />
  );

  const keyExtractor = (item) => item.id.toString();

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<View style={styles.footer} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
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
