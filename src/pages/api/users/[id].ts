import { NextApiHandler } from "next";
import prisma from '../../../../lib/prisma';
import { User } from "../../../Types/User";

type UserUpdate = {
    name?: string;
    email?: string;
    public?: boolean;
}

const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id as string)
        }
    }).catch(() => {
        res.status(404).json({error: 'User not found'});
        return;
    });

    if(user) {
        res.status(200).json({ user });
        return;
    }

    res.status(404).json({ error: 'User not found' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { name, email, isPublic } = req.body;

    let data: UserUpdate = {};

    if(name) {
        data.name = name;
    }

    if(email) {
        data.email = email;
    }

    if(isPublic) {
        switch (isPublic) {
            case 'true':
                data.public = true;
                break;
            case 'false':
                data.public = false;
        }
    }

    const user = await prisma.user.update({
        data,
        where: {
            id: parseInt(id as string)
        }
    }).catch((err) => {
        res.status(404).json({error: err.message})
    });

    res.json({user});
}

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'PUT':
            handlerPut(req, res);
            break;
    
        default:
            break;
    }
}

export default handler;