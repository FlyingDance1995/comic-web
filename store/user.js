// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user-store',
    state: () => {
        let user = JSON.parse(localStorage.getItem('user') || null);
        let token = localStorage.getItem('token') || null;
        let expiry = localStorage.getItem('expiry') || null;

        const dateToCompare = new Date(expiry);
        const now = new Date();

        if (dateToCompare < now) {
            user = null;
            token = null;
            expiry = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('expiry');
        }

        return {
            user: user,
            token: token,
            expiry: expiry,
        }
    },
    actions: {
        setUser(value) {
            this.$state.user = value;
            localStorage.setItem('user', JSON.stringify(value));
        },
        setToken(value) {
            this.$state.token = value;
            localStorage.setItem('token', value);
        },
        setExpiry(value) {
            this.$state.expiry = value;
            localStorage.setItem('expiry', value);
        },
    },
});
