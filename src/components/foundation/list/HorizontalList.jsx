import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import SmallCard from "../../../components/foundation/card/SmallCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Loading from "../../../components/foundation/loading/Loading";
import { useNavigation } from "@react-navigation/native";

const HorizontalList = ({ title, data, date, loading, type }) => {
  const navigation = useNavigation();

  const dataWithSeeMore = [
    ...data,
    { id: "seeMore", title: "Xem thêm", mode: "seeMore" },
  ];

  const renderItem = ({ item }) => {
    if (item.mode === "seeMore") {
      return (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => {
              if (type === -1) {
                navigation.navigate("Hot", {
                  fromDate: date?.fromDate,
                  toDate: date?.toDate,
                });
              } else {
                navigation.navigate("Find", {
                  fromDate: date?.fromDate,
                  toDate: date?.toDate,
                });
              }
            }}
          >
            <AntDesign name="rightcircleo" size={35} color="white" />
            <Text style={styles.seeMoreText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <SmallCard
        accommodation={item}
        onPress={() =>
          navigation.navigate("Detail", { id: item.id, date: date })
        }
      />
    );
  };

  const keyExtractor = (item) => item.id.toString();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {typeof title === "string" ? (
          <Text style={styles.headerText}>{title}</Text>
        ) : (
          title
        )}
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={dataWithSeeMore}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  itemContainer: {
    width: 180,
    height: 270,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",

    alignItems: "center",
    justifyContent: "center",
  },
  seeMoreButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
  },
  seeMoreText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});

export default HorizontalList;
