# FINTRACE

**Financial Investigation & Transaction Analysis**

FINTRACE is a local-first financial review and investigation application designed to help small finance teams, internal auditors and investigators examine supplier invoices and payment records for potential irregularities.

The first release focuses on a narrow, practical task: import financial CSV exports, standardise the records, surface explainable review flags, and document the human investigation that follows.

> **Important:** FINTRACE is an analytical support tool, not an automated fraud verdict system. A duplicate, unusual amount or threshold pattern is an investigative lead. It is not proof of fraud or misconduct.

## Project status

| Area | Status |
| --- | --- |
| Project brief | Defined |
| Vue 3 + TypeScript frontend foundation | In progress |
| C++20 backend | Structure only; files intentionally empty |
| Database | Planned; not implemented |
| Detection rules | Planned; not implemented |
| Financial data | Demonstration records only in the frontend |

This repository starts with a frontend shell and an empty backend layout. Dashboard figures and transaction records shown in the UI are illustrative fixtures and must not be mistaken for analysis of real company data.

---

## 1. The problem FINTRACE addresses

Organisations process invoices and supplier payments through accounting and bookkeeping systems. Reviewing exports manually can make it difficult to notice patterns such as:

- the same invoice reference appearing more than once;
- a single invoice appearing to have multiple matching payments;
- inconsistent supplier or invoice references;
- closely timed transactions with similar values;
- payments that appear to have been split around a configured approval limit; or
- differences between invoice totals and payment records.

These patterns can have legitimate explanations, including credit notes, reversals, corrections, partial payments, timing differences, shared supplier accounts or poor data quality.

FINTRACE is intended to help a reviewer find, explain and document potential exceptions. It does not replace an accounting system, audit procedure, investigator judgement or source-document verification.

## 2. Intended users

### Primary users

- **Finance staff at small and medium-sized businesses** reviewing accounts-payable exports before or after payment runs.
- **Internal auditors** examining expenditure, supplier records and payment controls.
- **Fraud and forensic investigators** reviewing financial records as part of an authorised investigation.

### Initial usage scenario

A finance employee exports supplier invoice and payment records from an existing system, imports the CSV files into a FINTRACE case, reviews the data validation summary, runs a small set of transparent detection rules, and documents the disposition of each alert.

FINTRACE is not intended to initiate, approve, block or execute payments.

## 3. First release: achievable MVP

The first useful release should do a small number of things reliably.

### Included in the MVP

1. Create and manage a local investigation/review case.
2. Import invoice and payment CSV files.
3. Map and validate imported columns.
4. Normalise records for matching while preserving original imported values.
5. Identify repeated invoice references for the same supplier.
6. Identify potentially duplicate payments against the same invoice.
7. Show why each alert was raised and link it to the supporting records.
8. Allow a reviewer to add notes and set a review status.
9. Export a review summary and flagged records to CSV.

### Explicitly out of scope for the MVP

- machine-learning or AI fraud predictions;
- automatic claims that a person or supplier committed fraud;
- direct bank connections or payment execution;
- integrations with accounting platforms;
- real-time transaction monitoring;
- multi-tenant cloud services or team collaboration;
- automated approval or payment blocking;
- complex network analysis or advanced split-payment detection.

Split-payment analysis may be added after the data model, business context and threshold rules are well understood. A simple threshold heuristic can generate false positives if it ignores purchase orders, approval policies, tax, credit notes and payment schedules.

## 4. Core workflows

### A. Create a review case

A reviewer creates a case with a reference, title, period under review, currency and short description.

### B. Import source data

The reviewer imports invoice and payment CSV exports. FINTRACE validates the file structure, provides a preview and reports rejected or incomplete rows before data is accepted.

Initial standard fields:

**Invoice records**
- supplier identifier and supplier name;
- invoice number;
- invoice date;
- invoice amount;
- currency;
- purchase-order reference (optional);
- source row identifier.

**Payment records**
- payment reference;
- supplier identifier and supplier name;
- invoice reference (where available);
- payment date;
- payment amount;
- currency;
- bank or ledger reference (optional);
- source row identifier.

The application must preserve original source values. Normalised values should be stored separately and used only for comparison.

### C. Run explainable review rules

