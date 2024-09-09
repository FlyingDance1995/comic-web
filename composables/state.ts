export const userDarkMode = () => {
    const isDarkMode = useState("darkMode", () => false);

    onMounted(() => {
        isDarkMode.value = localStorage.getItem("theme") === "dark-theme";

        setDarkMode();
    });

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        localStorage.setItem("theme", isDarkMode.value ? "dark-theme" : "light-theme");
        setDarkMode();
    };

    const setDarkMode = () => {
        const theme = localStorage.getItem("theme");
        if (theme === 'dark-theme') {
            document.documentElement.classList.add('dark-theme');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#212529');
            document.querySelector('meta[name="msapplication-TileColor"]')?.setAttribute('content', '#212529');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
            document.querySelector('meta[name="msapplication-TileColor"]')?.setAttribute('content', '#ffffff');
        }
    };

    return {
        isDarkMode,
        toggleDarkMode
    }
}
