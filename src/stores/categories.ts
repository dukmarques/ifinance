import { defineStore } from "pinia";
import { type Category } from "@/types/Category";
import { axios } from "../services/axios";
import { useToast } from "./toast";

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
                useToast().showError(err.response.data.message);
                throw err;
            } finally {
                this.toggleLoading();
            }
        },

        async createCategory(category: Category) {},

        async updateCategory(category: Category) {},

        async deleteCategory(categoryId: string) {},

        fillCategoriesForLoading() {
            this.categories = Array(12).fill({
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