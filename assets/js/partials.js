// Partials loader + site enhancements
alert("partials.js is running");

(async () => {
    try {
        const slots = document.querySelectorAll('[data-partial]');

        // Load all partials in parallel
        await Promise.all(
            Array.from(slots).map(async (slot) => {
                const path = slot.getAttribute('data-partial');
                const response = await fetch(path);

                if (!response.ok) {
                    throw new Error(`Failed to load ${path}`);
                }

                slot.innerHTML = await response.text();
            })
        );

        // ---- Reveal AFTER partials load ----
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document
            .querySelectorAll('.reveal')
            .forEach((el) => observer.observe(el));

        // ---- Footer year ----
        const year = document.getElementById('year');
        if (year) {
            year.textContent = new Date().getFullYear();
        }

        // ---- Extras toggle ----
        const toggle = document.querySelector('.extras-toggle');
        const content = document.getElementById('extras-content');

        if (toggle && content) {
            toggle.addEventListener('click', () => {
                const expanded =
                    toggle.getAttribute('aria-expanded') === 'true';

                toggle.setAttribute('aria-expanded', String(!expanded));
                content.hidden = expanded;
            });
        }

    } catch (error) {
        console.error('Partial loading error:', error);
    }
})();