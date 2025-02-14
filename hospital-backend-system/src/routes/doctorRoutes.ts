import { Router } from 'express';
import DoctorController from '../controllers/doctorController';

const router = Router();
const doctorController = new DoctorController();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API for managing doctors and their patients
 */

/**
 * @swagger
 * /doctors/patients/{id}:
 *   get:
 *     summary: Get patients assigned to a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: List of assigned patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "patient123"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *       500:
 *         description: Server error
 */
router.get('/patients/:id', (req, res) => doctorController.getPatients(req, res));

/**
 * @swagger
 * /doctors/assign:
 *   post:
 *     summary: Assign a patient to a doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - patientId
 *             properties:
 *               doctorId:
 *                 type: string
 *                 example: "doctor123"
 *               patientId:
 *                 type: string
 *                 example: "patient123"
 *     responses:
 *       200:
 *         description: Patient assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Patient assigned successfully"
 *       500:
 *         description: Server error
 */
router.post('/assign', (req, res) => doctorController.assignPatient(req, res));

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Server error
 */
router.get('/', (req, res) => doctorController.listDoctors(req, res))
export default router;
