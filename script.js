const loader = document.querySelector('.loader');
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const themeButton = document.querySelector('.theme-toggle');
const roleTarget = document.querySelector('.role-rotator');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('is-done'), 650);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.25 });
document.querySelectorAll('.skills').forEach((element) => skillsObserver.observe(element));

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  nav.classList.toggle('is-open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  nav.classList.remove('is-open');
}));

const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'light') document.body.classList.add('light-theme');
const updateThemeLabel = () => {
  const isLight = document.body.classList.contains('light-theme');
  themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  themeButton.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
};
updateThemeLabel();
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeLabel();
});

const roles = ['Frontend development', 'Full-stack thinking', 'Interface design'];
let roleIndex = 0;
window.setInterval(() => {
  roleTarget.classList.add('role-changing');
  window.setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleTarget.textContent = roles[roleIndex];
    roleTarget.classList.remove('role-changing');
  }, 180);
}, 2800);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const subject = encodeURIComponent(`Portfolio hello from ${values.get('name')}`);
  const body = encodeURIComponent(`${values.get('message')}\n\nFrom: ${values.get('name')} (${values.get('email')})`);
  formStatus.textContent = 'Opening your email app...';
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
if (window.matchMedia('(pointer: fine) and (min-width: 701px)').matches) {
  document.body.classList.add('has-cursor');
  window.addEventListener('mousemove', (event) => {
    cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    cursorRing.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => cursorRing.classList.add('is-hover'));
    element.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hover'));
  });
}