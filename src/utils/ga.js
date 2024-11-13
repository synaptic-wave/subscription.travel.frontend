import ReactGA from "react-ga";
const TRACKING_ID = "G-PPRY96JTGJ" || import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const gTagGRequestEvents = (serviceApi) => {
  ReactGA.event({
    category: "API",
    action: serviceApi,
    label: "Request to Google Services",
    value: window.location.pathname
  });
};
