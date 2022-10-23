import { NextApiHandler } from "next";

// Rota para lidar com um cartão especifico

const handlerGet: NextApiHandler = async (req, res) => {
    const { userId, id } = req.query;

    console.log(userId, id);

    res.json({});
}

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
    }
}

export default handler;