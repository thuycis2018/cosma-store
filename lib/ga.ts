import ReactGA from "react-ga4";
import Cookies from "js-cookie";

// use for server-side

export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

export const logPageView = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const logEvent = (action: string, category: string, params?: object) => {
  ReactGA.event({ action, category, ...params });
};

// use for client-sde

export function applyGtagConsent() {
  const consentCookie = Cookies.get("consent");
  if (consentCookie) {
    const consentPreferences = JSON.parse(consentCookie);

    window.gtag("consent", "update", {
      ad_storage: consentPreferences.marketing ? "granted" : "denied",
      ad_user_data: consentPreferences.marketing ? "granted" : "denied",
      ad_personalization: consentPreferences.marketing ? "granted" : "denied",
      analytics_storage: consentPreferences.analytics ? "granted" : "denied",
      personalization_storage: consentPreferences.preferences
        ? "granted"
        : "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  }
}
