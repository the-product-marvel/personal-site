console.log("partials.js loaded");

document.addEventListener('DOMContentLoaded', async () => {
    const slots = document.querySelectorAll('[data-partial]');

    for (const slot of slots) {
        const path = slot.getAttribute('data-partial');

        try {
            const response = await fetch(path);

            if (!response.ok) {
                console.error(`❌ Failed to load partial: ${path}`, response.status);
                continue;
            }

            slot.innerHTML = await response.text();
        } catch (error) {
            console.error(`🔥 Error loading partial: ${path}`, error);
        }
    }

    // Footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Extras toggle
    const toggle = document.querySelector('.extras-toggle');
    const content = document.getElementById('extras-content');

    if (toggle && content) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            content.hidden = expanded;
        });
    }
});