interface RiskCardProps {
  severity: 'dangerous' | 'moderate' | 'safe';
  title: string;
  description: string;
}

function RiskCard({
  severity,
  title,
  description,
}: RiskCardProps) {
  const styles = {
    dangerous: {
      container: 'border-red-500/30 bg-red-500/10',
      title: 'text-red-400',
      icon: '🔴',
    },
    moderate: {
      container: 'border-yellow-500/30 bg-yellow-500/10',
      title: 'text-yellow-400',
      icon: '🟡',
    },
    safe: {
      container: 'border-green-500/30 bg-green-500/10',
      title: 'text-green-400',
      icon: '🟢',
    },
  };

  const style = styles[severity];

  return (
    <div
      className={`rounded-xl border p-4 ${style.container}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-sm">{style.icon}</span>

        <div>
          <h3 className={`text-sm font-semibold ${style.title}`}>
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RiskCard;