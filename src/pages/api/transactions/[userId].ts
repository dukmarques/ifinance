import { NextApiHandler } from "next";
import prisma from '../../../../lib/prisma';
import { Transaction } from "../../../Types/Transaction";
import { User } from "../../../Types/User";

type CreateTransaction = {
    title: string;
    price: number;
    type: 'ENTRY' | 'EXIT';
    owner: 'MY' | 'OTHER';
    date: Date;
    paidOut: boolean;
    User: {
        connect: {
            id: number;
        }
    }
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
    const { userId } = req.query;

    const transactions: Transaction[] = await prisma.transaction.findMany({
        where: {
            userId: parseInt(userId as string)
        }
    });

    res.json({ transactions });
}

const handlerPost: NextApiHandler = async (req, res) => {
    const { userId } = req.query;
    const { title, price, type, owner, date, paidOut, category, card } = req.body;

    let data: CreateTransaction = {
        title,
        price: parseFloat(price as string),
        type,
        owner,
        date: new Date(date),
        paidOut: paidOut === 'true' ? true : false,
        User: {
            connect: { id: parseInt(userId as string) }
        }
    }

    if(category) {
        data.Category = {
            connect: { id: parseInt(category as string) }
        }
    }

    if(card) {
        data.Card = {
            connect: { id: parseInt(card as string) }
        }
    }

    const transaction: Transaction = await prisma.transaction.create({
        data: data
    });

    if(transaction) {
        res.json({ transaction });
        return;
    }

    res.status(400).json({ error: 'error creating transaction' });
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