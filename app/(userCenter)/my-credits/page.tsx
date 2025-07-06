"use client";

import { useState, useEffect } from "react";

const MyCreditsPage = () => {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch("/api/credits");

        if (!response.ok) {
          throw new Error("Failed to fetch credits");
        }

        const data = await response.json();
        setCredits(data.credits);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch credits"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Credits</h1>
      <div className="rounded-lg p-6">
        <div className="bg-white p-6 rounded-lg border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Available Credits:
          </h2>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-md w-24"></div>
            </div>
          ) : error ? (
            <div className="text-3xl font-bold text-red-600">
              Error: {error}
            </div>
          ) : (
            <div className="text-3xl font-bold text-blue-600">{credits}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCreditsPage;
