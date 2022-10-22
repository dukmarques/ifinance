import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prima = global.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') {
    global.prisma;
}

export default prima;