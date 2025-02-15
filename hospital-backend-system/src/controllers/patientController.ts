import { Request, Response } from 'express';
import { PatientService } from '../services/patientService';
import { AuthRequest } from '../middleware';

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
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
                return;
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    public async getAssignedDoctor(req: AuthRequest, res: Response): Promise<void> {
    
        try {
            const patientId = req.user?.id
            if(patientId) {
                const doctor = await this.patientService.getAssignedDoctor(patientId);
                res.status(200).json(doctor);
            }
            res.status(400).json({
                msg: "Supply Auth headers"
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    public async listPatients(req: Request, res: Response): Promise<void> {
        try {
            const patients = await this.patientService.getPatients();
            res.status(200).json({data: patients});
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
                return;
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
                return;
            }
        }
    }
}