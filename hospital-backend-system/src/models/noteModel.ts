import { Schema, model, Document } from 'mongoose';

export interface IActionableStep extends Document {
    checklist: string[];
    plan: { action: string; frequency: string }[];
    patientId: string;
    // Add other properties as needed
}

const actionableStepSchema = new Schema({
    checklist: { type: [String], required: true},
    plan: {
        type: 
            {
                action: String,
                frequency: String
            }
        , required: true
    },
    patientId: {type: String, required:true}
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
const ActionableStep = model<IActionableStep>('ActionableStep', actionableStepSchema);

export { Note, ActionableStep };