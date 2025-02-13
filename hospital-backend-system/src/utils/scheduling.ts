import Reminder, { IReminder } from '../models/scheduleModel'; // Import IReminder interface
import { ActionableStep } from '../models/noteModel'; // Assuming ActionableStep is defined in noteModel
import { setTimeout } from 'timers';

export const scheduleReminder = (reminder: IReminder, duration: number) => {
    setTimeout(() => {
        // Logic to send reminder notification to the patient
        console.log(`Reminder for ${reminder.patientId}: ${reminder.message}`);
    }, duration);
};

export const scheduleActionableSteps = (actionableSteps: ActionableStep[]) => {
    actionableSteps.forEach(step => {
        const duration = calculateDuration(step); // Implement this function based on your logic
        const reminder = new Reminder(step.reminder); // Create an instance of Reminder
        scheduleReminder(reminder as IReminder, duration);
    });
};

export const cancelScheduledSteps = (patientId: string) => {
    // Logic to cancel any existing scheduled reminders for the patient
    console.log(`Cancelled all scheduled steps for patient: ${patientId}`);
};

// Define the calculateDuration function
const calculateDuration = (step: ActionableStep): number => {
    // Implement your logic to calculate the duration
    // For example, you might calculate the duration based on the scheduledTime
    const now = new Date().getTime();
    const scheduledTime = new Date(step.reminder.scheduledTime).getTime();
    return scheduledTime - now;
};

// Additional utility functions can be added as needed