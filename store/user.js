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
            if (value === null) {
                localStorage.removeItem('user');
            } else {
                localStorage.setItem('user', JSON.stringify(value));
            }
        },
        setToken(value) {
            this.$state.token = value;
            if (value === null) {
                localStorage.removeItem('token');
            } else {
                localStorage.setItem('token', value);
            }
        },
        setExpiry(value) {
            this.$state.expiry = value;
            if (value === null) {
                localStorage.removeItem('expiry');
            } else {
                localStorage.setItem('expiry', value);
            }
        },
        checkVIP() {
            if (this.$state.user?.is_vip) {
                const now = new Date().getTime();
                if (this.$state.user?.vip_expiry === -1 || this.$state.user?.vip_expiry * 1000 > now) {
                    return true;
                }
                return false;
            }
            return false;
        }
    },
});
