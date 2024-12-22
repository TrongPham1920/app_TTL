import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import useForgotPassword from "../viewmodal/useForgotPassword";
import { useNavigation } from "@react-navigation/native";


const ReceiveCode = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const {handleClickResend} = useForgotPassword();

    const onSubmit = async(data) => {
        const { identifier } = data;
        const success = await handleClickResend(identifier);
        if(success){
            reset()
            navigation.navigate("ConfirmCode", { identifier });
        }
    };

    return (
        <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Mã xác minh</Text>

            <View style={styles.form}>
            <Text style={styles.inputLabel}>Email/Số điện thoại</Text>
            <Controller
                control={control}
                name="identifier"
                rules={{
                required: "Email hoặc Số điện thoại không được để trống",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[styles.input, errors.emailOrPhone && styles.inputError]}
                    placeholder="Nhập Email hoặc Số điện thoại"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
            />
            {errors.emailOrPhone && (
                <Text style={styles.errorText}>{errors.emailOrPhone.message}</Text>
            )}
            </View>

            <Text style={styles.note}>
            Lưu ý *: Nếu bạn không nhận được mã xác nhận hãy kiểm tra trong thư mục tin nhắn rác/spam
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
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
  note: {
    fontSize: 14,
    color: "#ff5e57",
    marginBottom: 10,
    textAlign: "left",
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

export default ReceiveCode;
