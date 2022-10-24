import { NextApiHandler } from "next";
import prisma from "../../../../../lib/prisma";
import { Category } from "../../../../Types/Category";

type UpdateCategory = {
    name?: string;
}

const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const category: Category | null = await prisma.category.findUnique({
        where: { id: parseInt(id as string) }
    });

    if(category) {
        res.json({ category });
        return;
    }

    res.status(404).json({ error: 'category not found' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { name } = req.body;

    let data: UpdateCategory = {};

    if(name) {
        data.name = name;
    }

    try {
        const updated: Category | null = await prisma.category.update({
            data,
            where: { id: parseInt(id as string) }
        });

        res.json({ updated });
        return;
    } catch (error) {
        res.status(404).json({ error: 'category not found'});
    }
}

const hanlderDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    try {
        const deleted: Category | null = await prisma.category.delete({
            where: { id: parseInt(id as string) }
        });

        res.json({ deleted });
    } catch (error) {
        res.status(404).json({ error: 'category not found' });
        return;
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
            hanlderDelete(req, res);
            break;
    }
}

export default handler;