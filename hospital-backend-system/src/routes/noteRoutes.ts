import { Router } from 'express';
import NoteController from '../controllers/noteController';
import { authenticateUser } from '../middleware';

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
 * /notes/actionable-steps:
 *   get:
 *     summary: Retrieve actionable steps for a patient based on notes
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
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
router.get('/actionable-steps', authenticateUser, (req, res) => noteController.getActionableSteps(req, res));


/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get notes for the logged-in user (Doctor or Patient)
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved notes
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Server error
 */
router.get('/', authenticateUser, noteController.getNotesForUser);
export default router;
