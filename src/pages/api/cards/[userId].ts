import { NextApiHandler } from "next";
import { Card } from "../../../Types/Card";
import prisma from '../../../../lib/prisma';

const handlerGet: NextApiHandler = async (req, res) => {
    const { userId } = req.query;

    const cards: Card[] = await prisma.card.findMany({
        where: {
            User: {id: parseInt(userId as string)}
        },
        select: {
            id: true,
            name: true,
            closingDate: true,    
            dueDate: true
        }
    });

    res.json({ cards });
}

const handlerPost: NextApiHandler = async (req, res) => {
    const { userId } = req.query;

    const { name, closingDate, dueDate } = req.body;

    const exists = await prisma.user.findUnique({
        where: { id: parseInt(userId as string) },
        include: {
            cards: {
                where: { name: name },
            }
        }
    });

    if(exists?.cards.length! !== 0) {
        res.status(400).json({ error: 'card with this name already exists' });
        return;
    }

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