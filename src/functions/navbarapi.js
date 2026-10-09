"use client";

import { useEffect, useState } from "react";

export function useCategories() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const apis = [
        `${process.env.NEXT_PUBLIC_API1_BASE_URL}/categories`,
        `${process.env.NEXT_PUBLIC_API2_BASE_URL}/categories`,
      ];

      try {
        for (const api of apis) {
          try {
            const res = await fetch(api);

            if (!res.ok) continue;

            const result = await res.json();
            setData(result);
            return;
          } catch {
            continue;
          }
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { data, loading };
}