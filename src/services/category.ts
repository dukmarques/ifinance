import { api } from "./api";

export async function registerCategory(userId: number, name: string) {
    try {
        let res = await api.post(`categories/${userId}`, {
            name
        })

        if(res.data.category) {
            return res.data.category;
        }
    } catch (error) {
        return null;
    }
}

export async function deleteCategory(id: number) {
    try {
        let res = await api.delete(`categories/category/${id}`);
        if (res.data.deleted) {
            return res.data.deleted;
        }
    } catch (error) {
        return null;
    }
}

export async function editCategory(id: number, name: string) {
    try {
        let res = await api.put(`categories/category/${id}`, {
            name
        });

        if(res.data.updated) {
            return res.data.updated;
        }
    } catch (error) {
        return null;
    }
}