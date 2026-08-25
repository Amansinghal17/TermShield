interface RiskScoreProps {
  score: number;
}

function RiskScore({ score }: RiskScoreProps) {
  const getRisk = () => {
    if (score >= 70) {
      return {
        label: 'Dangerous',
        description: 'High-risk clauses detected',
        color: 'text-red-400',
        border: 'border-red-500',
        glow: 'shadow-red-500/20',
      };
    }

    if (score >= 40) {
      return {
        label: 'Moderate Risk',
        description: 'Some clauses need attention',
        color: 'text-yellow-400',
        border: 'border-yellow-400',
        glow: 'shadow-yellow-400/20',
      };
    }

    return {
      label: 'Safe',
      description: 'No major risks detected',
      color: 'text-green-400',
      border: 'border-green-400',
      glow: 'shadow-green-400/20',
    };
  };

  const risk = getRisk();

  return (
    <div className="flex flex-col items-center py-6">
      <div
        className={`flex h-36 w-36 items-center justify-center rounded-full border-[10px] ${risk.border} ${risk.glow} shadow-2xl`}
      >
        <div className="text-center">
          <div className="text-4xl font-bold tracking-tight">
            {score}
          </div>

          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Risk Score
          </div>
        </div>
      </div>

      <h2 className={`mt-4 text-xl font-bold ${risk.color}`}>
        {risk.label}
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        {risk.description}
      </p>
    </div>
  );
}

export default RiskScore;