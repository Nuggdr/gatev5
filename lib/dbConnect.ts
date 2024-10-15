import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Sua URI do MongoDB
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // Durante o desenvolvimento, usamos o cliente do MongoDB de forma global
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // Durante a produção, cria um novo cliente do MongoDB
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default async function dbConnect() {
    const client = await clientPromise;
    return client.db(); // Retorna a instância do banco de dados
}
