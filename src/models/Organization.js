import mongoose from 'mongoose';

import schemaOptions from './schemaOptions';

const ObjectId = mongoose.Schema.Types.ObjectId;
const type = 'Organization';

const Organization = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    domains: [{
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
    }],
    administrators: [{
        type: ObjectId,
        ref: 'User',
    }],
});

Organization.set('toJSON', schemaOptions);
Organization.set('toObject', schemaOptions);
Organization.virtual('_type').get(() => {
    return type;
});

export default mongoose.model(type, Organization);
