import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import useForgotPassword from "../viewmodal/useForgotPassword"; 
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';

const ConfirmCode = ({}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const { handleClickResend, handleClickConfirm } = useForgotPassword(); 
  const navigation = useNavigation();
  const route = useRoute();
  const { identifier } = route.params;

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCountdown(30);
      setCanResend(false);
    }, [])
  );

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]); 

  const onSubmit = async(data) => {
    const email = identifier
    const code = data.code
    const success = await handleClickConfirm(email,code);
    if (success) {
        reset()
        navigation.navigate("ResetPassword", { identifier });
    }
  };

  const resendCode = async() => {
    await handleClickResend(identifier);
    setCanResend(false);
    setCountdown(30); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Xác minh</Text>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Mã xác nhận</Text>
          <Controller
            control={control}
            name="code"
            rules={{
              required: "Mã xác nhận không được để trống",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.code && styles.inputError]}
                placeholder="Nhập mã xác nhận"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.code && (
            <Text style={styles.errorText}>{errors.code.message}</Text>
          )}
        </View>

        <TouchableOpacity onPress={resendCode} disabled={!canResend}>
          <Text
            style={[
              styles.resendText,
              { color: canResend ? "#007BFF" : "rgba(0, 0, 0, 0.25)" },
            ]}
          >
            {canResend ? "Gửi lại mã" : `Gửi lại mã sau ${countdown}s`}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Lưu ý *: Mã chỉ tồn tại trong 5 phút - Nếu bạn không nhận được mã xác nhận hãy kiểm tra trong thư mục tin nhắn rác/spam
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
  resendText: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 10,
    textAlign: "left",
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

export default ConfirmCode;
