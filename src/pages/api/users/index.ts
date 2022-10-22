import { NextApiHandler } from "next";
import prisma from '../../../../lib/prisma';
import { User } from "../../../Types/User";

const handlerGet: NextApiHandler = async (req, res) => {
    const users: User[] = await prisma.user.findMany({
        where: {
            public: true
        }
    });

    res.status(200).json({ users });
}

const handlerPost: NextApiHandler = async (req, res) => {
    const {
        name,
        email,
    } = req.body;

    if(name && email) {
        const user = await prisma.user.create({ 
            data: { name, email }
        }).catch(() => {
            res.status(400).json({error: 'E-mail já cadastrado'});
            return;
        });

        res.json({user});
    } else if(!name) {
        res.status(400).json({error: 'missing name attribute'});
    } else if (!email) {
        res.status(400).json({error: 'missing e-mail attribute'});
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