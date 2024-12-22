import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";  
import useForgotPassword from "../viewmodal/useForgotPassword";
import { useRoute, useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const { handleResetPassword } = useForgotPassword();
  const navigation = useNavigation();
  const route = useRoute();
  const { identifier } = route.params;

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mật khẩu không trùng khớp",
      });
      return;
    }

    const success = await handleResetPassword({ identifier: identifier, password: data.password });
    if(success){
        reset()
        navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đặt mật khẩu mới</Text>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Mật khẩu mới</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Mật khẩu không được để trống",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Nhập mật khẩu mới"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          <Text style={[styles.inputLabel, {marginTop: 10}]}>Xác nhận mật khẩu</Text>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Xác nhận mật khẩu không được để trống",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError, {marginBottom: 10}]}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  form: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPassword;
