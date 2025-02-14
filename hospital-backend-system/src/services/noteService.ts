import { Note, INote, ActionableStep, IActionableStep } from '../models/noteModel';
import { encrypt } from '../utils/encryption';
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
        const llmResponse = await LLMService.extractActionableSteps(note.content);
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
}