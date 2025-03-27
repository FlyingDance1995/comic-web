export const userDarkMode = () => {
    const isDarkMode = useState("darkMode", () => false);
    const themeCookie = useCookie('theme', { default: () => 'light-theme' });

    onMounted(() => {
        isDarkMode.value = themeCookie.value === "dark-theme";
        setDarkMode();
    });

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        themeCookie.value = isDarkMode.value ? "dark-theme" : "light-theme";
        setDarkMode();
    };

    const setDarkMode = () => {
        const theme = themeCookie.value;

        if (theme === 'dark-theme') {
            document.documentElement.classList.add('dark-theme');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#212529');
            document.querySelector('meta[name="msapplication-TileColor"]')?.setAttribute('content', '#212529');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f2b3f5');
            document.querySelector('meta[name="msapplication-TileColor"]')?.setAttribute('content', '#f2b3f5');
        }
    };

    return {
        isDarkMode,
        toggleDarkMode
    };
};