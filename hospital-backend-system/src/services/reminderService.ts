import cron from 'node-cron';
import Reminder, { IReminder } from '../models/scheduleModel';

interface ScheduledTask {
    patientId: string;
    task: cron.ScheduledTask;
    reminderId: string;
}

const scheduledTasks: ScheduledTask[] = [];

/**
 * Converts a frequency string into a cron expression.
 */
function frequencyToCron(frequency: string): string | null {
    switch (frequency.toLowerCase()) {
        case "daily":
            return "0 8 * * *"; // Every day at 8 AM
        case "weekly":
            return "0 9 * * 1"; // Every Monday at 9 AM
        case "twice a week":
            return "0 10 * * 1,4"; // Monday and Thursday at 10 AM
        case "3-5 times per week":
            return "0 11 * * 1,3,5"; // Monday, Wednesday, Friday at 11 AM
        case "monthly":
            return "0 12 1 * *"; // 1st of every month at 12 PM
        case "hourly":
            return "0 * * * *"; // Every hour
        case "ongoing":
            return null; // No scheduling needed for ongoing tasks
        default:
            return null;
    }
}

/**
 * Clears all reminders for a given patient from both MongoDB and cron jobs.
 */
export async function clearReminders(patientId: string) {
    console.log(`🔄 Clearing previous reminders for patient: ${patientId}`);

    // Stop and remove scheduled tasks
    for (let i = scheduledTasks.length - 1; i >= 0; i--) {
        if (scheduledTasks[i].patientId === patientId) {
            scheduledTasks[i].task.stop();
            scheduledTasks.splice(i, 1);
        }
    }

    // Delete reminders from MongoDB
    await Reminder.deleteMany({ patientId });
}

/**
 * Creates a new reminder in MongoDB and schedules it with cron.
 */
export async function createReminder(patientId: string, message: string, frequency: string) {
    const cronExpression = frequencyToCron(frequency);
    if (!cronExpression) {
        console.warn(`⚠️ Skipping scheduling for "${message}" - No valid frequency.`);
        return;
    }

    // Save reminder in MongoDB
    const reminder = new Reminder({
        patientId,
        message,
        scheduledTime: new Date(),
        isCompleted: false,
    });

    await reminder.save();

    console.log(`✅ Scheduling reminder: "${message}" for patient: ${patientId} - Frequency: ${frequency}`);

    // Schedule reminder with cron
    const task = cron.schedule(cronExpression, async () => {
        console.log(`🔔 Reminder for ${patientId}: ${message}`);
        // TODO: Replace with actual notification logic (SMS/Email)
    });

    scheduledTasks.push({ patientId, task, reminderId: reminder._id.toString() });
}

/**
 * Re-schedules all existing reminders from MongoDB on server restart.
 */
export async function rescheduleReminders() {
    const reminders = await Reminder.find({ isCompleted: false });

    reminders.forEach(async (reminder) => {
        await createReminder(reminder.patientId, reminder.message, "daily"); // Adjust frequency if stored
    });

    console.log(`🔄 Rescheduled ${reminders.length} reminders from MongoDB.`);
}
