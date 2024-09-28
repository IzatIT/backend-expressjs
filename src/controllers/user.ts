// userController.ts
import { Body, Post, Route } from "tsoa";
import { User, UserCreationAttributes } from "../models/user"; // Ensure correct import
import { UserService } from "../services/user";

interface AuthResponse {
    token?: string;
    message?: string;
}

@Route("user")
export class UserController {
    private userService = new UserService();

    @Post("/register")
    public async register(@Body() userData: UserCreationAttributes): Promise<AuthResponse> {
        await this.userService.register(userData);
        return {
            message: "User registered successfully",
        };
    }

    @Post("/login")
    public async authorize(@Body() body: { login: string; password: string }): Promise<AuthResponse> {
        const { login, password } = body;
        const { token } = await this.userService.login(login, password);
        return { token };
    }
}
