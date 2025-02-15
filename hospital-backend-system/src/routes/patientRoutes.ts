import { Router } from 'express';
import { PatientController } from '../controllers/patientController';
import { authenticateUser } from '../middleware';

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
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *       400:
 *         description: Bad request (e.g., doctorId missing)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "doctorId is required"
 *       500:
 *         description: Server error
 */
router.post('/select-doctor', authenticateUser, (req, res) =>
  patientController.selectDoctor(req, res)
);

/**
 * @swagger
 * /patients/assigned-doctor:
 *   get:
 *     summary: Retrieve the assigned doctor for a patient
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error
 */
router.get('/assigned-doctor', authenticateUser, (req, res) =>
  patientController.getAssignedDoctor(req, res)
);

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
router.get('/', (req, res) => patientController.listPatients(req, res));

export default router;
