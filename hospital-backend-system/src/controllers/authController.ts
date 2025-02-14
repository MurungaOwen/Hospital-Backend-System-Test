import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role } = req.body;
            const user = await this.authService.registerUser(name, email, password, role);
            res.status(201).json({ message: 'User registered successfully', user });
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
                return;
            }
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const token = await this.authService.loginUser(email, password);
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(401).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

export default AuthController;