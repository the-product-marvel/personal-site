(() => {
    const root = document.documentElement;
    const storageKey = 'theme';
    const button = document.querySelector('.theme-toggle');
    const icon = document.getElementById('theme-icon');

    function updateIcon(theme) {
        if (!icon) return;

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark') {
            icon.textContent = '☀️';   // show sun (click = go light)
        }
        else if (theme === 'light') {
            icon.textContent = '🌙';   // show moon (click = go dark)
        }
        else {
            icon.textContent = '🖥️';   // explicitly show system mode
        }
    }

    function applyTheme(theme) {
        if (theme) {
            root.setAttribute('data-theme', theme);
        } else {
            root.removeAttribute('data-theme'); // system mode
        }

        updateIcon(theme);
    }

    function cycleTheme() {
        const current = root.getAttribute('data-theme');

        let next;

        if (current === 'dark') next = 'light';
        else if (current === 'light') next = null; // system
        else next = 'dark';

        if (next) {
            localStorage.setItem(storageKey, next);
        } else {
            localStorage.removeItem(storageKey);
        }

        applyTheme(next);
    }

    // Initial load
    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme);

    button?.addEventListener('click', cycleTheme);
})();