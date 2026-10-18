(() => {
  const GA_MEASUREMENT_ID = "G-YKS8E5Y9JT";
  const ANALYTICS_HOST = "minimalifehack.com";

  if (
    location.hostname === ANALYTICS_HOST &&
    /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID) &&
    !window.gtag
  ) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.append(script);
  }
})();
