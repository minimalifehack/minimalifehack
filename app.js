const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
if (menuToggle && siteMenu) {
  menuToggle.hidden = false;
  siteMenu.hidden = true;
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    siteMenu.hidden = true;
  };
  menuToggle.addEventListener('click', () => {
    const opening = siteMenu.hidden;
    siteMenu.hidden = !opening;
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'メニューを閉じる' : 'メニューを開く');
  });
  siteMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !siteMenu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
}
