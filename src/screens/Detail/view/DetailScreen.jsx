import AntDesign from "@expo/vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormatUtils from "../../../../utils/format/Format";
import SimpleCarousel from "../../../components/foundation/image/Carousel";
import LocationMapWithThumbnail from "../../../components/foundation/map/LocaltionMapThumbnail";
import DetailModal from "../viewmodal/DetailModal";

const tagColors = [
  "#F2D5DA",
  "#BFBFE3",
  "#C4E2E4",
  "#F3D2C9",
  "#F8E3D0",
  "#CFE9E8",
  "#F0D8BC",
  "#F7D0B1",
];

const getTagColor = (index) => tagColors[index % tagColors.length];

const Stars = ({ num }) => {
  if (num === 0 || num === undefined) {
    return <Text style={styles.noRatingText}>Chưa có đánh giá</Text>;
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const color = i < num ? "gold" : "#cdcbcb73";
    stars.push(<AntDesign key={i} name="star" size={15} color={color} />);
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};

const DetailView = () => {
  const route = useRoute();
  const { id, date } = route.params;

  const {
    loading,
    detailData,
    isDescriptionLong,
    setDetailData,
    setLoading,
    goToRoomList,
    fetchData,
    handleToggleDescription,
  } = DetailModal({ id, date });
 

  if(!date){
    console.log("non")
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  const fullAddress = `${detailData?.address}, ${detailData?.ward}, ${detailData?.district}, ${detailData?.province}`;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{detailData?.name?.toUpperCase()}</Text>
        </View>

        <Text style={styles.address}>{fullAddress}</Text>
        <SimpleCarousel data={detailData?.img} />

        <View style={styles.infoContainer}>
          {/* Vị trí bản đồ */}
          <View>
            <Text style={styles.ratingText}>Vị trí bản đồ</Text>
            {detailData?.latitude && detailData?.longitude && !loading && (
              <LocationMapWithThumbnail
                latitude={detailData?.latitude}
                longitude={detailData?.longitude}
              />
            )}
          </View>

          {/* Đánh giá sao */}
          <View style={styles.rating}>
            <Text style={styles.ratingText}>Đánh giá</Text>
            <Stars num={detailData?.num} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tiện ích</Text>
        <View style={styles.tagContainer}>
          {detailData?.benefits?.map((item, index) => (
            <Text
              key={index}
              style={[styles.tag, { backgroundColor: getTagColor(index) }]}
            >
              {item?.name}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={[styles.descriptionText, { textAlign: "justify" }]}>
          {isDescriptionLong
            ? detailData?.description.trim()
            : detailData?.description?.slice(0, 250).trim() + "..."}
        </Text>
        <TouchableOpacity
          onPress={handleToggleDescription}
          style={styles.expandButton}
        >
          <Text style={styles.expandText}>
            {isDescriptionLong ? "Thu gọn" : "Xem thêm "}
            <AntDesign
              name={isDescriptionLong ? "up" : "down"}
              size={16}
              color="#015C92"
            />
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <LinearGradient
        colors={["#FFFFFF", "#D3E7EE", "#ABD1DC"]}
        style={[styles.fixedButton]}
        start={{ x: 0, y: 0 }}
      >
        <TouchableOpacity onPress={goToRoomList} style={styles.buttonContainer}>
          <View style={styles.priceContainer}>
            {detailData?.type === 0 ? (
              <>
                <Text style={styles.startingText}>Khởi điểm</Text>
                <Text style={styles.priceText}>
                  {FormatUtils.vndPrice(detailData?.price || 0)}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.startingText}>Giá ưu đãi</Text>
                <Text style={styles.priceText}>
                  {FormatUtils.vndPrice(detailData?.price || 0)}
                </Text>
              </>
            )}
          </View>
          <View>
            {detailData?.type === 0 ? (
              <Text style={styles.buttonText}>Xem mọi phòng</Text>
            ) : (
              <Text style={styles.buttonText}>Đặt ngay</Text>
            )}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  scrollcontainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  address: {
    marginVertical: 4,
    fontSize: 14,
    color: "#1261A6",
  },
  imageGallery: {
    marginVertical: 8,
  },
  image: {
    width: 250,
    height: 200,
    marginRight: 8,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 5,
    padding: 4,
    margin: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  rating: {
    width: "48%",
    alignItems: "flex-end",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  noRatingText: {
    fontSize: 14,
    color: "#cdcbcb",
    fontStyle: "italic",
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  expandText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#015C92",
  },

  fixedButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 10,
  },
  startingText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  priceText: {
    fontSize: 18,
    color: "#9d0000",
    fontWeight: "700",
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default DetailView;
