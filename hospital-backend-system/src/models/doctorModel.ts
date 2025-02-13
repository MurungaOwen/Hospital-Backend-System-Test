import mongoose, { Schema, Document } from 'mongoose';
import { IPatient } from './patientModel';

interface IDoctor extends Document {
    name: string;
    email: string;
    password: string;
    specialization: string;
    assignedPatients: IPatient[];
}

const DoctorSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    assignedPatients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }]
});

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);
export default Doctor;