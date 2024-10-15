// pages/api/users.ts
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        // Verifica se a requisição é GET
        if (req.method === 'GET') {
            const users = await User.find({});
            return res.status(200).json(users);
        } else {
            // Retorna 405 Method Not Allowed para métodos não suportados
            return res.status(405).json({ message: 'Método não permitido.' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuários:', error); // Log do erro para diagnóstico
        return res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
}
