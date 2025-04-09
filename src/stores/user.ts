import { defineStore } from 'pinia';
import { type User } from '@/@types/User';
import { axios } from '../services/axios';

type loginData = {
    email: string;
    password: string;
    device_name: string;
};

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: {} as User | null,
        accessToken: null as string | null,
    }),
    persist: true,
    getters: {
        getUserInfo(): User | null {
            return this.user;
        },
        getAccessToken(): string | null {
            return this.accessToken;
        },
    },
    actions: {
        async login(authData: loginData) {
            // eslint-disable-next-line no-useless-catch
            try {
                const { data } = await axios.post('/auth/login', authData);
                this.user = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                };
                this.accessToken = data.token;
            } catch (err: any) {
                throw err;
            }
        },
        logout() {
            // eslint-disable-next-line no-useless-catch
            try {
                const { data } = axios.post('/auth/logout');
                this.user = null;
                this.accessToken = null;
            } catch (err: any) {
                throw err;
            }
        },
    },
});
