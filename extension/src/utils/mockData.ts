import type { AnalysisResult } from '../types';

export const mockAnalysis: AnalysisResult = {
  score: 72,
  riskLevel: 'moderate',

  clauses: [
    {
      id: 'clause-1',
      title: 'Automatic Renewal',
      description:
        'This agreement may automatically renew unless you cancel within the required period.',
      severity: 'dangerous',
      sentence:
        'Your subscription will automatically renew at the end of each billing period.',
    },
    {
      id: 'clause-2',
      title: 'Arbitration Clause',
      description:
        'Disputes may need to be resolved through arbitration instead of court.',
      severity: 'moderate',
      sentence:
        'Any dispute arising from this agreement shall be resolved through binding arbitration.',
    },
    {
      id: 'clause-3',
      title: 'Data Sharing',
      description:
        'Your information may be shared with selected third-party partners.',
      severity: 'moderate',
      sentence:
        'We may share your personal information with trusted third-party partners.',
    },
  ],

  summary: [
    'The agreement contains an automatic renewal clause.',
    'Some disputes may require arbitration.',
    'Your information may be shared with third parties.',
  ],

  scannedAt: 'Just now',
};