//src/layout/Main.jsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import DetailView from "../../screens/Detail/view/DetailScreen";
import FindScreen from "../../screens/Find/view/FindScreen";
import SearchScreen from "../../screens/Find/view/SearchScreen";
import ConfirmCode from "../../screens/forgotpassword/view/ConfirmCode";
import ReceiveCode from "../../screens/forgotpassword/view/ReceiveCode";
import ResetPassword from "../../screens/forgotpassword/view/ResetPassword";
import HomeScreen from "../../screens/Home/view/HomeScreen";
import ShowAllScreen from "../../screens/Hot/view/ShowAllScreen";
import ListRoomView from "../../screens/ListRoom/view/ListRoomView";
import LoginScreen from "../../screens/Login/LoginScreen";
import DetailOrder from "../../screens/order/view/DetailOrder";
import OrderScreen from "../../screens/order/view/OrderScreen";
import Payment from "../../screens/Payment/view/Payment";
import Profile from "../../screens/Profile/view/Profile";
import RegisterScreen from "../../screens/Resgister/view/RegisterScreen";
import Footer from "./Footer";
import Hearder from "./Hearder";

const Drawer = createDrawerNavigator();

const MainLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          header: () => <Hearder />,
          swipeEnabled: false,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Hot" component={ShowAllScreen} />
        <Drawer.Screen name="Detail" component={DetailView} />
        <Drawer.Screen name="ListRoom" component={ListRoomView} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Find" component={FindScreen} />
        <Drawer.Screen name="ReceiveCode" component={ReceiveCode} />
        <Drawer.Screen name="ConfirmCode" component={ConfirmCode} />
        <Drawer.Screen name="ResetPassword" component={ResetPassword} />
        <Drawer.Screen name="Order" component={OrderScreen} />
        <Drawer.Screen name="OrderDetail" component={DetailOrder} />
        <Drawer.Screen name="Payment" component={Payment} />
      </Drawer.Navigator>
      <Footer />
    </View>
  );
};

export default MainLayout;
