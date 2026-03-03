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
        if (theme) {
            root.setAttribute("data-theme", theme);
        } else {
            root.removeAttribute("data-theme"); // allow system
        }

        updateIcon(theme === "dark");
    }

    function toggleTheme() {
        const current = root.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";

        localStorage.setItem(storageKey, newTheme);
        applyTheme(newTheme);
    }

    // Initial load
    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme);

    // Attach button listener when injected
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