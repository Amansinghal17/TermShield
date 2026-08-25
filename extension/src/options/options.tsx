import React from 'react';
import { createRoot } from 'react-dom/client';

import '../index.css';

function Options() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          🛡️ TermShield
        </h1>

        <p className="mt-2 text-slate-400">
          Extension Settings
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold">
              Automatic Scanning
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Automatically detect Terms & Conditions pages.
            </p>

            <label className="mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4"
              />

              <span className="text-sm">
                Enable auto-scan
              </span>
            </label>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold">
              Highlighting
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Highlight risky clauses directly on webpages.
            </p>

            <label className="mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4"
              />

              <span className="text-sm">
                Enable clause highlighting
              </span>
            </label>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold">
              API Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Backend configuration will be added later.
            </p>

            <input
              type="text"
              placeholder="API URL"
              className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);