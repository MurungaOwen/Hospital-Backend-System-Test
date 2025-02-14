import { Router } from 'express';
import { PatientController } from '../controllers/patientController';

const router = Router();
const patientController = new PatientController();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for managing patient-related operations
 */

/**
 * @swagger
 * /patients/select-doctor:
 *   post:
 *     summary: Assign a doctor to a patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - doctorId
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "patient123"
 *               doctorId:
 *                 type: string
 *                 example: "doctor456"
 *     responses:
 *       200:
 *         description: Doctor assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Doctor assigned successfully"
 *       500:
 *         description: Server error
 */
router.post('/select-doctor', (req, res) => patientController.selectDoctor(req, res));

/**
 * @swagger
 * /patients/assigned-doctor/{patientId}:
 *   get:
 *     summary: Retrieve the assigned doctor for a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: The assigned doctor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "doctor456"
 *                 name:
 *                   type: string
 *                   example: "Dr. John Doe"
 *                 specialization:
 *                   type: string
 *                   example: "Cardiology"
 *       500:
 *         description: Server error
 */
router.get('/assigned-doctor/:patientId', (req, res) => patientController.getAssignedDoctor(req, res));

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Server error
 */
router.get('/', (req, res) => patientController.listPatients(req, res))
export default router;
