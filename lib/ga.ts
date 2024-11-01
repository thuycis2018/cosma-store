import ReactGA from "react-ga4";

export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

export const logPageView = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const logEvent = (action: string, category: string, params?: object) => {
  ReactGA.event({ action, category, ...params });
};
