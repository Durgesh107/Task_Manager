import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { Context } from "../types/Context";

export const generateTokens = (userId: number) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId, type: "refresh" },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

export const setCookies = (res: any, accessToken: string, refreshToken: string) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    };

    res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const clearCookies = (res: any) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
};

export const getCurrentUser = async (context: Context): Promise<User | null> => {
    const token = context.req.cookies?.accessToken;
    if (!token) return null;

    try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
        return await User.findOne({ where: { id: payload.userId } }) || null;
    } catch {
        return null;
    }
};

export const requireAuth = async (context: Context): Promise<User> => {
    const user = await getCurrentUser(context);
    if (!user) {
        throw new Error("Authentication required");
    }
    return user;
};
