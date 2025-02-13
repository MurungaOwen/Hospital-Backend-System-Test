import { Request, Response } from 'express';
import { NoteService } from '../services/noteService';

class NoteController {
    private noteService: NoteService;

    constructor() {
        this.noteService = new NoteService();
    }

    public submitNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const { doctorId, patientId, content } = req.body;
            const result = await this.noteService.submitNote(doctorId, patientId, content);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    };

    public getActionableSteps = async (req: Request, res: Response): Promise<void> => {
        try {
            const { patientId } = req.params;
            const steps = await this.noteService.getActionableSteps(patientId);
            res.status(200).json(steps);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    };
}

export default NoteController;