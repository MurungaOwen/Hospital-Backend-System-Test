import { Note, INote, ActionableStep, IActionableStep } from '../models/noteModel';
import { encrypt, decrypt } from '../utils/encryption';
import { scheduleReminder } from '../utils/scheduling';
import { LLMService } from '../utils/llmService'; // Hypothetical LLM service

export class NoteService {
    async submitNote(doctorId: string, patientId: string, content: string) {
        const encryptedContent = encrypt(content);
        const note = new Note({
            doctorId,
            patientId,
            content: encryptedContent,
            createdAt: new Date(),
        });

        await note.save();
        await this.processActionableSteps(note);
    }

    async processActionableSteps(note: INote) {
        const llmResponse = await LLMService.extractActionableSteps(decrypt(note.content));
        const { checklist, plan } = llmResponse;

        const newActions = new ActionableStep({
            patientId: note.patientId,
            checklist,
            plan,
        });
        await newActions.save()
        await this.scheduleActionableSteps(note.patientId, checklist, plan);
    }

    async getActionableSteps(patientId: string): Promise<IActionableStep[] | []> {
        return await ActionableStep.find({patientId});
    }

    async scheduleActionableSteps(patientId: string, checklist: string[], plan: { action: string; frequency: string }[]) {
        console.log(`🚨 New note detected! Clearing old reminders for patient: ${patientId}`);
        await clearReminders(patientId); // Remove existing reminders

        console.log(`✅ Scheduling new reminders for patient: ${patientId}`);

        checklist.forEach(task => {
            console.log(`📌 Immediate Task: ${task}`);
            // TODO: Notify the patient instantly (SMS/Email/Push)
        });

        for (const task of plan) {
            console.log(`🕒 Scheduling: ${task.action} - Frequency: ${task.frequency}`);
            await createReminder(patientId, task.action, task.frequency);
        }
    }

    async getNotes(userId: string, role: string) {
        let query = {};

        // If the user is a doctor, fetch notes they wrote
        if (role === 'doctor') {
            query = { doctorId: userId };
        } 
        // If the user is a patient, fetch notes about them
        else if (role === 'patient') {
            query = { patientId: userId };
        } 
        // Invalid role
        else {
            throw new Error('Invalid user role');
        }

        // Fetch notes from MongoDB
        const notes: INote[] = await Note.find(query);

        // Decrypt the content before sending it to the frontend
        return notes.map(note => ({
            ...note.toObject(),
            content: decrypt(note.content),
        }));
    }
}