Initial candidate rules:

**Rule 1 — Repeated supplier invoice reference**

Finds invoice records with the same normalised supplier identity and invoice reference. A match is flagged for review; it may represent a legitimate correction or duplicate import.

**Rule 2 — Potential duplicate payment**

Finds two or more payment records that appear to settle the same invoice, based on available supplier, invoice reference, amount and payment information. Partial payments, reversals and split settlements must be handled explicitly before treating matches as meaningful.

Each alert must include:
- a stable rule identifier and rule version;
- the exact reason for the alert;
- references to all supporting source records;
- the fields that matched;
- the analysis run and timestamp;
- a clear statement that human review is required.

### D. Review and document

Reviewers can set an alert to:
- Unreviewed
- Under review
- Cleared / explained
- Escalated

A review record should include the reviewer identity (when user accounts exist), timestamp, decision and notes. Existing review events should not be silently overwritten.

### E. Export

The MVP exports a case summary, validation results and alert register to CSV. A later version can add a formatted PDF report.

---

## 5. Technology

### Frontend

- **Vue 3** — component-driven user interface.
- **TypeScript** — typed application contracts and safer UI logic.
- **Vite** — development server and production build tooling.
- **Vue Router** — single-page application navigation.
- **Lucide Vue** — interface icons.
- **CSS** — responsive, dark financial-investigation interface.

The Vue frontend must depend on typed service interfaces, not directly on backend implementation details. Its current demo data is local and labelled as illustrative.

