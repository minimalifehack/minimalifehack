const GA_MEASUREMENT_ID = "G-YKS8E5Y9JT";
const ANALYTICS_CHOICE_KEY = "minimalifehack-analytics-choice";
const ANALYTICS_HOST = "minimalifehack.github.io";

if (/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) {
  const settingsButton = document.querySelector("[data-analytics-settings]");
  const privacyLink = document.querySelector('[rel="privacy-policy"]');

  function readChoice() {
    try {
      return localStorage.getItem(ANALYTICS_CHOICE_KEY);
    } catch {
      return null;
    }
  }

  function saveChoice(choice) {
    try {
      localStorage.setItem(ANALYTICS_CHOICE_KEY, choice);
    } catch {
      // 保存できないブラウザーでは、次のページで再度選択してもらう。
    }
  }

  function startAnalytics() {
    if (location.hostname !== ANALYTICS_HOST || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.append(script);
  }

  function showChoice() {
    if (document.querySelector(".analytics-choice")) return;

    const panel = document.createElement("aside");
    panel.className = "analytics-choice";
    panel.setAttribute("aria-label", "アクセス解析の設定");
    panel.innerHTML = `
      <p>このサイトは、許可をいただいた場合だけGoogle アナリティクスで閲覧状況を計測します。利用しなくても記事を読めます。<a href="${privacyLink.href}">詳しく見る</a></p>
      <div class="analytics-choice-actions">
        <button type="button" data-analytics-choice="granted">計測を許可する</button>
        <button type="button" data-analytics-choice="denied">利用しない</button>
      </div>`;

    panel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-analytics-choice]");
      if (!button) return;
      const choice = button.dataset.analyticsChoice;
      saveChoice(choice);
      panel.remove();
      if (choice === "granted") {
        startAnalytics();
      } else if (window.gtag) {
        window.gtag("consent", "update", { analytics_storage: "denied" });
        location.reload();
      }
    });

    document.body.append(panel);
  }

  settingsButton.hidden = false;
  settingsButton.addEventListener("click", showChoice);

  if (readChoice() === "granted") startAnalytics();
  if (!readChoice()) showChoice();
}
