interface ScanStatusProps {
  status: 'scanning' | 'complete' | 'error';
}

function ScanStatus({ status }: ScanStatusProps) {
  const statusData = {
    scanning: {
      text: 'Analyzing page...',
      icon: '⏳',
    },
    complete: {
      text: 'Analysis complete',
      icon: '✓',
    },
    error: {
      text: 'Analysis failed',
      icon: '!',
    },
  };

  const current = statusData[status];

  return (
    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
      <span>{current.icon}</span>
      <span>{current.text}</span>
    </div>
  );
}

export default ScanStatus;