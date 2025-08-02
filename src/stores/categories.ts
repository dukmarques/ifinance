import { defineStore } from "pinia";
import { type Category } from "@/@types/Category";
import { axios } from "../services/axios";
import { useToast } from "@/composables/useToast";

export const useCategoriesStore = defineStore("categoriesStore", {
    state: () => ({
        categories: [] as Category[],
        loading: false as boolean,
    }),
    getters: {},
    actions: {
        async fetchCategories() {
            this.fillCategoriesForLoading();
            try {
                this.toggleLoading();
                const { data } = await axios.get("/categories");
                this.categories = data.data;
            } catch (err: any) {
                useToast().showError({ message: err.response.data.message });
                throw err;
            } finally {
                this.toggleLoading();
            }
        },

        async createCategory(category: Category) {
            try {
                await axios.post("/categories", category);
                useToast().showSuccess({
                    message: 'Categoria criada com sucesso',
                });
                this.fetchCategories();
            } catch (err: any) {
                useToast().showError({ message: err.response.data.message });
                throw err;
            }
        },

        async updateCategory(category: Category) {
            try {
                await axios.put(`/categories/${category.id}`, category);
                this.fetchCategories();
            } catch (err: any) {
                useToast().showError({ message: err.response.data.message });
                throw err;
            }
        },

        async deleteCategory(categoryId: string) {
            try {
                await axios.delete(`/categories/${categoryId}`);
                useToast().showSuccess({message: "Categoria deletada com sucesso" });
                this.fetchCategories();
            } catch (err: any) {
                useToast().showError(err.response.data.message);
                throw err;
            }
        },

        fillCategoriesForLoading() {
            this.categories = Array(5).fill({
                id: "1",
                name: "Categoria",
                user_id: '123',
                revenues_count: 0,
                expenses_count: 0,
                card_expenses_count: 0,
            });
        },

        toggleLoading() {
            this.loading = !this.loading;
        }
    }
});