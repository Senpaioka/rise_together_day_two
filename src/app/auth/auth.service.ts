import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import status from "http-status";
import {prisma} from '../../lib/prisma.js';
import env from '../../config/env.js';
import SendEmail from "../../utils/sendEmail.js";
import verifyEmailTemplate from "../../templates/verifyEmailTemplate.js";
import AppError from "../../utils/appError.js";
import {RegisterPayload, LoginPayload } from "./auth.interfaces.js";


// register user
const registerUser = async (
    payload: RegisterPayload ) => {

    const {username, email, password} = payload;

    // Check existing user
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new AppError(
            status.CONFLICT,
            "User already exists"
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    // Generate verification token
    const verificationToken = jwt.sign(
        {
            email
        },
        env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    // Save user
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,

            verificationToken,

            verificationExp: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            )
        },

        select: {
            id: true,
            username: true,
            email: true,
            isVerified: true,
            createdAt: true
        }
    });

    // Verification URL
    const verificationLink =
        `http://localhost:5000/api/v1/auth/verify-email?token=${verificationToken}`;

    // Send email
    await SendEmail({
        to: email,

        subject: "Verify Your Email",

        html: verifyEmailTemplate({
            username,
            verificationLink
        })
    });

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