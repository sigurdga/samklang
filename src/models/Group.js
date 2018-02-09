import mongoose from 'mongoose';

import schemaoptions from './schemaoptions';

const ObjectId = mongoose.Schema.Types.ObjectId;
const type = 'group';

const Group = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    members: [{
        user: {
            type: ObjectId,
            ref: 'User',
        },
    }],
});

Group.set('toJSON', schemaOptions);
Group.set('toObject', schemaOptions);
Group.virtual('_type').get(() => {
    return type;
});

export default mongoose.model(type, Group);
