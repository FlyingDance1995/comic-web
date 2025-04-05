export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        const cookie = useCookie('theme', { maxAge: 60 * 60 * 24 * 24 * 365 * 10, default: () => 'light-theme' });
        const theme = cookie.value || 'light-theme';

        useHead({
            htmlAttrs: {
              class: theme === 'dark-theme' ? 'dark-theme' : '',
            },
            meta: [
                { name: 'theme-color', content: theme === 'dark-theme' ? '#212529' : '#f2b3f5' },
                { name: 'msapplication-TileColor', content: theme === 'dark-theme' ? '#212529' : '#f2b3f5' },
            ],
        });
    }
});
