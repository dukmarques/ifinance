import { NextApiHandler } from "next";
import { Card } from "../../../Types/Card";
import prisma from '../../../../lib/prisma';

// Rota para lidar com todos os cartões de um usuário

const handlerGet: NextApiHandler = async (req, res) => {
    const { userId } = req.query;

    // TODO: pegar todos os cartões dos usuários pelo id
    const cards: Card[] = await prisma.card.findMany({
        where: {
            userId: parseInt(userId as string)
        }
    });

    res.json({ cards });
}

const handlerPost: NextApiHandler = async (req, res) => {
    const { userId } = req.query;

    const { name, closingDate, dueDate } = req.body;

    if(name) {
        const card: Card = await prisma.card.create({
            data: {
                name,
                closingDate: new Date(closingDate),
                dueDate: new Date(dueDate),
                User: {
                    connect: {
                        id: parseInt(userId as string)
                    }
                }
            },
        });

        if(card) {
            res.status(201).json({ card });
            return;
        }
    } else {
        res.status(400).json({ error: 'missing name attribute' });
    }
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