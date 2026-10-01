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
