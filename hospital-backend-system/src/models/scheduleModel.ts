import mongoose, { Schema, Document } from 'mongoose';

export interface IReminder extends Document {
    patientId: string;
    message: string;
    scheduledTime: Date;
    isCompleted: boolean;
}

const ReminderSchema: Schema = new Schema({
    patientId: { type: String, required: true },
    message: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    isCompleted: {type: Boolean, required: true}
});

const Reminder = mongoose.model<IReminder>('Reminder', ReminderSchema);
export default Reminder;