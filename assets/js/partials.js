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

        /* =========================================================
           PLAYFUL EXTRAS ENHANCEMENTS (Clean Click vs Drag)
           ========================================================= */

        let activeItem = null;
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        // Drag start
        document.addEventListener('mousedown', (e) => {
            const item = e.target.closest('.extra-item');
            if (!item) return;

            activeItem = item;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            isDragging = false;
        });

        // Drag move
        document.addEventListener('mousemove', (e) => {
            if (!activeItem) return;

            isDragging = true;

            activeItem.style.position = 'absolute';
            activeItem.style.zIndex = 1000;
            activeItem.style.cursor = 'grabbing';
            activeItem.style.left = `${e.pageX - offsetX}px`;
            activeItem.style.top = `${e.pageY - offsetY}px`;
        });

        // Drag end
        document.addEventListener('mouseup', (e) => {
            if (!activeItem) return;

            // If it was NOT dragged, treat it as a click
            if (!isDragging) {
                createConfettiBurst(activeItem);
            }

            activeItem.style.cursor = 'grab';
            activeItem = null;
            isDragging = false;
        });

        // Confetti function
        function createConfettiBurst(element) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 10; i++) {
                const sparkle = document.createElement('span');
                sparkle.textContent = '✨';
                sparkle.style.position = 'fixed';
                sparkle.style.left = `${centerX}px`;
                sparkle.style.top = `${centerY}px`;
                sparkle.style.pointerEvents = 'none';
                sparkle.style.transition = 'all 600ms ease';
                sparkle.style.opacity = '1';

                document.body.appendChild(sparkle);

                const angle = Math.random() * 2 * Math.PI;
                const distance = 40 + Math.random() * 30;

                requestAnimationFrame(() => {
                    sparkle.style.transform = `
                translate(
                    ${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px
                )
            `;
                    sparkle.style.opacity = '0';
                });

                setTimeout(() => sparkle.remove(), 600);
            }
        }

    } catch (error) {
        console.error('Partial loading error:', error);
    }
})();