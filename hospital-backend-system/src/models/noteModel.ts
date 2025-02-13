import { Schema, model, Document } from 'mongoose';

export interface ActionableStep extends Document {
    reminder: {
        patientId: string;
        message: string;
        scheduledTime: Date;
    };
    // Add other properties as needed
}

const actionableStepSchema = new Schema({
    reminder: {
        patientId: { type: String, required: true },
        message: { type: String, required: true },
        scheduledTime: { type: Date, required: true },
    },
    // Define other properties as needed
});

export interface INote extends Document {
    doctorId: string;
    patientId: string;
    content: string;
    createdAt: Date;
}

const noteSchema = new Schema({
    doctorId: { type: String, required: true },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Note = model<INote>('Note', noteSchema);
const ActionableStep = model<ActionableStep>('ActionableStep', actionableStepSchema);

export { Note, ActionableStep };