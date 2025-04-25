
        // JavaScript-Code bleibt unverändert
        function isConnectionSlow() {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (!conn) return false;
            return conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
        }
        
        function animateStatNumbers(useFallback = false) {
            const stats = document.querySelectorAll('.stat-number');
        
            stats.forEach(stat => {
                const endValue = parseFloat(stat.getAttribute('data-number'));
                const isUptime = stat.classList.contains('uptime');
        
                if (useFallback) {
                    if (isUptime) {
                        stat.textContent = endValue.toLocaleString('de-DE', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) + '%';
                    } else {
                        stat.textContent = Math.floor(endValue) + "+";
                    }
                    return;
                }
        
                let currentValue = 0;
                const duration = 2000;
                const startTime = performance.now();
        
                function animate(time) {
                    const elapsedTime = time - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    currentValue = progress * endValue;
        
                    if (isUptime) {
                        const formattedValue = currentValue.toLocaleString('de-DE', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) + '%';
                        stat.textContent = formattedValue;
                    } else {
                        stat.textContent = Math.floor(currentValue) + (progress === 1 ? "+" : "");
                    }
        
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }
        
                requestAnimationFrame(animate);
            });
        }
        
        function setupObserver() {
            const statsSection = document.querySelector('.stats');
            const fallback = isConnectionSlow();
        
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStatNumbers(fallback);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
        
            observer.observe(statsSection);
        }
        
        window.onload = setupObserver;
        
        document.querySelector(".btn-secondary").addEventListener("click", function(event) {
            event.preventDefault();
            const section = document.querySelector("#globalchat");
            section.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
