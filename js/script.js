/* ============================================================
   EL ARPA – LEÑA Y TRADICIÓN
   script.js – Funcionalidades principales
   ============================================================ */

'use strict';

/* ── 1. Navbar: efecto scroll ────────────────────────────────── */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // ejecutar al cargar


/* ── 2. Menú móvil (hamburguesa) ────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden',  String(!open));
  // Prevenir scroll del body cuando el menú está abierto
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.contains('open');
  toggleMenu(!isOpen);
});

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Cerrar al presionar Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamburger.classList.contains('open')) {
    toggleMenu(false);
    hamburger.focus();
  }
});


/* ── 3. Scroll reveal (IntersectionObserver) ─────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay basado en la posición del elemento en su grupo
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx * 0.08, 0.4)}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ── 4. Smooth scroll para anclas ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── 5. Formulario de contacto con validación ───────────────── */
const form        = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

/**
 * Valida un campo individual.
 * @param {HTMLElement} field
 * @returns {boolean} válido o no
 */
function validateField(field) {
  const errorEl = field.parentElement.querySelector('.form-error');
  if (!errorEl) return true;

  let message = '';

  if (field.required && !field.value.trim()) {
    message = 'Este campo es obligatorio.';
  } else if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value.trim())) {
      message = 'Por favor ingresa un correo válido.';
    }
  } else if (field.id === 'nombre' && field.value.trim().length < 2) {
    message = 'El nombre debe tener al menos 2 caracteres.';
  } else if (field.id === 'mensaje' && field.value.trim().length < 10) {
    message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  errorEl.textContent = message;
  field.style.borderColor = message ? 'var(--color-ember)' : '';
  return message === '';
}

// Validación en tiempo real (blur)
form.querySelectorAll('input[required], textarea[required]').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.style.borderColor) validateField(field); // re-validar si ya hubo error
  });
});

// Envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar todos los campos requeridos
  const requiredFields = [...form.querySelectorAll('input[required], textarea[required]')];
  const allValid = requiredFields.every(f => validateField(f));

  if (!allValid) {
    // Enfocar el primer campo inválido
    const firstInvalid = requiredFields.find(f => !validateField(f));
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Estado de carga
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';

  try {
    /*
      NOTA: Este formulario NO tiene backend por defecto.
      Para activarlo, tienes dos opciones:

      OPCIÓN A – Formspree (recomendado, gratis):
        1. Crea una cuenta en https://formspree.io
        2. Crea un nuevo formulario y obtén tu endpoint
        3. Reemplaza la URL de abajo con tu endpoint de Formspree

      OPCIÓN B – Emailjs:
        Configura EmailJS con tu cuenta y reemplaza la lógica de envío.

      Por ahora simulamos un envío exitoso.
    */

    // Simulación de envío (reemplazar con llamada real)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Éxito
    form.reset();
    form.style.display = 'none';
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

  } catch (err) {
    // Error
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensaje';
    const errorDiv = document.createElement('p');
    errorDiv.style.cssText = 'color: var(--color-ember); text-align:center; margin-top:.75rem; font-size:.9rem;';
    errorDiv.textContent = 'Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.';
    form.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }
});


/* ── 6. Año actual en el footer ─────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ── 7. Galería: lightbox sencillo ──────────────────────────── */
const galItems = document.querySelectorAll('.gal-item');

// Solo activar si las imágenes tienen un background-image real (no el placeholder)
galItems.forEach(item => {
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');

  const openLightbox = () => {
    const bg = item.style.backgroundImage;
    // Extraer URL del background-image
    const urlMatch = bg.match(/url\(["']?(.+?)["']?\)/);
    if (!urlMatch || urlMatch[1].includes('gradient')) return; // no abrir si es solo gradiente

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.92);
      display:flex; align-items:center; justify-content:center; cursor:zoom-out;
      animation: fadeIn .25s ease;
    `;
    const img = document.createElement('img');
    img.src = urlMatch[1];
    img.style.cssText = 'max-width:90vw; max-height:85vh; border-radius:8px; box-shadow:0 0 60px rgba(0,0,0,.8);';
    img.alt = item.getAttribute('aria-label') || 'Foto de El Arpa';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Cerrar imagen');
    closeBtn.style.cssText = `
      position:absolute; top:1rem; right:1.25rem; background:none; border:none;
      color:#fff; font-size:1.75rem; cursor:pointer; line-height:1; opacity:.8;
    `;
    closeBtn.addEventListener('click', (ev) => { ev.stopPropagation(); overlay.remove(); });

    const close = () => overlay.remove();
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    closeBtn.focus();
  };

  item.addEventListener('click', openLightbox);
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(); });
});


/* ── 8. Highlight del link activo en la navbar ──────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--color-gold)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));


/* ── 9. Animación de contadores en las estadísticas del hero ── */
function animateCounter(el, end, duration = 1800) {
  const startTime = performance.now();
  const startVal  = 0;
  const isFloat   = String(end).includes('.');

  const step = (now) => {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (end - startVal) * eased;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('es-CO');
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// Observar el hero para activar contadores
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      //animateCounter(document.querySelector('.stat:nth-child(1) .stat-number'), 40000);
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}
