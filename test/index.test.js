import { graphql } from 'graphql';
import mongoose from 'mongoose';

import setupTest from './helpers/setupTest';
import schema from '../src/models/graphql';

beforeEach(() => {
    setupTest();
});

afterAll((done) => {
    mongoose.disconnect(done);
});

it('should return something', async () => {
    const query = `
        query {
            organization
        }
    `;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, rootValue);

    expect(result.data.organization).toBe(null);
});
