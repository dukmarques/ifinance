import { api } from "./api";

export async function registerCategory(userId: number, name: string) {
    try {
        let res = await api.post('categories', {
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

export async function deleteCategory(id: number) {
    try {
        let res = await api.delete(`categories/${id}`);
        if (res.data.data) {
            return res.data.data;
        }
    } catch (error) {
        return null;
    }
}

export async function editCategory(id: number, name: string) {
    try {
        let res = await api.put(`categories/${id}`, { data: { name } })

        if(res.data.data) {
            return res.data.data;
        }
    } catch (error) {
        return null;
    }
}