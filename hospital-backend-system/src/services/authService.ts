import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/userModel';

class AuthService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async validateUser(email: string, password: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async registerUser(name: string, email: string, password: string, role: 'Patient' | 'Doctor'): Promise<IUser> {
        const hashedPassword = await this.hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword, role });
        return await newUser.save();
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    }
}

export { AuthService };