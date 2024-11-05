"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { applyGtagConsent } from "../../lib/ga";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

export default function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
  });
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const savedConsent = Cookies.get("consent");
    if (savedConsent) {
      setIsBannerVisible(false);
    }
  }, []);

  const handleCheckboxChange = (type: keyof ConsentState) => {
    if (type !== "necessary") {
      setConsent((prev) => ({ ...prev, [type]: !prev[type] }));
    }
  };

  const acceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    saveConsent(fullConsent);
  };

  const acceptSelection = () => {
    saveConsent(consent);
  };

  const rejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    };
    saveConsent(minimalConsent);
  };

  const saveConsent = (newConsent: ConsentState) => {
    Cookies.set("consent", JSON.stringify(newConsent), {
      expires: 365,
      path: "/",
    });
    applyGtagConsent();
    setIsBannerVisible(false);
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
              checked={consent.necessary}
              disabled
              className='mr-2 cursor-not-allowed'
            />
            <label className='text-xs'>Necessary</label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={consent.analytics}
              onChange={() => handleCheckboxChange("analytics")}
              className='mr-2'
            />
            <label className='text-xs'>Analytics</label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={consent.preferences}
              onChange={() => handleCheckboxChange("preferences")}
              className='mr-2'
            />
            <label className='text-xs'>Preferences</label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={consent.marketing}
              onChange={() => handleCheckboxChange("marketing")}
              className='mr-2'
            />
            <label className='text-xs'>Marketing</label>
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
