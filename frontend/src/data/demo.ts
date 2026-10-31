import type { Alert, CaseRecord, Transaction } from '../types'

/**
 * Demonstration fixtures only. These are fictional records and are not the
 * result of running any financial analysis or fraud-detection algorithm.
 */
export const demoTransactions: Transaction[] = [
  { id: 'TX-20981', date: '2026-10-28', supplier: 'Marlow Industrial', reference: 'PAY-88041', invoiceReference: 'MI-1042', amountCents: 850000, currency: 'ZAR', type: 'Payment', status: 'Flagged' },
  { id: 'TX-20980', date: '2026-10-28', supplier: 'Marlow Industrial', reference: 'PAY-88039', invoiceReference: 'MI-1042', amountCents: 850000, currency: 'ZAR', type: 'Payment', status: 'Flagged' },
  { id: 'TX-20979', date: '2026-10-27', supplier: 'Northstar Office', reference: 'PAY-88012', invoiceReference: 'NO-7718', amountCents: 1249500, currency: 'ZAR', type: 'Payment', status: 'Matched' },
  { id: 'TX-20978', date: '2026-10-27', supplier: 'Cape Meridian Supplies', reference: 'INV-44311', invoiceReference: 'CMS-44311', amountCents: 438000, currency: 'ZAR', type: 'Invoice', status: 'Pending' },
  { id: 'TX-20977', date: '2026-10-26', supplier: 'Marlow Industrial', reference: 'INV-1042', invoiceReference: 'MI-1042', amountCents: 850000, currency: 'ZAR', type: 'Invoice', status: 'Flagged' },
  { id: 'TX-20976', date: '2026-10-26', supplier: 'Bluepeak Logistics', reference: 'PAY-87990', invoiceReference: 'BL-9031', amountCents: 2365000, currency: 'ZAR', type: 'Payment', status: 'Matched' },
  { id: 'TX-20975', date: '2026-10-25', supplier: 'Northstar Office', reference: 'INV-7718', invoiceReference: 'NO-7718', amountCents: 1249500, currency: 'ZAR', type: 'Invoice', status: 'Matched' },
  { id: 'TX-20974', date: '2026-10-24', supplier: 'Veridian Facilities', reference: 'PAY-87921', invoiceReference: 'VF-3002', amountCents: 745000, currency: 'ZAR', type: 'Payment', status: 'Pending' },
  { id: 'TX-20973', date: '2026-10-23', supplier: 'Cape Meridian Supplies', reference: 'INV-44310', invoiceReference: 'CMS-44310', amountCents: 438000, currency: 'ZAR', type: 'Invoice', status: 'Pending' },
]

export const demoAlerts: Alert[] = [
  {
    id: 'ALT-0058',
    rule: 'DUPLICATE_PAYMENT_CANDIDATE',
    title: 'Potential duplicate payment',
    supplier: 'Marlow Industrial',
    reference: 'MI-1042',
    amountCents: 850000,
    severity: 'high',
    status: 'unreviewed',
    detectedAt: '28 Oct 2026',
    explanation: 'Two payment entries share the same supplier, invoice reference and amount. Confirm whether one is a reversal, correction or legitimate second settlement.',
    matchedFields: ['Supplier identity', 'Invoice reference', 'Amount'],
  },
  {
    id: 'ALT-0057',
    rule: 'REPEATED_INVOICE_REFERENCE',
    title: 'Repeated invoice reference',
    supplier: 'Cape Meridian Supplies',
    reference: 'CMS-44310',
    amountCents: 438000,
    severity: 'medium',
    status: 'under-review',
    detectedAt: '27 Oct 2026',
    explanation: 'The supplier and invoice reference appear in more than one imported invoice row. Check source documents and import history for corrections or repeated imports.',
    matchedFields: ['Supplier identity', 'Invoice reference'],
  },
  {
    id: 'ALT-0056',
    rule: 'AMOUNT_PATTERN_REVIEW',
    title: 'Similar-value payment pattern',
    supplier: 'Northstar Office',
    reference: 'NO-7718',
    amountCents: 1249500,
    severity: 'low',
    status: 'cleared',
    detectedAt: '24 Oct 2026',
    explanation: 'The sample rule detected closely matching values within the configured review window. This example was cleared after a fictional reviewer note.',
    matchedFields: ['Amount similarity', 'Date proximity'],
  },
]

export const demoCases: CaseRecord[] = [
  { id: 'FT-2026-014', title: 'October supplier payment review', period: '01–31 Oct 2026', owner: 'Finance Review', opened: '21 Oct 2026', alertCount: 8, status: 'In review' },
  { id: 'FT-2026-013', title: 'Quarterly accounts payable check', period: '01 Jul–30 Sep 2026', owner: 'Internal Audit', opened: '03 Oct 2026', alertCount: 14, status: 'Open' },
  { id: 'FT-2026-012', title: 'Supplier master-data review', period: '01–30 Sep 2026', owner: 'Finance Review', opened: '02 Sep 2026', alertCount: 3, status: 'Closed' },
]
