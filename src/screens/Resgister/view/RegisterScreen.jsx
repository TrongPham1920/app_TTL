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
import { register } from "../../../api/app/app";
import Toast from "react-native-toast-message";

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onRegister = async (data) => {
    const { Email, PhoneNumber, Password, ConfirmPassword } = data;

    if (Password !== ConfirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi",
        text2: "Mật khẩu không khớp",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({ PhoneNumber, Email, Password });

      if (response.code === 1) {
        reset();
        navigation.navigate("Login");
        Toast.show({
          type: "success",
          position: "top",
          text1: "Thành công",
          text2: response.message || "Đăng ký thành công",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Đăng ký thất bại",
          text2: response.message || "Đăng ký thất bại Vui lòng thử lại",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đăng ký thất bại",
        text2: response.message || "Đăng ký thất bại Vui lòng thử lại",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/backgroundRegister.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng ký</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="Email"
          rules={{
            required: "Email không được để trống",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ",
            },
          }}
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="PhoneNumber"
          rules={{
            required: "Số điện thoại không được để trống",
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ",
            },
          }}
          defaultValue=""
        />
        {errors.phone && (
          <Text style={styles.errorText}>{errors.phone.message}</Text>
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
          name="Password"
          rules={{ required: "Mật khẩu không được để trống" }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
          name="ConfirmPassword"
          rules={{ required: "Xác nhận mật khẩu không được để trống" }}
          defaultValue=""
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <Button
          title={isLoading ? "Đang xử lý..." : "Đăng ký"}
          onPress={handleSubmit(onRegister)}
          disabled={isLoading}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Đăng nhập ngay</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#000",
  },
  loginLink: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
