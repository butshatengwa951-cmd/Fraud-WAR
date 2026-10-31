export type ReviewStatus = 'unreviewed' | 'under-review' | 'cleared' | 'escalated'
export type AlertSeverity = 'high' | 'medium' | 'low'

export interface Transaction {
  id: string
  date: string
  supplier: string
  reference: string
  invoiceReference: string
  amountCents: number
  currency: 'ZAR'
  type: 'Invoice' | 'Payment'
  status: 'Matched' | 'Pending' | 'Flagged'
}

export interface Alert {
  id: string
  rule: string
  title: string
  supplier: string
  reference: string
  amountCents: number
  severity: AlertSeverity
  status: ReviewStatus
  detectedAt: string
  explanation: string
  matchedFields: string[]
}

export interface CaseRecord {
  id: string
  title: string
  period: string
  owner: string
  opened: string
  alertCount: number
  status: 'Open' | 'In review' | 'Closed'
}
