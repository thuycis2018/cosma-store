"use client";
import { useState, useEffect } from "react";
interface ConsentState {
  ad_storage: string;
  ad_user_data: string;
  ad_personalization: string;
  analytics_storage: string;
  personalization_storage: string;
  functionality_storage: string;
  security_storage: string;
}

export default function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>({
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    personalization_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  const [checkboxState, setCheckboxState] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem("consentMode");
    if (savedConsent) {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      setCheckboxState({
        necessary:
          parsedConsent.functionality_storage === "granted" &&
          parsedConsent.security_storage === "granted",
        analytics: parsedConsent.analytics_storage === "granted",
        marketing:
          parsedConsent.ad_storage === "granted" ||
          parsedConsent.ad_user_data === "granted" ||
          parsedConsent.ad_personalization === "granted",
        preferences: parsedConsent.personalization_storage === "granted",
      });
      setIsBannerVisible(false);
    }
  }, []);

  const handleCheckboxChange = (type: keyof typeof checkboxState) => {
    setCheckboxState((prev) => {
      const updatedCheckboxState = { ...prev, [type]: !prev[type] };

      // Map checkbox states to consent types
      const newConsent: ConsentState = {
        ad_storage: updatedCheckboxState.marketing ? "granted" : "denied",
        ad_user_data: updatedCheckboxState.marketing ? "granted" : "denied",
        ad_personalization: updatedCheckboxState.marketing
          ? "granted"
          : "denied",
        analytics_storage: updatedCheckboxState.analytics
          ? "granted"
          : "denied",
        personalization_storage: updatedCheckboxState.preferences
          ? "granted"
          : "denied",
        functionality_storage: updatedCheckboxState.necessary
          ? "granted"
          : "denied",
        security_storage: updatedCheckboxState.necessary ? "granted" : "denied",
      };

      setConsent(newConsent);
      return updatedCheckboxState;
    });
  };

  const acceptAll = () => {
    const fullConsent: ConsentState = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      personalization_storage: "granted",
      functionality_storage: "granted",
      security_storage: "granted",
    };
    saveConsent(fullConsent);
  };

  const acceptSelection = () => {
    saveConsent(consent);
  };

  const rejectAll = () => {
    const minimalConsent: ConsentState = {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      personalization_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    };
    saveConsent(minimalConsent);
  };

  const saveConsent = (newConsent: ConsentState) => {
    localStorage.setItem("consentMode", JSON.stringify(newConsent));
    applyGtagConsent(newConsent);
    setIsBannerVisible(false);
  };

  const applyGtagConsent = (newConsent: ConsentState) => {
    window.gtag("consent", "update", newConsent);
  };

  return (
    isBannerVisible && (
      <div className='fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 text-center z-50'>
        <p className='mb-2 text-xs'>
          We value your privacy. Select your cookie settings:
        </p>
        <form className='flex flex-wrap justify-center gap-2 mb-2'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={checkboxState.necessary}
              onChange={() => handleCheckboxChange("necessary")}
              className='mr-2'
              aria-labelledby='necessary'
            />
            <label id='necessary' className='text-xs'>
              Necessary
            </label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={checkboxState.analytics}
              onChange={() => handleCheckboxChange("analytics")}
              className='mr-2'
              aria-labelledby='analytics'
            />
            <label id='analytics' className='text-xs'>
              Analytics
            </label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={checkboxState.marketing}
              onChange={() => handleCheckboxChange("marketing")}
              className='mr-2'
              aria-labelledby='marketing'
            />
            <label id='marketing' className='text-xs'>
              Marketing
            </label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={checkboxState.preferences}
              onChange={() => handleCheckboxChange("preferences")}
              className='mr-2'
              aria-labelledby='preferences'
            />
            <label id='preferences' className='text-xs'>
              Preferences
            </label>
          </div>
        </form>
        <div className='flex justify-center gap-2 text-xs'>
          <button
            type='button'
            onClick={acceptAll}
            className='bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded'
          >
            Accept All
          </button>
          <button
            type='button'
            onClick={acceptSelection}
            className='bg-slate-600 hover:bg-slate-700 text-white py-1 px-2 rounded'
          >
            Accept Selection
          </button>
          <button
            type='button'
            onClick={rejectAll}
            className='bg-slate-600 hover:bg-slate-700 text-white py-1 px-1 rounded'
          >
            Reject All
          </button>
        </div>
      </div>
    )
  );
}
