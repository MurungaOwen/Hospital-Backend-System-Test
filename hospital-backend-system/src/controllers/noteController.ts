import { Request, Response } from 'express';
import { NoteService } from '../services/noteService';
import { AuthRequest } from '../middleware'; // Import AuthRequest to access user data
import { INote } from '../models/noteModel';

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
    };

    public getActionableSteps = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;
            if(userId){
                const steps = await this.noteService.getActionableSteps(userId);
                res.status(200).json(steps);
                return;
            }
            res.status(400).json({
                msg: "No user found"
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
                return;
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
                return;
            }
        }
    };

    public getNotesForUser = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const notes = await this.noteService.getNotes(req.user?.id, req.user?.role);
            res.status(200).json({
                data: notes
            })
            return
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
                return;
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
                return;
            }
        }
    };
}

export default NoteController;