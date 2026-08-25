import Header from '../components/Header';
import RiskScore from '../components/RiskScore';
import RiskCard from '../components/RiskCard';
import ScanStatus from '../components/ScanStatus';
import { useScanStore } from '../store/useScanStore';

function Popup() {
  const {
    result,
    pageInfo,
    isScanning,
    error,
    scanCurrentPage,
  } = useScanStore();

  const handleScan = async () => {
    await scanCurrentPage();
  };

  // Initial state
  if (!result) {
    return (
      <div className="flex min-h-[560px] w-[380px] items-center justify-center bg-[#080b12] p-6 text-white">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isScanning ? 'Reading Page...' : 'Scan This Page'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[560px] w-[380px] bg-[#080b12] text-white">
      <div className="p-5">

        {/* Header */}
        <Header />

        {/* Current Website */}
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Currently Analyzing
          </p>

          <p className="mt-1 truncate text-sm font-medium text-slate-200">
            {pageInfo?.title ?? 'Current webpage'}
          </p>

          <p className="mt-1 truncate text-[11px] text-slate-500">
            {pageInfo?.url ?? 'Ready to scan'}
          </p>

          {pageInfo && (
            <p className="mt-2 text-[10px] text-slate-600">
              {pageInfo.wordCount.toLocaleString()} words detected
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
            <div className="flex gap-2">
              <span className="text-red-400">
                ⚠️
              </span>

              <div>
                <p className="text-xs font-semibold text-red-400">
                  Unable to scan page
                </p>

                <p className="mt-1 text-[11px] leading-4 text-red-300/70">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Risk Score */}
        <RiskScore score={result.score} />

        {/* AI Summary */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              AI Summary
            </h2>

            <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[9px] font-medium text-indigo-400">
              AI
            </span>
          </div>

          <ul className="mt-3 space-y-2">
            {result.summary.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-xs leading-5 text-slate-400"
              >
                <span className="text-indigo-400">
                  •
                </span>

                <span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detected Risks */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Detected Risks
            </h2>

            <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-400">
              {result.clauses.length} found
            </span>
          </div>

          <div className="space-y-3">
            {result.clauses.map((clause) => (
              <RiskCard
                key={clause.id}
                severity={clause.severity}
                title={clause.title}
                description={clause.description}
              />
            ))}
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isScanning ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Reading Page...
            </span>
          ) : (
            'Scan This Page'
          )}
        </button>

        {/* Scan Status */}
        <div className="mt-4">
          <ScanStatus
            status={
              isScanning
                ? 'scanning'
                : error
                  ? 'error'
                  : 'complete'
            }
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-5 text-center text-[10px] leading-4 text-slate-600">
          TermShield provides AI-generated information
          and does not provide legal advice.
        </p>

      </div>
    </div>
  );
}

export default Popup;