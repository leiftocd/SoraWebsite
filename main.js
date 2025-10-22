        // Load More functionality
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const hiddenCards = document.querySelectorAll('.meme-card.hidden');
        let currentIndex = 0;
        const cardsPerLoad = 6;

        loadMoreBtn.addEventListener('click', () => {
            const endIndex = Math.min(currentIndex + cardsPerLoad, hiddenCards.length);
            
            for (let i = currentIndex; i < endIndex; i++) {
                hiddenCards[i].classList.remove('hidden');
            }
            
            currentIndex = endIndex;
            
            // Hide button if all cards are shown
            if (currentIndex >= hiddenCards.length) {
                loadMoreBtn.style.display = 'none';
            }
            
            // Smooth scroll to first newly shown card
            if (hiddenCards[currentIndex - cardsPerLoad]) {
                setTimeout(() => {
                    hiddenCards[currentIndex - cardsPerLoad].scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            }
        });

        // Add parallax effect
        document.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const xMove = (x - 0.5) * 50 * speed;
                const yMove = (y - 0.5) * 50 * speed;
                shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });

        // Add scroll animation
        const cards = document.querySelectorAll('.meme-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            if (!card.classList.contains('hidden')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            }
        });