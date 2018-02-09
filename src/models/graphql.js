import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        organization: String
    }
`);

export default schema;
