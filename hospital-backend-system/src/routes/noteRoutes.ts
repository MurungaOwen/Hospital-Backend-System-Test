import { Router } from 'express';
import NoteController from '../controllers/noteController';

const router = Router();
const noteController = new NoteController();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for submitting doctor notes and retrieving actionable steps
 */

/**
 * @swagger
 * /notes/submit:
 *   post:
 *     summary: Submit a note from a doctor about a patient
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - patientId
 *               - content
 *             properties:
 *               doctorId:
 *                 type: string
 *                 example: "doctor123"
 *               patientId:
 *                 type: string
 *                 example: "patient123"
 *               content:
 *                 type: string
 *                 example: "Patient needs to follow up in two weeks."
 *     responses:
 *       201:
 *         description: Note submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note submitted successfully"
 *       500:
 *         description: Server error
 */
router.post('/submit', (req, res) => noteController.submitNote(req, res));

/**
 * @swagger
 * /actionable-steps/{patientId}:
 *   get:
 *     summary: Retrieve actionable steps for a patient based on notes
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: List of actionable steps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   step:
 *                     type: string
 *                     example: "Increase water intake to 2L per day"
 *       500:
 *         description: Server error
 */
router.get('/actionable-steps/:patientId', (req, res) => noteController.getActionableSteps(req, res));

export default router;
