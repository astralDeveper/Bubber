import { Toast } from "react-native-toast-notifications";
import { ToastMessage } from "../../../App";

export const validateForm = (name, email, password, confirmPassword) => {

    // Validate name
    if (!name.trim()) {
        Toast.show('Name is required');
        return false;
    }
    if (name.length < 3) {
        Toast.show('Name must be 3 characters or less');
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Toast.show('Invalid email address');
        return false;
    }

    // Validate password
    if (password.length < 6) {
        Toast.show('Password must be at least 6 characters long');
        return false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
        Toast.show('Passwords do not match');
        return false;
    }

    return true;
};
