(() => {
    const root = document.documentElement;
    const storageKey = 'theme';
    const icon = document.getElementById('theme-icon');

    function updateIcon(isDark) {
        if (!icon) return;
        icon.textContent = isDark ? '☀️' : '🌙';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            updateIcon(true);
        } else {
            root.removeAttribute('data-theme');
            updateIcon(false);
        }
    }

    // On load
    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    // Expose toggle globally
    window.toggleTheme = function () {
        const isDark = root.hasAttribute('data-theme');
        const newTheme = isDark ? 'light' : 'dark';

        localStorage.setItem(storageKey, newTheme);
        applyTheme(newTheme);
    };
})();