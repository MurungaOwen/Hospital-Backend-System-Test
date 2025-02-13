import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'Patient' | 'Doctor';
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['Patient', 'Doctor'] }
});

const User = model<IUser>('User', userSchema);

export { User, IUser };