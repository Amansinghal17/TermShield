export type RiskLevel = 'safe' | 'moderate' | 'dangerous';

export interface RiskClause {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  sentence?: string;
}

export interface AnalysisResult {
  score: number;
  riskLevel: RiskLevel;
  clauses: RiskClause[];
  summary: string[];
  scannedAt: string;
}

export interface ScanState {
  isScanning: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

export interface AnalysisRequest {
  url: string;
  title: string;
  text: string;
  wordCount: number;
  characterCount: number;
}