// ページ内リンクはブラウザー標準の履歴・キーボード操作を維持する。
document.querySelectorAll("[data-copy-url]").forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", async () => {
    const status = button.parentElement.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText(button.dataset.copyUrl);
      status.textContent = "URLをコピーしました。保存やシェアにご利用ください。";
    } catch {
      status.textContent = `コピーできませんでした。次のURLを選択してコピーしてください：${button.dataset.copyUrl}`;
    }
  });
});

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
