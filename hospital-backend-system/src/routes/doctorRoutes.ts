import { Router } from 'express';
import DoctorController from '../controllers/doctorController';

const router = Router();
const doctorController = new DoctorController();

// Route to get the list of patients assigned to a doctor
router.get('/patients', doctorController.getPatients);

// Route to assign a patient to a doctor
router.post('/assign', doctorController.assignPatient);

export default router;