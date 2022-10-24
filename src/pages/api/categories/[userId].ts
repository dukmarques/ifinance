import { Category } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from '../../../../lib/prisma';

const handlerGet: NextApiHandler = async (req, res) => {
    const { userId } = req.query;

    const categories: Category[] = await prisma.category.findMany({
        where: {
            User: {
                id: parseInt(userId as string)
            }
        }
    });
    
    res.json({ categories });
}

const handlerPost: NextApiHandler = async (req, res) => {
    const { userId } = req.query;
    const { name } = req.body;

    const exists = await prisma.user.findUnique({
        where: { id: parseInt(userId as string) },
        include: {
            categories: {
                where: { name },
            }
        }
    });

    if(exists?.categories.length! !== 0) {
        res.status(400).json({ error: 'category with this name already exists' });
        return;
    }

    if(name) {
        const category: Category = await prisma.category.create({
            data: { 
                name,
                User: {
                    connect: { id: parseInt(userId as string) }
                } 
            }
        });
    
        if(category) {
            res.json({ category });
            return;
        }
    } else {
        res.status(400).json({error: 'missing name attribute'});
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