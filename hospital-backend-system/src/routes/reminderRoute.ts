import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import Reminder from '../models/scheduleModel';
import { createReminder, clearReminders, rescheduleReminders } from '../services/reminderService';

const router = express.Router();

/**
 * **Get all reminders for a specific patient**
 */
router.get('/reminders/:patientId', authenticateUser, async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const reminders = await Reminder.find({ patientId, isCompleted: false });

        res.json({ success: true, reminders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve reminders' });
    }
});

/**
 * **Delete all reminders for a specific patient (e.g., when new notes are added)**
 */
router.delete('/reminders/:patientId', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        await clearReminders(patientId);
        res.json({ success: true, message: 'All reminders cleared for the patient' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to clear reminders' });
    }
});


export default router;

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: API for managing patient reminders
 */

/**
 * @swagger
 * /reminders/{patientId}:
 *   get:
 *     summary: Get all active reminders for a patient
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of active reminders for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reminders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65f0c3b2a12345678"
 *                       patientId:
 *                         type: string
 *                         example: "patient123"
 *                       message:
 *                         type: string
 *                         example: "Take your medication"
 *                       scheduledTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-15T08:00:00.000Z"
 *                       isCompleted:
 *                         type: boolean
 *                         example: false
 *       500:
 *         description: Failed to retrieve reminders
 */

**
 * @swagger
 * /reminders/{patientId}:
 *   delete:
 *     summary: Delete all reminders for a specific patient
 *     tags: [Reminders]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient whose reminders should be cleared
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully cleared all reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All reminders cleared for the patient"
 *       500:
 *         description: Failed to clear reminders
 */