import { Request, Response } from 'express';
import { PatientService } from '../services/patientService';

export class PatientController {
    private patientService: PatientService;

    constructor() {
        this.patientService = new PatientService();
    }

    public async selectDoctor(req: Request, res: Response): Promise<void> {
        const { patientId, doctorId } = req.body;
        try {
            const result = await this.patientService.selectDoctor(patientId, doctorId);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
                return;
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    public async getAssignedDoctor(req: Request, res: Response): Promise<void> {
        const { patientId } = req.params;
        try {
            const doctor = await this.patientService.getAssignedDoctor(patientId);
            res.status(200).json(doctor);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}