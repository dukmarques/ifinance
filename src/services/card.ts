import { api } from "./api";

export async function registerCard(userId: number, name: string, closingDay: number|undefined, dueDay: number|undefined) {
    try {
        let res = await api.post(`cards/${userId}`, {
            name,
            closingDay,
            dueDay
        })

        if(res.data) {
            return res.data.card;
        }
    } catch (error) {
        return null;
    }
}

export async function deleteCard(id: number) {
    try {
        let res = await api.delete(`cards/card/${id}`);
        if (res.data) {
            return res.data.deleted;
        }
    } catch (error) {
        return null;
    }
}

export async function editCard(id: number, name: string, closingDay: number|undefined, dueDay: number|undefined) {
    try {
        let res = await api.put(`cards/card/${id}`, {
            name,
            closingDay,
            dueDay
        });

        if(res.data.updated) {
            return res.data.updated;
        }
    } catch (error) {
        return null;
    }
}