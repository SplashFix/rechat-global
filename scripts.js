// Funktion zum Hochzählen der Zahlen
function animateStatNumbers() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const endValue = parseFloat(stat.getAttribute('data-number')); // Zielwert aus dem data-number Attribut
        const isUptime = stat.classList.contains('uptime'); // Prüfen, ob es sich um Uptime handelt
        let currentValue = 0;
        const duration = 2000; // Dauer der Animation (2 Sekunden)
        const startTime = performance.now(); // Startzeit der Animation

        // Eine Funktion für eine flüssige Animation mit requestAnimationFrame
        function animate(time) {
            const elapsedTime = time - startTime; // Zeit, die seit dem Start vergangen ist
            const progress = Math.min(elapsedTime / duration, 1); // Fortschritt der Animation (zwischen 0 und 1)

            currentValue = progress * endValue; // Berechnung des aktuellen Wertes

            // Wenn es sich um Uptime handelt, formatieren wir den Wert als Prozent
            if (isUptime) {
                // Berechne den Prozentsatz und formatiere ihn mit 2 Dezimalstellen
                const formattedValue = currentValue.toLocaleString('de-DE', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }) + '%';
                stat.textContent = formattedValue; // Zeige den formatierten Wert an
            } else {
                stat.textContent = Math.floor(currentValue) + (progress === 1 ? "+" : ""); // Normale Zahl anzeigen
            }

            // Wenn der Fortschritt kleiner als 1 ist, wird die Animation weiter ausgeführt
            if (progress < 1) {
                requestAnimationFrame(animate); // Animation fortsetzen
            }
        }

        requestAnimationFrame(animate); // Starte die Animation
    });
}

// Intersection Observer zum Überwachen der Sichtbarkeit der Zahlen-Box
function setupObserver() {
    const statsSection = document.querySelector('.stats'); // Die Box mit den Zahlen

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers(); // Wenn die Box sichtbar ist, starte die Animation
                observer.unobserve(entry.target); // Stoppe das Überwachen der Box nach der Sichtbarkeit
            }
        });
    }, {
        threshold: 0.5 // Die Box muss mindestens zu 50% sichtbar sein
    });

    observer.observe(statsSection); // Beobachte die Box mit den Zahlen
}

// Sobald die Seite geladen ist, starte den Observer
window.onload = setupObserver;

