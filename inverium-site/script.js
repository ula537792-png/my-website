document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mega Smooth Imba Transition Interceptor
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !link.getAttribute('target')) {
            link.addEventListener('click', e => {
                e.preventDefault();
                document.body.classList.add('transitioning');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            });
        }
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (hamburger && mobileDrawer) {
        hamburger.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
            document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
        });
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Mouse Glow Follower
    const mouseGlow = document.getElementById('mouseGlow');
    if (mouseGlow) {
        window.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    }

    // Real-Time Live Counters Simulation
    const liveUsersElement = document.querySelector('.stat-number[data-target="1.4"]');
    if (liveUsersElement) {
        setInterval(() => {
            let currentVal = parseFloat(liveUsersElement.textContent);
            let fluctuation = (Math.random() * 0.04 - 0.02);
            let newVal = Math.max(1.2, Math.min(1.8, currentVal + fluctuation));
            liveUsersElement.textContent = newVal.toFixed(1);
        }, 3500);
    }

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    const animateCounters = () => {
        if (animated) return;
        statNumbers.forEach(num => {
            const target = parseFloat(num.getAttribute('data-target'));
            const decimal = parseInt(num.getAttribute('data-decimal')) || 0;
            let current = 0;
            const duration = 1500;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.textContent = current.toFixed(decimal);
            }, stepTime);
        });
        animated = true;
    };

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) animateCounters();
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // Render Featured Scripts
    const featuredGrid = document.getElementById('featuredScriptsGrid');
    if (featuredGrid && typeof scriptDatabase !== 'undefined') {
        featuredGrid.innerHTML = scriptDatabase.map(script => `
            <div class="script-card">
                <div class="card-image-wrapper">
                    <img src="${script.image}" alt="${script.title}" class="card-image" loading="lazy">
                    <div class="card-overlay"></div>
                    <span class="card-status-badge">${script.status}</span>
                </div>
                <div class="card-body">
                    <span class="card-game-name">${script.game}</span>
                    <h3 class="card-title">${script.title}</h3>
                    <p class="card-desc">${script.description}</p>
                    <div class="card-footer">
                        <span class="card-meta">v${script.version}</span>
                        <a href="script.html?id=${script.id}" class="btn-card">
                            <span>GET SCRIPT</span>
                            <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Scripts Database Page Logic
    const allScriptsGrid = document.getElementById('allScriptsGrid');
    const searchInput = document.getElementById('scriptSearchInput');

    if (allScriptsGrid && typeof scriptDatabase !== 'undefined') {
        let searchQuery = '';

        const renderScripts = () => {
            const filtered = scriptDatabase.filter(script => 
                script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                script.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                script.description.toLowerCase().includes(searchQuery.toLowerCase())
            );

            allScriptsGrid.innerHTML = filtered.map(script => `
                <div class="script-card">
                    <div class="card-image-wrapper">
                        <img src="${script.image}" alt="${script.title}" class="card-image" loading="lazy">
                        <div class="card-overlay"></div>
                        <span class="card-status-badge">${script.status}</span>
                    </div>
                    <div class="card-body">
                        <span class="card-game-name">${script.game}</span>
                        <h3 class="card-title">${script.title}</h3>
                        <p class="card-desc">${script.description}</p>
                        <div class="card-footer">
                            <span class="card-meta">v${script.version}</span>
                            <a href="script.html?id=${script.id}" class="btn-card">
                                <span>GET SCRIPT</span>
                                <i data-lucide="arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        };

        renderScripts();

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                renderScripts();
            });
        }
    }

    // Script Details Page Logic
    const scriptDetailsContainer = document.getElementById('scriptDetailsContainer');
    if (scriptDetailsContainer && typeof scriptDatabase !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const scriptId = urlParams.get('id');
        const script = scriptDatabase.find(s => s.id === scriptId) || scriptDatabase[0];

        document.title = `${script.title} — Inverium`;

        scriptDetailsContainer.innerHTML = `
            <div>
                <a href="scripts.html" class="back-link">
                    <i data-lucide="arrow-left"></i>
                    <span>BACK TO SCRIPTS</span>
                </a>
                <div class="glass-card script-preview-card">
                    <img src="${script.image}" alt="${script.title}" class="script-preview-image">
                </div>
            </div>

            <div class="script-info-content">
                <div class="script-header-info">
                    <span class="card-game-name">${script.game}</span>
                    <h1 class="script-title-large">${script.title}</h1>
                    <div class="meta-badges">
                        <span class="card-status-badge">${script.status}</span>
                        <span class="card-status-badge" style="background: rgba(139, 92, 246, 0.15); border-color: rgba(139, 92, 246, 0.3); color: var(--purple-glow);">VERSION ${script.version}</span>
                        <span class="card-status-badge" style="background: rgba(156, 163, 175, 0.15); border-color: rgba(156, 163, 175, 0.3); color: var(--text-muted);">UPDATED ${script.updated.toUpperCase()}</span>
                    </div>
                </div>

                <div class="info-block">
                    <h3>DESCRIPTION</h3>
                    <p>${script.description}</p>
                </div>

                <div class="info-block">
                    <h3>KEY FEATURES</h3>
                    <ul style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-muted); font-size: 0.95rem;">
                        ${script.features.map(f => `<li style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="check" style="width: 16px; height: 16px; color: #27C93F;"></i><span>${f}</span></li>`).join('')}
                    </ul>
                </div>

                <div class="info-block">
                    <h3>REQUIREMENTS</h3>
                    <ul style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-muted); font-size: 0.95rem;">
                        ${script.requirements.map(r => `<li style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="shield" style="width: 16px; height: 16px; color: var(--purple-glow);"></i><span>${r}</span></li>`).join('')}
                    </ul>
                </div>

                <div class="info-block">
                    <h3>HOW TO USE</h3>
                    <div class="timeline-steps">
                        <div class="timeline-step-card">
                            <span class="step-number">01</span>
                            <span class="step-title">Open Executor</span>
                            <p style="font-size: 0.8rem; color: var(--text-muted);">Launch your preferred secure executor.</p>
                        </div>
                        <div class="timeline-step-card">
                            <span class="step-number">02</span>
                            <span class="step-title">Copy Script</span>
                            <p style="font-size: 0.8rem; color: var(--text-muted);">Click the copy button on the terminal below.</p>
                        </div>
                        <div class="timeline-step-card">
                            <span class="step-number">03</span>
                            <span class="step-title">Paste Script</span>
                            <p style="font-size: 0.8rem; color: var(--text-muted);">Paste the loadstring into your console.</p>
                        </div>
                        <div class="timeline-step-card">
                            <span class="step-number">04</span>
                            <span class="step-title">Execute</span>
                            <p style="font-size: 0.8rem; color: var(--text-muted);">Click execute and enjoy features.</p>
                        </div>
                    </div>
                </div>

                <div class="info-block">
                    <h3>SCRIPT CODE</h3>
                    <div class="code-terminal-wrapper">
                        <div class="code-terminal-header">
                            <div class="terminal-dots">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                            </div>
                            <div class="terminal-title">INVERIUM_LOADER.lua</div>
                            <button class="code-copy-btn" id="copyScriptBtn">
                                <i data-lucide="copy"></i>
                                <span>COPY</span>
                            </button>
                        </div>
                        <div class="code-editor-body">
                            <pre><code><span class="code-comment">-- Inverium Secure Loader</span>
<span class="code-keyword">local</span> <span class="code-function">scriptLink</span> = <span class="code-string">"${script.script}"</span>
<span class="code-function">loadstring</span>(scriptLink)()</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();

        const copyBtn = document.getElementById('copyScriptBtn');
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        if (copyBtn && toast) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(script.script).then(() => {
                    toastMessage.textContent = 'Script copied to clipboard!';
                    toast.classList.add('show');
                    copyBtn.innerHTML = `<i data-lucide="check"></i><span>COPIED!</span>`;
                    lucide.createIcons();

                    setTimeout(() => {
                        toast.classList.remove('show');
                        copyBtn.innerHTML = `<i data-lucide="copy"></i><span>COPY</span>`;
                        lucide.createIcons();
                    }, 3000);
                });
            });
        }
    }
});