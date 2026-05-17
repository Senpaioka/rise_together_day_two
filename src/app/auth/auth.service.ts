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


const verifyEmail = async (
    token: string ) => {
    
    // Check token exists
    if (!token) {
        throw new AppError(
            status.BAD_REQUEST,
            "Verification token is required"
        );
    }

    // Verify JWT token
    let decoded;

    try {

        decoded = jwt.verify(
            token,
            env.JWT_SECRET
        ) as {
            email: string;
        };

    } catch {

        throw new AppError(
            status.UNAUTHORIZED,
            "Invalid or expired token"
        );
    }

    // Find user
    const user = await prisma.user.findUnique({
        where: {
            email: decoded.email
        }
    });

    if (!user) {
        throw new AppError(
            status.NOT_FOUND,
            "User not found"
        );
    }

    // Check already verified
    if (user.isVerified) {
        throw new AppError(
            status.BAD_REQUEST,
            "Email already verified"
        );
    }

    // Check token matches
    if (
        user.verificationToken !== token
    ) {
        throw new AppError(
            status.UNAUTHORIZED,
            "Invalid verification token"
        );
    }

    //Check token expiry
    if (
        user.verificationExp &&
        user.verificationExp < new Date()
    ) {
        throw new AppError(
            status.UNAUTHORIZED,
            "Verification token expired"
        );
    }


    // Update user
    const updatedUser =
        await prisma.user.update({
            where: {
                email: decoded.email
            },

            data: {
                isVerified: true,

                verificationToken: null,

                verificationExp: null
            },

            select: {
                id: true,
                username: true,
                email: true,
                isVerified: true
            }
        });

    return updatedUser;
};




// login user
const loginUser = async (
    payload: LoginPayload ) => {

    const {email, password} = payload;

    // find user
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new AppError(
            status.NOT_FOUND,
            "User not found"
        );
    }

    // Check email verification
    if (!user.isVerified) {
        throw new AppError(
            status.UNAUTHORIZED,
            "Please verify your email first"
        );
    }


    // Compare password
    const isPasswordMatched =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordMatched) {
        throw new AppError(
            status.UNAUTHORIZED,
            "Invalid credentials"
        );
    }


    // Generate access token
    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },

        env.JWT_SECRET,

        {
            expiresIn: "7d"
        }
    );

    return {
        accessToken,

        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
};

export const authService = {
    registerUser,
    loginUser,
    verifyEmail
};