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

export const bioValidation = (values) => {

    if (!values.displayName.trim()) {
        Toast.show('Display Name is required');
        return false
    } else if (values.displayName.length < 3) {
        Toast.show('Display Name must be at least 3 characters long');
        return false
    }

    if (!values.realName.trim()) {
        Toast.show('Real Name is required');
        return false
    } else if (values.realName.length < 3) {
        Toast.show('Real Name must be at least 3 characters long');
        return false
    }

    if (!values.age) {
        Toast.show('Age is required');
        return false
    } else if (!Number.isInteger(Number(values.age)) || Number(values.age) <= 0 || Number(values.age) > 120) {
        Toast.show('Age must be a positive integer between 1 and 120');
        return false
    }

    if (!values.gender) {
        Toast.show('Gender is required');
        return false
    } else if (!['Male', 'Female'].includes(values.gender)) {
        Toast.show('Invalid Gender');
        return false
    }

    return true;
};