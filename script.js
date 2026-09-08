/* SEAL — mejoras progresivas. El contenido y los acordeones funcionan sin JS. */
'use strict';
document.documentElement.classList.add('js');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 821px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

/* Observer único: animaciones discretas y de una sola ejecución. */
const revealElements = document.querySelectorAll('.section-heading, .problem-grid, .feature-grid, .workflow, .detail-grid, .ai-layout, .signature-layout, .audit-timeline, .security-layout, .architecture-layout, .development-timeline, .users-grid, .team-grid, .demo-heading');
let revealObserver;
if ('IntersectionObserver' in window && !motionPreference.matches) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  revealElements.forEach(element => {
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
}
motionPreference.addEventListener('change', event => {
  if (event.matches) {
    revealObserver?.disconnect();
    revealElements.forEach(element => element.classList.add('is-visible'));
  }
});

/* Valores reportados por el equipo. La animación no altera el resultado final. */
function animateMetric(element) {
  const value = Number(element.dataset.count);
  const decimals = Number(element.dataset.decimals || 0);
  const start = performance.now();
  const duration = 1000;
  // Lectores de pantalla reciben el resultado final, no cada cuadro del contador.
  element.setAttribute('aria-label', value.toFixed(decimals));
  function frame(now) {
    const progress = motionPreference.matches ? 1 : Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = (value * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const metricsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(animateMetric);
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  metricsObserver.observe(document.querySelector('.metrics'));
}

document.querySelector('#save-draft').addEventListener('click', () => {
  document.querySelector('#draft-state').textContent = 'Borrador revisado';
  document.querySelector('#draft-feedback').textContent = 'Ejemplo: el borrador está listo para guardar. No se almacenaron datos ni se modificó un contrato real.';
});

/* Canvas ilustrativo. Sin red, cookies, persistencia, token ni validez de firma.
   Coordenadas relativas al tamaño CSS: funciona con zoom y distintos anchos. */
const canvas = document.querySelector('#signature-canvas');
const context = canvas.getContext('2d');
const signatureStatus = document.querySelector('#signature-status');
let drawing = false;
let activePointer = null;
function point(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
}
if (context) {
  context.strokeStyle = '#143c32';
  context.fillStyle = '#143c32';
  context.lineWidth = 3;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    drawing = true;
    activePointer = event.pointerId;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    context.beginPath();
    context.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(p.x, p.y);
    signatureStatus.textContent = 'Trazo de prueba local. No se envía ni se guarda.';
  });
  canvas.addEventListener('pointermove', event => {
    if (!drawing || event.pointerId !== activePointer) return;
    const p = point(event);
    context.lineTo(p.x, p.y);
    context.stroke();
  });
  function finishStroke(event) {
    if (event.pointerId !== activePointer) return;
    drawing = false;
    activePointer = null;
  }
  canvas.addEventListener('pointerup', finishStroke);
  canvas.addEventListener('pointercancel', finishStroke);
  canvas.addEventListener('lostpointercapture', finishStroke);
  document.querySelector('#clear-signature').addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawing = false;
    activePointer = null;
    signatureStatus.textContent = 'Área limpia. Esta prueba no firma ningún contrato.';
  });
}
