// lib/dbConnect.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Certifique-se de que você está usando a variável de ambiente correta
const options = {
 
};

// Extensão da interface do global
declare global {
    namespace NodeJS {
        interface Global {
            _mongoClientPromise?: Promise<MongoClient>; // Adiciona a propriedade que está sendo usada
        }
    }
}

let client: MongoClient | null = null; // Define o tipo explicitamente como MongoClient ou null
let clientPromise: Promise<MongoClient> | null = null; // Define o tipo como Promise<MongoClient> ou null

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
