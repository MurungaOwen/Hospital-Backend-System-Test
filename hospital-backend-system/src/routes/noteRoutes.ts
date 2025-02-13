import { Router } from 'express';
import NoteController from '../controllers/noteController';

const router = Router();
const noteController = new NoteController();

// Route for submitting doctor notes
router.post('/submit', noteController.submitNote);

// Route for retrieving actionable steps
router.get('/actionable-steps/:patientId', noteController.getActionableSteps);

export default router;