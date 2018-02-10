import mongoose from 'mongoose';

const config = {
    db: {
        test: 'mongodb://localhost/test',
    },
    connection: null,
};

function connect() {
    return new Promise((resolve, reject) => {
        if (config.connection) {
            return resolve();
        }

        const mongoUri = 'mongodb://localhost/test';

        mongoose.Promise = Promise;

        const options = {
            auto_reconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        };

        mongoose.connect(mongoUri, options);

        config.connection = mongoose.connection;

        return config.connection
            .once('open', resolve)
            .on('error', (e) => {
                if (e.message.code === 'ETIMEDOUT') {
                    console.log(e);

                    mongoose.connect(mongoUri, options);
                }

                console.log(e);
                reject(e);
            });
    });
}

function clearDatabase() {
    return new Promise((resolve) => {
        mongoose.connection.db.dropDatabase(() => {
            resolve();
        });
    });
}

export default async function setupTest() {
    await connect();
    await clearDatabase();
}
