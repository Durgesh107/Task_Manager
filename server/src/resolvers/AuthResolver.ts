import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { RegisterInput, LoginInput } from "../types/AuthInputs";
import { Context } from "../types/Context";
import { generateTokens, setCookies, clearCookies, getCurrentUser } from "../utils/auth";

@Resolver()
export class AuthResolver {
    @Mutation(() => User)
    async register(
        @Arg("input") input: RegisterInput,
        @Ctx() ctx: Context
    ): Promise<User> {
        const { email, username, password } = input;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        }).save();

        const { accessToken, refreshToken } = generateTokens(user.id);
        setCookies(ctx.res, accessToken, refreshToken);

        return user;
    }

    @Mutation(() => User)
    async login(
        @Arg("input") input: LoginInput,
        @Ctx() ctx: Context
    ): Promise<User> {
        const { email, password } = input;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const { accessToken, refreshToken } = generateTokens(user.id);
        setCookies(ctx.res, accessToken, refreshToken);

        return user;
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: Context): Promise<boolean> {
        clearCookies(ctx.res);
        return true;
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: Context): Promise<User | null> {
        return await getCurrentUser(ctx);
    }
}
