import { Router } from 'express';
import { PatientController } from '../controllers/patientController';

const router = Router();
const patientController = new PatientController();

// Route for selecting a doctor
router.post('/select-doctor', patientController.selectDoctor);

// Route for retrieving assigned doctor
router.get('/assigned-doctor', patientController.getAssignedDoctor);

export default router;