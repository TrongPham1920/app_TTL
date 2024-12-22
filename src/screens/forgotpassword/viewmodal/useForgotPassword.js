import {
    resendcode,
    confirmcode,
    resetpassword,
} from "../../../api/app/app";
import React, { useState } from "react";
import Toast from 'react-native-toast-message';  

const useForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClickResend = async (identifier) => {
        try {
            setIsLoading(true);
            const response = await resendcode({ identifier });

            if (response?.code === 1) {
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: "Mã xác minh đã được gửi!",
                });
                return true;
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: response.mess || "Có lỗi xảy ra!",
                });
                return false;
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Người dùng không tồn tại.",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickConfirm = async (email, code) => {
        try {
            setIsLoading(true);
            const response = await confirmcode({ email, code });

            if (response?.code === 1) {
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: response.mess || "Mã xác nhận hợp lệ.",
                });
                return true;
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: response.mess || "Mã xác nhận không hợp lệ.",
                });
                return false;
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Mã xác thực không hợp lệ.",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (identifier, password) => {
        try {
            setIsLoading(true);
            const response = await resetpassword(identifier, password);

            if (response?.code === 1) {
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: response.mess,
                });
                return true;
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: response.mess,
                });
                return false;
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Đã xảy ra lỗi! Vui lòng thử lại.",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleClickResend,
        handleClickConfirm,
        handleResetPassword,
    };
};

export default useForgotPassword;
