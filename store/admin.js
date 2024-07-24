import { defineStore } from 'pinia';

export const useLoginStore = defineStore('admin-1', {
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

export const useRegisterStore = defineStore('admin-2', {
    state: () => ({
        account: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchRegister(params) {
            this.loading = true;

            try {
                const { data } = await useAPI('/users/register', {
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

export const useUsersStore = defineStore('admin-3', {
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

export const useUserDetailStore = defineStore('admin-4', {
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
