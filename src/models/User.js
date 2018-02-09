import mongoose from 'mongoose';

import schemaOptions from './schemaOptions';

const type = 'User';

const User = new mongoose.Schema({
    // Important fields
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },

    // Password fields
    password: {
        hash: {
            type: String,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        algorithm: {
            type: String,
            select: false,
        },
    },
});

User.set('toJSON', schemaOptions);
User.set('toObject', schemaOptions);
User.virtual('_type').get(() => {
    return type;
});

export default mongoose.model(type, User);
