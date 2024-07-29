import {useUserStore} from "~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.meta.layout === 'admin') {
        const userStore = useUserStore();

        const user = computed(() => userStore.$state.user);

        if (to.path === '/login') return;

        if (!user.value) {
            return navigateTo('/login');
        } else if (user.value?.role === 'user') {
            return navigateTo('/');
        }
    }
});
