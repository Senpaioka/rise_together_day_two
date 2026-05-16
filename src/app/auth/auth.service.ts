import bcrypt from "bcrypt";
import AppError from "../../utils/appError.js";
import {RegisterPayload, LoginPayload } from "./auth.interfaces.js";


// register user
const registerUser = async (
    payload: RegisterPayload ) => {

    const {
        username,
        email,
        password
    } = payload;

    /**
     * Check if user already exists
     * Example DB query:
     *
     * const existingUser = await User.findOne({ email });
     */

    const existingUser = null;

    if (existingUser) {
        throw new AppError(
            409,
            "User already exists"
        );
    }

    /**
     * Hash password
     */
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    /**
     * Save user to database
     * Example:
     *
     * const user = await User.create({
     *   username,
     *   email,
     *   password: hashedPassword
     * });
     */

    const user = {
        id: 1,
        username,
        email
    };

    return user;
};





// login user
const loginUser = async (
    payload: LoginPayload ) => {

    const { email, password } = payload;

    /**
     * Find user
     */

    const user = {
        id: 1,
        email,
        password: "hashed-password"
    };

    if (!user) {
        throw new AppError(
            404,
            "User not found"
        );
    }

    /**
     * Compare password
     */

    const isPasswordMatched = true;

    if (!isPasswordMatched) {
        throw new AppError(
            401,
            "Invalid credentials"
        );
    }

    /**
     * Generate JWT token
     */

    const token = "jwt-token";

    return {
        token
    };
};

export const authService = {
    registerUser,
    loginUser
};