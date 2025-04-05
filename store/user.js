import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user-store',
    state: () => {
        const userCookie = useCookie('user');
        const tokenCookie = useCookie('token');
        const expiryCookie = useCookie('expiry');

        let user = userCookie.value || null;
        let token = tokenCookie.value || null;
        let expiry = expiryCookie.value || null;

        const dateToCompare = new Date(expiry);
        const now = new Date();

        if (dateToCompare < now) {
            user = null;
            token = null;
            expiry = null;
            userCookie.value = null;
            tokenCookie.value = null;
            expiryCookie.value = null;
        }

        return {
            user: user,
            token: token,
            expiry: expiry,
        };
    },
    actions: {
        setUser(value) {
            this.$state.user = value;
            const userCookie = useCookie('user', { maxAge: 60 * 60 * 24 * 24 * 365 * 10 });
            if (value === null) {
                userCookie.value = null;
            } else {
                userCookie.value = value;
            }
        },
        setToken(value) {
            this.$state.token = value;
            const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 * 24 * 365 * 10 });
            if (value === null) {
                tokenCookie.value = null;
            } else {
                tokenCookie.value = value;
            }
        },
        setExpiry(value) {
            this.$state.expiry = value;
            const expiryCookie = useCookie('expiry', { maxAge: 60 * 60 * 24 * 24 * 365 * 10 });
            if (value === null) {
                expiryCookie.value = null;
            } else {
                expiryCookie.value = value;
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
        },
    },
});