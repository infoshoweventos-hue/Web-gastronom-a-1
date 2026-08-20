/* ============================================================
   MAIN.JS v5 — Lumbre Café & Cocina (Demo Gastronómico)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  const toggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggle.innerHTML = '<i class="ph ph-x"></i>';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle.innerHTML = '<i class="ph ph-list"></i>';
  }

  if (toggle) toggle.addEventListener('click', () => {
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  const accentLines = document.querySelectorAll('.accent-line');
  if (accentLines.length) {
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), 300);
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    accentLines.forEach(el => lineObserver.observe(el));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const modalIcon    = document.getElementById('modalIcon');
  const modalTitle   = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalBody    = document.getElementById('modalBody');
  const modalCta     = document.getElementById('modalCta');

  const WA_NUMBER = '5491125371329'; 

  // Imágenes reales de comida conectadas desde Unsplash
  const servicios = {
    'cafeteria': {
      icon: 'ph ph-coffee',
      title: 'Café de Especialidad',
      tagline: 'Granos seleccionados y tostados en su punto justo.',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80&fit=crop',
      body: `
        <p>Trabajamos exclusivamente con granos de origen único de Colombia y Brasil. Cada taza es calibrada por nuestros baristas para resaltar las mejores notas.</p>
        <ul>
          <li><i class="ph-fill ph-check-circle"></i> Espresso, Flat White, Latte y filtrados</li>
          <li><i class="ph-fill ph-check-circle"></i> Opciones de leches vegetales (Almendra y Avena)</li>
          <li><i class="ph-fill ph-check-circle"></i> Venta de granos en cuarto para llevar</li>
        </ul>
      `,
      cta: 'Pedir mi café'
    },
    'pasteleria': {
      icon: 'ph ph-croissant',
      title: 'Pastelería Artesanal',
      tagline: 'Elaboración propia todas las mañanas.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&fit=crop',
      body: `
        <p>Acompañá tu café con nuestra panadería y pastelería horneada en el día. Sin conservantes y con manteca de primera calidad.</p>
        <ul>
          <li><i class="ph-fill ph-check-circle"></i> Croissants y medialunas de manteca</li>
          <li><i class="ph-fill ph-check-circle"></i> Budines húmedos y alfajores de almendra</li>
          <li><i class="ph-fill ph-check-circle"></i> Opciones sin TACC y veganas</li>
        </ul>
      `,
      cta: 'Ver opciones dulces'
    },
    'almuerzos': {
      icon: 'ph ph-fork-knife',
      title: 'Almuerzos Caseros',
      tagline: 'Comida real, como hecha en casa.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80&fit=crop',
      body: `
        <p>Para el mediodía preparamos platos contundentes y sabrosos. Platos abundantes como nuestras pastas con esa salsita de tomate especial a fuego lento.</p>
        <ul>
          <li><i class="ph-fill ph-check-circle"></i> Menú ejecutivo diferente cada día</li>
          <li><i class="ph-fill ph-check-circle"></i> Pastas, carnes horneadas y tartas de estación</li>
          <li><i class="ph-fill ph-check-circle"></i> Bebida y café incluidos en el combo</li>
        </ul>
      `,
      cta: 'Ver menú del día'
    },
    'brunch': {
      icon: 'ph ph-egg',
      title: 'Brunch de Fin de Semana',
      tagline: 'La mejor forma de arrancar tu sábado o domingo.',
      image: 'https://images.unsplash.com/photo-1640113293816-6091db485548?w=800&q=80&fit=crop',
      body: `
        <p>Vení sin apuro. Preparamos un brunch para compartir que tiene de todo un poco para que no tengas que elegir entre dulce y salado.</p>
        <ul>
          <li><i class="ph-fill ph-check-circle"></i> Tostadas de masa madre con palta y huevos</li>
          <li><i class="ph-fill ph-check-circle"></i> Yogurt casero con granola y frutas</li>
          <li><i class="ph-fill ph-check-circle"></i> Incluye café libre o dos mimosas</li>
        </ul>
      `,
      cta: 'Reservar para el finde'
    },
    'tienda': {
      icon: 'ph ph-bag',
      title: 'Tienda Cafetera',
      tagline: 'Llevate el café de especialidad a tu casa.',
      image: 'https://images.unsplash.com/photo-1611077544837-14e365023961?w=800&q=80&fit=crop',
      body: `
        <p>No solo te servimos el café, también te equipamos. Trabajamos con ceramistas locales y tostadores para tener siempre stock fresco.</p>
        <ul>
          <li><i class="ph-fill ph-check-circle"></i> Tazas de cerámica de autor</li>
          <li><i class="ph-fill ph-check-circle"></i> Métodos de filtrado (V60, Aeropress, Chemex)</li>
          <li><i class="ph-fill ph-check-circle"></i> Asesoramiento de baristas para tu equipo</li>
        </ul>
      `,
      cta: 'Consultar stock'
    },
    'eventos': {
      icon: 'ph ph-champagne',
      title: 'Eventos Privados',
      tagline: 'Tu festejo con el local cerrado solo para vos.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80&fit=crop',
      body: `
        <p>¿Tenés un cumpleaños, una reunión de oficina o un festejo íntimo? Cerramos el local y nos encargamos de que la comida y la bebida no paren de salir.</p>
        <ul>
          <li><i class="ph-fill ph-check-circle"></i> Capacidad máxima de 40 personas</li>
          <li><i class="ph-fill ph-check-circle"></i> Menú de bandejeo a medida (frío y caliente)</li>
          <li><i class="ph-fill ph-check-circle"></i> Barra de cafetería y coctelería libre</li>
        </ul>
      `,
      cta: 'Pedir presupuesto'
    }
  };

  function openModal(serviceId) {
    const s = servicios[serviceId];
    if (!s) return;

    modalIcon.className = s.icon;
    modalTitle.textContent = s.title;
    modalTagline.textContent = s.tagline;

    modalBody.innerHTML = `
      <img
        src="${s.image}"
        alt="${s.title}"
        style="width:100%; height:200px; object-fit:cover; border-radius:12px; margin-bottom:1.5rem; display:block;"
        loading="lazy"
      />
      ${s.body}
    `;

    const waMsg = encodeURIComponent(`Hola! Vi la opción de "${s.title}" en la web y me gustaría saber más.`);
    modalCta.href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
    modalCta.querySelector('.modal__cta-text').textContent = s.cta;

    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  let toastShown = false;
  const toast = document.getElementById('welcomeToast');

  function checkToastScroll() {
    if (toastShown) return;
    const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrollPct >= 0.30) {
      toast?.classList.add('show');
      toastShown = true;
      window.removeEventListener('scroll', checkToastScroll);
    }
  }

  if (toast) {
    window.addEventListener('scroll', checkToastScroll, { passive: true });
    document.getElementById('toastClose')?.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

});
