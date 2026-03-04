(() => {
    const root = document.documentElement;
    const storageKey = 'theme';

    function updateIcon(theme) {
        const icon = document.getElementById('theme-icon');
        if (!icon) return;

        if (theme === 'dark') icon.textContent = '☀️';
        else if (theme === 'light') icon.textContent = '🌙';
        else icon.textContent = '🖥️';
    }

    function applyTheme(theme) {
        if (theme) {
            root.setAttribute('data-theme', theme);
        } else {
            root.removeAttribute('data-theme');
        }

        updateIcon(theme);
    }

    function cycleTheme() {
        const current = root.getAttribute('data-theme');

        let next;
        if (current === 'dark') next = 'light';
        else if (current === 'light') next = null;
        else next = 'dark';

        if (next) localStorage.setItem(storageKey, next);
        else localStorage.removeItem(storageKey);

        applyTheme(next);
    }

    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme);

    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle')) {
            cycleTheme();
        }
    });
})();