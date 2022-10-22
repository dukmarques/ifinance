import { api } from "./api";

export async function registerCard(userId: number, name: string) {
    try {
        let res = await api.post('cards', {
            data: {
                name,
                users_ifinance: userId,
            }
        })

        if(res.data.data) {
            return res.data.data;
        }
    } catch (error) {
        return null;
    }
}

export async function deleteCard(id: number) {
    try {
        let res = await api.delete(`cards/${id}`);
        if (res.data.data) {
            return res.data.data;
        }
    } catch (error) {
        return null;
    }
}

export async function editCard(id: number, name: string) {
    try {
        let res = await api.put(`cards/${id}`, { data: { name } })

        if(res.data.data) {
            return res.data.data;
        }
    } catch (error) {
        return null;
    }
}