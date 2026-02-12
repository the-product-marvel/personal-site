(() => {
    const root = document.documentElement;
    const storageKey = 'theme';

    function getIcon() {
        return document.getElementById('theme-icon');
    }

    function updateIcon(isDark) {
        const icon = getIcon();
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

    // Apply saved theme after full DOM + partials load
    window.addEventListener('load', () => {
        const savedTheme = localStorage.getItem(storageKey);
        applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
    });

    window.toggleTheme = function () {
        const isDark = root.hasAttribute('data-theme');
        const newTheme = isDark ? 'light' : 'dark';

        localStorage.setItem(storageKey, newTheme);
        applyTheme(newTheme);
    };
})();