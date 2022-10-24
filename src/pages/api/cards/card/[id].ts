import { NextApiHandler } from "next";
import prisma from '../../../../../lib/prisma';
import { Card } from "../../../../Types/Card";

// Rota para lidar com um cartão especifico

type UpdateCard = {
    name?: string;
    closingDate?: Date;
    dueDate?: Date;
}

const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const card: Card | null = await prisma.card.findUnique({
        where: { id: parseInt(id as string) },
    });

    if(card) {
        res.json({ card });
        return;
    }

    res.status(404).json({ error: 'card not found' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const { name, closingDate, dueDate } = req.body;

    let data: UpdateCard = {};

    if(name) {
        data.name = name;
    }

    if(closingDate) {
        data.closingDate = new Date(closingDate);
    }

    if(dueDate) {
        data.dueDate = new Date(dueDate);
    }

    const updated = await prisma.card.update({
        data,
        where: { id: parseInt(id as string) }
    });

    if(updated) {
        res.json({ updated });
        return;
    }

    res.status(400).json({ error: 'could not update card' });
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deleted = await prisma.card.delete({
        where: { id: parseInt(id as string) }
    });

    if(deleted) {
        res.json({ deleted });
        return;
    }

    res.status(404).json({ error: 'card not found' });
}

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'PUT':
            handlerPut(req, res);
            break;
        case 'DELETE':
            handlerDelete(req, res);
            break;
    }
}

export default handler;