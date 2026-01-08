document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.js-footer-toggle');
  if (!toggle || window.innerWidth > 991) return;

  const block = toggle.closest('.footer__menu-links');
  block.classList.toggle('is-open');
});