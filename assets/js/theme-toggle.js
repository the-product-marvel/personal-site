console.log("Theme toggle loaded");

(() => {
    const root = document.documentElement;
    const storageKey = 'theme';

    function getButton() {
        return document.querySelector('.theme-toggle');
    }

    function getIcon() {
        return document.getElementById('theme-icon');
    }

    function updateIcon(isDark) {
        const icon = getIcon();
        if (!icon) return;
        icon.textContent = isDark ? '☀️' : '🌙';
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';

        if (isDark) {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        updateIcon(isDark);
    }

    function toggleTheme() {
        const isDark = root.hasAttribute('data-theme');
        const newTheme = isDark ? 'light' : 'dark';

        localStorage.setItem(storageKey, newTheme);
        applyTheme(newTheme);
    }

    // Wait until full page (including partials) is loaded
    window.addEventListener('load', () => {
        console.log("Load fired");

        // Apply saved theme
        const savedTheme = localStorage.getItem(storageKey);
        applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
        console.log("Button found:", button);
        // Attach click handler AFTER partials exist
        const button = getButton();
        if (button) {
            button.addEventListener('click', toggleTheme);
        }
    });
})();