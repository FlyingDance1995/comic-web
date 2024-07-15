import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchLogin(params) {
            this.loading = true;
            try {
                const { data } = await useAPI('/auth/login', {
                    body: params
                });

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useLogoutStore = defineStore('logout', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchLogout() {
            this.loading = true;
            try {
                const { data } = await useAPI('/auth/logout');

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useRegisterStore = defineStore('register', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchRegister() {
            this.loading = true;

            try {
                const { data } = await useAPI('/users/register');

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useVerifyOtpStore = defineStore('verify-otp', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchVerifyOtp() {
            this.loading = true;
            
            try {
                const { data } = await useAPI('/users/register/verify-otp');

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useCreateOtpStore = defineStore('create-otp', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchCreateOtp() {
            this.loading = true;
            
            try {
                const { data } = await useAPI('/users/register/create-otp');

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useUsersStore = defineStore('users', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchUsers() {
            this.loading = true;
            try {
                const { data } = await useAPI('/users');

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useUserDetailStore = defineStore('users-detail', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchUserDetail(id) {
            this.loading = true;
            try {
                const { data } = await useAPI(`/users/${id}`);

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useForgotPasswordStore = defineStore('forgot-password', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchForgotPassword() {
            this.loading = true;
            try {
                const { data } = await useAPI('/users/forgot-password');

                console.log('data', data.value)

                this.error = JSON.stringify(data.status_code)
                // this.$state.account = account.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})
