(() => {
    const root = document.documentElement;
    const storageKey = 'theme';

    function updateIcon(isDark) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = isDark ? '☀️' : '🌙';
        }
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

    // Apply saved theme immediately
    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    // Watch for when partials inject the button
    const observer = new MutationObserver(() => {
        const button = document.querySelector('.theme-toggle');
        if (button && !button.dataset.listenerAttached) {
            button.addEventListener('click', toggleTheme);
            button.dataset.listenerAttached = "true";
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();