document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll paytida elementlarni animatsiya bilan chiqarish
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach((el) => revealObserver.observe(el));

    // 2. Statistika raqamlarini sanash animatsiyasi
    const counters = document.querySelectorAll(".counter");
    let started = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            counters.forEach((counter) => {
                const target = +counter.getAttribute("data-target");
                let count = 0;
                const step = Math.max(1, Math.ceil(target / 30));

                const updateCount = () => {
                    count += step;
                    if (count < target) {
                        counter.innerText = count;
                        setTimeout(updateCount, 45);
                    } else {
                        counter.innerText = target + (target >= 30 ? "+" : "");
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.4 });

    const statsBar = document.querySelector(".stats-bar");
    if (statsBar) statsObserver.observe(statsBar);

    // 3. Yuqoriga qaytish tugmasi
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});