The official Vue documentation recommends the Vite-powered project setup and TypeScript support. See [Vue Quick Start](https://vuejs.org/guide/quick-start.html) and [Vue TypeScript Guide](https://vuejs.org/guide/typescript/overview).

### Backend (planned)

- **C++20** — CSV processing, validation, normalisation, matching and explainable detection rules.
- **CMake** — native build configuration.
- **SQLite** — local relational storage.
- **cpp-httplib** — a lightweight HTTP server option for the local REST API.
- **nlohmann/json** — JSON serialization.
- **GoogleTest** — C++ unit tests.

The C++ backend files are intentionally empty in this foundation commit. No API, CSV parser, detection algorithm or database layer has been implemented.

### Local-first architecture

The initial application is intended to run on one workstation:

```text
┌──────────────────────────────────────────────┐
│              Vue 3 + TypeScript              │
│ Dashboard · Imports · Transactions · Alerts  │
│ Cases · Review notes · Export                │
└──────────────────────┬───────────────────────┘
                       │ HTTP / JSON (localhost)
┌──────────────────────▼───────────────────────┐
│                   C++20                      │
│ CSV import · Validation · Normalisation     │
│ Matching · Detection rules · REST API        │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│                   SQLite                     │
│ Cases · Source files · Invoices · Payments   │
│ Alerts · Review events · Import records      │
└──────────────────────────────────────────────┘
```

The API should bind to localhost by default. It must not expose financial information to a public network in the initial version.

---

## 6. High-level repository structure

```text
Fraud-WAR/
├── README.md
├── .gitignore
├── .editorconfig
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── data/
│       ├── router/
│       ├── services/
│       ├── types/
│       ├── views/
│       ├── App.vue
│       └── main.ts
│
├── backend/
│   ├── CMakeLists.txt
│   ├── include/fintrace/
│   │   ├── models/
│   │   ├── import/
│   │   ├── analysis/
│   │   ├── database/
│   │   └── api/
│   ├── src/
│   │   ├── models/
│   │   ├── import/
│   │   ├── analysis/
│   │   ├── database/
│   │   ├── api/
│   │   └── main.cpp
│   └── tests/
│
├── sample-data/
│
└── docs/
```

The backend directory contains empty source and header placeholders only. The frontend is a UI foundation using demonstration data.

## 7. Planned data model

The first database design is expected to include:

| Entity | Purpose |
| --- | --- |
| cases | Review case metadata and scope |
| imports | Source filename, file hash, import date and validation summary |
| suppliers | Supplier identifiers and names |
| invoices | Original and normalised invoice data |
| payments | Original and normalised payment data |
| alerts | Rule-generated review flags and supporting record references |
| review_events | Append-only history of reviewer decisions and notes |
| analysis_runs | Rule set/version, execution time and run configuration |

### Financial accuracy

Money must not be stored as binary floating-point values. Store amounts as integer minor units (for example, cents) together with an ISO currency code. Do not compare amounts across different currencies without an explicit, documented conversion method.

Date parsing, time zones, decimal separators, negative values, credit notes and rounding rules must be explicit and tested.

## 8. Detection quality and explainability

FINTRACE should favour transparent rules over opaque scores in the MVP.

For every alert:
- show the specific rule and version;
- show the records and fields that matched;
- distinguish exact matches from fuzzy/similarity matches;
- expose missing or uncertain data;
- allow an authorised reviewer to clear or escalate the alert;
- retain the reason for the review decision.

A risk score, if introduced later, should be a prioritisation aid with documented factors and should never be represented as a probability of fraud unless it has been properly calibrated and validated for that use.

## 9. Privacy, security and evidentiary safeguards

Financial records can contain confidential business and personal information. The application should be developed with the following safeguards in mind:

- use synthetic data during development;
- obtain permission before processing any real organisation's records;
- minimise data collected and retained;
- keep the first deployment local and restrict the API to localhost;
- validate uploaded file size, encoding, structure and values;
- do not execute macros or embedded content from imported documents;
- parameterise all SQL statements;
- keep source files separate from normalised database records;
- calculate and record a cryptographic hash of each imported source file when the import feature is implemented;
- record analysis-rule version and import provenance;
- avoid storing bank account numbers or personal identifiers unless strictly necessary;
- add authentication, access controls, encryption and retention controls before any multi-user or production deployment.

FINTRACE does not currently provide a certified audit trail, legal chain of custody or forensic acquisition process. Its review history will need access controls and tamper-evident design before it can support formal investigative workflows.

---

## 10. Development roadmap

### Phase 0 — Foundation

- [x] Define the project problem, users and MVP boundary.
- [x] Create the Vue 3 + TypeScript frontend scaffold.
- [x] Create the initial application navigation and visual system.
- [x] Add empty C++ backend folders, headers, source files and CMake placeholder.
- [ ] Verify frontend dependency installation, type-check and production build.

### Phase 1 — Data model and sample data

- [ ] Define invoice, payment, supplier, case and alert types.
- [ ] Agree CSV schemas and field mapping rules.
- [ ] Build synthetic invoice and payment datasets with known edge cases.
- [ ] Create database schema and migration approach.

### Phase 2 — Import and validation

- [ ] Implement CSV reading and parsing in C++.
- [ ] Validate required fields and report row-level errors.
- [ ] Preserve original values and store comparison-friendly normalised values separately.
- [ ] Persist accepted records in SQLite.

### Phase 3 — Detection engine

- [ ] Implement repeated invoice-reference detection.
- [ ] Implement potential duplicate payment matching.
- [ ] Add unit tests for legitimate edge cases and false positives.
- [ ] Return structured alerts with explainable supporting records.

### Phase 4 — Investigation workflow

- [ ] Connect Vue to the local C++ REST API.
- [ ] Add alert review statuses and notes.
- [ ] Keep a timestamped review-event history.
- [ ] Add case-level transaction and alert filters.

### Phase 5 — Reporting and hardening

- [ ] Export alert registers and case summaries.
- [ ] Test larger datasets and profile performance.
- [ ] Review input validation, API security and data-retention behaviour.
- [ ] Document limitations and prepare a reproducible demo.

---

## 11. Running the frontend

Requirements:
- Node.js compatible with the installed Vite release.
- npm.
- Git.

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Type-check and build:

```bash
npm run type-check
npm run build
```

The backend is not executable yet. It is intentionally an empty C++ project layout.

## 12. Definition of success

The first meaningful FINTRACE release will be considered successful when a reviewer can:

1. create a case;
2. import invoice and payment CSV files;
3. understand which rows were accepted or rejected;
4. run deterministic duplicate-detection rules;
5. inspect the exact records and fields behind each alert;
6. document a review decision; and
7. export the findings.

All detection outcomes must be reproducible from the same source records, rule version and configuration.

---

**FINTRACE is an educational software engineering project focused on practical financial data review. It is designed to support careful human investigation, not replace it.**
