import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/userModel';
import Doctor, { IDoctor } from '../models/doctorModel';
import patientModel, {IPatient} from '../models/patientModel';

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

    async registerUser(name: string, email: string, password: string, role: 'Patient' | 'Doctor', specialization?: string| null): Promise<IDoctor | IPatient | null> {
        const hashedPassword = await this.hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword, role });
        const user = await newUser.save();
    
        switch (role) {
            case "Patient":
                const newPatient = new patientModel({ _id:user.id, name, email, role });
                return await newPatient.save();
            case "Doctor":
                const newDoctor = new Doctor({ _id:user.id, name, email, role, specialization });
                return await newDoctor.save();
            default:
                return null
        }
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    }
}

export { AuthService };