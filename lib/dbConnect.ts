import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Substitua pela sua URI
const options = {};

if (process.env.NODE_ENV === 'development') {
    // Durante o desenvolvimento, usamos o cliente do MongoDB de forma global
    if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    client = await global._mongoClientPromise;
} else {
    // Em produção, cria uma nova conexão
    const client = new MongoClient(uri, options);
    await client.connect();
}
