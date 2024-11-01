"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initGA, logPageView } from "../../lib/ga";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

const ClientAnalytics: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    initGA(GA_MEASUREMENT_ID);
    logPageView(pathname);
  }, [pathname]);

  return null;
};

export default ClientAnalytics;
