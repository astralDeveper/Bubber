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

export const bioValidation = (displayName, realName, age, gender) => {
    // Check if displayName is a valid string and has at least 3 characters
    Toast.hideAll()
    if (typeof displayName !== 'string' || !displayName.trim()) {
        Toast.show('Display Name is required');
        return false;
    } else if (displayName.length < 3) {
        Toast.show('Display Name must be at least 3 characters long');
        return false;
    }

    // Check if realName is a valid string and has at least 3 characters
    if (typeof realName !== 'string' || !realName.trim()) {
        Toast.show('Real Name is required');
        return false;
    } else if (realName.length < 3) {
        Toast.show('Real Name must be at least 3 characters long');
        return false;
    }

    // Check if age is a valid number and within the specified range
    if (typeof age !== 'string' || !age.trim()) {
        Toast.show('Age is required');
        return false;
    } else {
        const ageNumber = Number(age);
        if (!Number.isInteger(ageNumber) || ageNumber <= 0 || ageNumber > 120) {
            Toast.show('Age must be a positive integer between 1 and 120');
            return false;
        }
    }

    // Check if gender is valid
    if (typeof gender !== 'string' || !gender.trim()) {
        Toast.show('Gender is required');
        return false;
    } else if (!['Male', 'Female', 'Other'].includes(gender)) {
        Toast.show('Invalid Gender');
        return false;
    }

    return true;
};