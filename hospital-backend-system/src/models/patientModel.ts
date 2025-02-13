import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
    name: string;
    email: string;
    password: string;
    medicalHistory: string[];
    assignedDoctor: mongoose.Types.ObjectId;
}

const PatientSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    medicalHistory: { type: [String], default: [] },
    assignedDoctor: { type: mongoose.Types.ObjectId, ref: 'Doctor' }
});

export default mongoose.model<IPatient>('Patient', PatientSchema);