import { NextApiHandler } from "next";
import prisma from '../../../../../lib/prisma';
import { Transaction } from "../../../../Types/Transaction";

type UpdateTransaction = {
    title?: string;
    price?: number;
    type?: 'ENTRY' | 'EXIT';
    owner?: 'MY' | 'OTHER';
    date?: Date;
    paidOut?: boolean;
    Category?: {
        connect: {
            id: number;
        }
    };
    Card?: {
        connect: {
            id: number;
        }
    };
}

const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const transaction: Transaction | null = await prisma.transaction.findUnique({
        where: {
            id: parseInt(id as string)
        }
    });

    if(transaction) {
        res.json({ transaction });
        return;
    }

    res.status(404).json({ error: 'transaction not found' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { title, price, type, owner, date, paidOut, category, card } = req.body;

    let data: UpdateTransaction = {}

    if(title) { data.title = title; }
    if(price) { data.price = parseFloat(price as string); }
    if(type) { data.type = type; }
    if(owner) { data.owner = owner; }
    if(date) { data.date = new Date(date);}
    if(paidOut){ data.paidOut = paidOut === true ? true : false; }
    if(category) {
        data.Category = { connect: { id: parseInt(category as string) } }
    }
    if(card) {
        data.Card = { connect: { id: parseInt(card as string) } }
    }

    try {
        const updated: Transaction | null = await prisma.transaction.update({
            data,
            where: { id: parseInt(id as string) },
        });

        res.json({ updated });
        return;
    } catch (error) {
        res.status(400).json({ error: 'error editing transaction' });
    }
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    try {
        const deleted: Transaction | null = await prisma.transaction.delete({
            where: {
                id: parseInt(id as string)
            }
        });

        res.json({ deleted });
        return;
    } catch (error) {
        res.status(404).json({ error: 'transaction not found' });   
    }
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