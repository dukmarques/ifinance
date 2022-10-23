import { NextApiHandler } from "next";
import prisma from '../../../../lib/prisma';

// Rota para lidar com todos os cartões independente de usuário (necessário?)

const handlerGet: NextApiHandler = async (req, res) => {
    console.log(req.query);
    res.json({})
}

const handlerPost: NextApiHandler = async (req, res) => {

}

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'POST':
            handlerPost(req, res);
            break;
    }
}

export default handler;