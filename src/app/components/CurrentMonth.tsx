"use client";

import { useEffect, useState } from "react";

const FALLBACK_MONTH = "Mai";

export default function CurrentMonth() {
  const [month, setMonth] = useState(FALLBACK_MONTH);

  useEffect(() => {
    const raw = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(new Date());
    setMonth(raw.charAt(0).toUpperCase() + raw.slice(1));
  }, []);

  return <>{month}</>;
}
