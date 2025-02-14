import Doctor, { IDoctor } from '../models/doctorModel';
import Patient, { IPatient } from '../models/patientModel';

export class DoctorService {
    async assignPatient(doctorId: string, patientId: string): Promise<void> {
        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            throw new Error('Doctor or Patient not found');
        }

        doctor.assignedPatients.push(patient._id);
        await doctor.save();
    }

    async getPatients(doctorId: string): Promise<IPatient[] | []> {
        const doctor = await Doctor.findById(doctorId).populate('assignedPatients');
        
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        return doctor.assignedPatients as IPatient[];
    }

    // get list of doctors
    async getDoctors(): Promise<IDoctor[] | []> {
        try {
            const doctors = await Doctor.find();
            console.log("Doctors are: ", doctors);
            return doctors;
        } catch (error) {
            throw new Error("Error during db access")
        }
    }
}