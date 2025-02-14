import mongoose from 'mongoose';
import Patient, { IPatient } from '../models/patientModel';
import Doctor, { IDoctor } from '../models/doctorModel';

export class PatientService {
    async selectDoctor(patientId: string, doctorId: string): Promise<void> {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw new Error('Patient not found');
        }
        patient.assignedDoctor = new mongoose.Types.ObjectId(doctorId);
        await patient.save();
    }

    async getAssignedDoctor(patientId: string): Promise<IDoctor | null> {
        const patient = await Patient.findById(patientId).populate('assignedDoctor');
        if (!patient) {
            throw new Error('Patient not found');
        }
        console.log("patient is: ", patient);
        return await Doctor.findById(patient.assignedDoctor)
    }

    async getPatients ():Promise<IPatient[]> {
        try {
            const patients = await Patient.find();
            return patients;
        } catch (error) {
            throw new Error("Error during db access")
        }
    }
}