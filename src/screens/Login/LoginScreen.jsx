import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../api/app/app";
import { useAuth } from "../../global/context/AuthenticationContext";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const { onLogin } = useAuth();

  const handleLogin = async (data) => {
    const { Identifier, password } = data;
    setIsLoading(true);

    try {
      const response = await login({ Identifier, password });
      reset();

      if (response.code === 1) {
        onLogin(response?.data);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Đăng nhập thành công",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Đăng nhập thất bại",
          text2:
            response.message || "Kiểm tra lại tài khoản hoặc mật khẩu của bạn",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đăng nhập thất bại",
        text2: "Kiểm tra lại tài khoản hoặc mật khẩu của bạn",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/backgroundLogin.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email/ số điện thoại"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="Identifier"
          rules={{ required: "Hãy nhập Email/ số điện thoại" }}
          defaultValue=""
        />
        {errors.Identifier && (
          <Text style={styles.errorText}>{errors.Identifier.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          rules={{ required: "Hãy nhập mật khẩu" }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("ReceiveCode")}>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <Button
          title={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          onPress={handleSubmit(handleLogin)}
          disabled={isLoading}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: "#000",
  },
  registerLink: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#007BFF",
    textAlign: "right",
    marginBottom: 10,
  },
});

export default LoginScreen;
