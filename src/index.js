import express from 'express';
import graphHTTP from 'express-graphql';

import schema from './models/graphql';

const root = {
    organization: () => {
        return 'Test';
    },
};

const app = express();

app.use('/graphql', graphHTTP({
    schema,
    rootValue: root,
    pretty: process.env.NODE_ENV !== 'production',
    graphiql: process.env.NODE_ENV !== 'production',

}));

app.get('/', (req, res) => {
    return res.send("<h1>Nothing here yet</h1><p>Please stay tuned.</p>");
});

app.listen(4000);

console.log('Running on port 4000');
