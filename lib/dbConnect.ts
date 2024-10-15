// lib/dbConnect.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Certifique-se de que você está usando a variável de ambiente correta
const options = {
    
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (process.env.NODE_ENV === 'development') {
    // Durante o desenvolvimento, usamos o cliente do MongoDB de forma global
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // No ambiente de produção, criamos um novo cliente a cada vez
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Exporta o cliente para ser usado em outras partes da aplicação
export default clientPromise;
