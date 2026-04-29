import type { PortalSubject } from "./types";

export const portalSubjects: PortalSubject[] = [
  {
    id: "auditing",
    title: "Auditing Theory",
    instructor: "Atty. Miguel Reyes",
    accent: "bg-emerald-700",
    thumbnail: {
      label: "Audit Readiness",
      summary: "Evidence, controls, and documentation drills",
      tone: "from-emerald-950 via-emerald-800 to-teal-600",
    },
    progress: 38,
    lessons: [
      { title: "Nature and Scope of Auditing", duration: "28:10", progress: 100 },
      { title: "Audit Objectives", duration: "24:05", progress: 100 },
      {
        title: "Audit Process and Documentation",
        duration: "28:30",
        progress: 38,
      },
      { title: "Audit Evidence", duration: "31:45", progress: 0 },
      { title: "Audit Working Papers", duration: "26:20", progress: 0 },
      { title: "Internal Control", duration: "34:00", progress: 0 },
    ],
    materials: [
      {
        coverSubtitle: "Core concepts and reviewer outline",
        coverTone: "from-emerald-950 via-emerald-800 to-teal-600",
        pages: [
          {
            heading: "Purpose of an Audit",
            points: [
              "Auditing provides reasonable assurance that financial statements are free from material misstatement.",
              "The auditor gathers sufficient and appropriate evidence before forming an opinion.",
              "Professional skepticism is applied from planning through reporting.",
            ],
          },
          {
            heading: "Exam Focus",
            points: [
              "Know the difference between reasonable assurance and absolute assurance.",
              "Review assertions for classes of transactions, account balances, and disclosures.",
              "Connect audit procedures to the risks identified during planning.",
            ],
          },
          {
            heading: "Quick Recall",
            points: [
              "Risk assessment drives the nature, timing, and extent of audit procedures.",
              "Audit documentation should support the work performed and the conclusions reached.",
              "Quality control applies at the firm level and engagement level.",
            ],
          },
        ],
        type: "PDF",
        title: "Auditing Theory Summary Notes",
        updated: "Apr 20, 2026",
      },
      {
        coverSubtitle: "Practice drills for evidence evaluation",
        coverTone: "from-teal-950 via-cyan-800 to-emerald-500",
        pages: [
          {
            heading: "Evidence Quality",
            points: [
              "Reliability increases when evidence comes from independent external sources.",
              "Original documents are generally more reliable than photocopies or scanned copies.",
              "Evidence obtained directly by the auditor is stronger than evidence obtained indirectly.",
            ],
          },
          {
            heading: "Procedure Matching",
            points: [
              "Inspection supports existence and rights when documents are examined carefully.",
              "Confirmation is useful for receivables, bank balances, and legal claims.",
              "Recalculation tests mathematical accuracy in schedules and supporting records.",
            ],
          },
          {
            heading: "Drill Reminder",
            points: [
              "Tie every procedure to a specific assertion.",
              "Consider whether evidence is sufficient in quantity and appropriate in quality.",
              "Document exceptions, follow-up work, and final resolution.",
            ],
          },
        ],
        type: "PDF",
        title: "Audit Evidence Drill Set",
        updated: "Apr 18, 2026",
      },
      {
        coverSubtitle: "Lecture deck for control testing",
        coverTone: "from-slate-950 via-emerald-900 to-emerald-600",
        pages: [
          {
            heading: "Control Environment",
            points: [
              "Management integrity and governance oversight shape the strength of internal control.",
              "Segregation of duties reduces opportunities for error or fraud.",
              "Clear authority levels help prevent unauthorized transactions.",
            ],
          },
          {
            heading: "Testing Controls",
            points: [
              "Inquiry alone is not enough to test operating effectiveness.",
              "Observation, inspection, and reperformance provide stronger support.",
              "Testing covers both design effectiveness and operating effectiveness.",
            ],
          },
          {
            heading: "Control Deficiencies",
            points: [
              "A deficiency exists when a control is missing or does not operate as intended.",
              "Significant deficiencies are communicated to those charged with governance.",
              "Material weaknesses require elevated attention during the audit response.",
            ],
          },
        ],
        type: "PPT",
        title: "Internal Control Lecture Slides",
        updated: "Apr 15, 2026",
      },
    ],
  },
  {
    id: "taxation",
    title: "Taxation",
    instructor: "Prof. Elena Mercado",
    accent: "bg-amber-600",
    thumbnail: {
      label: "Tax Mastery",
      summary: "Income tax, VAT, deductions, and computation practice",
      tone: "from-amber-900 via-orange-700 to-yellow-500",
    },
    progress: 22,
    lessons: [
      { title: "Income Tax Fundamentals", duration: "35:10", progress: 100 },
      { title: "Gross Income Inclusions", duration: "29:45", progress: 22 },
      { title: "Allowable Deductions", duration: "32:05", progress: 0 },
      { title: "VAT and Percentage Tax", duration: "37:30", progress: 0 },
    ],
    materials: [
      {
        coverSubtitle: "Rates, formulas, and taxable base guide",
        coverTone: "from-amber-900 via-orange-700 to-yellow-500",
        pages: [
          {
            heading: "Income Tax Base",
            points: [
              "Taxable income begins with gross income less allowable deductions and exclusions.",
              "Classification of taxpayer affects applicable rates and reporting requirements.",
              "Timing rules determine when income and deductions are recognized.",
            ],
          },
          {
            heading: "Formula Review",
            points: [
              "Gross income less exclusions gives income subject to tax analysis.",
              "Allowable deductions reduce taxable income when properly substantiated.",
              "Tax due is reduced by creditable withholding taxes and allowable tax credits.",
            ],
          },
          {
            heading: "Board Prep",
            points: [
              "Memorize the flow of computation before memorizing exceptions.",
              "Check whether a problem uses calendar year or fiscal year facts.",
              "Validate whether the question asks for tax due, tax payable, or taxable income.",
            ],
          },
        ],
        type: "PDF",
        title: "Taxation Formula Sheet",
        updated: "Apr 21, 2026",
      },
      {
        coverSubtitle: "Protected computation workbook preview",
        coverTone: "from-yellow-800 via-amber-700 to-emerald-600",
        pages: [
          {
            heading: "Practice Table Rules",
            points: [
              "Start with the taxpayer classification before entering any amount.",
              "Separate ordinary income, passive income, and capital gains.",
              "Apply withholding credits only after computing the tax due.",
            ],
          },
          {
            heading: "Common Mistakes",
            points: [
              "Do not deduct non-deductible personal expenses.",
              "Do not mix final tax items into regular taxable income.",
              "Check if the problem gives gross amount or net of withholding amount.",
            ],
          },
          {
            heading: "Self-Check",
            points: [
              "Recompute the taxable base independently after finishing a problem.",
              "Mark the legal basis beside each special tax treatment.",
              "Compare the final answer with the required output in the question stem.",
            ],
          },
        ],
        type: "XLS",
        title: "Tax Computation Practice Table",
        updated: "Apr 17, 2026",
      },
      {
        coverSubtitle: "Form selection and filing reference",
        coverTone: "from-orange-950 via-amber-800 to-teal-600",
        pages: [
          {
            heading: "Form Selection",
            points: [
              "Use the taxpayer type and transaction type to identify the correct form.",
              "Annual income tax returns differ from quarterly income tax returns.",
              "VAT and percentage tax filings follow separate reporting requirements.",
            ],
          },
          {
            heading: "Filing Controls",
            points: [
              "Confirm the taxable period before preparing the return.",
              "Check schedules and attachments for consistency with the main form.",
              "Review payment references and filing confirmations as part of documentation.",
            ],
          },
          {
            heading: "Exam Pointers",
            points: [
              "Questions often test which filing requirement applies, not the form number alone.",
              "Watch for mixed transactions that require separate tax treatment.",
              "Read filing dates carefully when penalties are included in the problem.",
            ],
          },
        ],
        type: "PDF",
        title: "BIR Forms Quick Reference",
        updated: "Apr 12, 2026",
      },
    ],
  },
  {
    id: "accounting",
    title: "Practical Accounting",
    instructor: "Dr. Rosario Dela Cruz",
    accent: "bg-slate-700",
    thumbnail: {
      label: "Accounting Lab",
      summary: "Standards, statements, and problem solving sets",
      tone: "from-slate-950 via-slate-700 to-emerald-600",
    },
    progress: 64,
    lessons: [
      { title: "Financial Statements Review", duration: "30:15", progress: 100 },
      { title: "Cash and Receivables", duration: "33:30", progress: 100 },
      { title: "Inventories", duration: "39:40", progress: 100 },
      { title: "Property and Equipment", duration: "36:25", progress: 64 },
      { title: "Liabilities", duration: "34:55", progress: 0 },
    ],
    materials: [
      {
        coverSubtitle: "Recognition, measurement, and disclosure guide",
        coverTone: "from-slate-950 via-slate-700 to-emerald-600",
        pages: [
          {
            heading: "Recognition Principles",
            points: [
              "Assets are recognized when future economic benefits are probable and measurable.",
              "Liabilities are recognized when present obligations can be measured reliably.",
              "Income and expenses are recognized based on applicable standards and matching rules.",
            ],
          },
          {
            heading: "Measurement Focus",
            points: [
              "Historical cost, fair value, and amortized cost answer different reporting needs.",
              "Impairment testing protects users from overstated assets.",
              "Disclosure completes recognition and measurement when judgment is significant.",
            ],
          },
          {
            heading: "Study Flow",
            points: [
              "Start each standard with scope and definitions.",
              "Map journal entries to financial statement presentation.",
              "Practice problem variations after reviewing the base rule.",
            ],
          },
        ],
        type: "PDF",
        title: "Accounting Standards Notes",
        updated: "Apr 22, 2026",
      },
      {
        coverSubtitle: "Step-by-step accounting problem set",
        coverTone: "from-emerald-950 via-slate-800 to-cyan-700",
        pages: [
          {
            heading: "Problem Method",
            points: [
              "Identify the account affected before computing the amount.",
              "Separate recognition, measurement, and presentation issues.",
              "Write the journal entry after completing the computation.",
            ],
          },
          {
            heading: "High-Yield Areas",
            points: [
              "Cash and receivables problems often test classification and impairment.",
              "Inventory problems often test cost flow, lower of cost and net realizable value, and cut-off.",
              "Property and equipment problems often test capitalization and depreciation.",
            ],
          },
          {
            heading: "Answer Discipline",
            points: [
              "Label every working paper schedule clearly.",
              "Use signs consistently for additions and deductions.",
              "Return to the question stem before selecting the final answer.",
            ],
          },
        ],
        type: "PDF",
        title: "Problem Solving Workbook",
        updated: "Apr 19, 2026",
      },
      {
        coverSubtitle: "Protected journal entry formats",
        coverTone: "from-zinc-950 via-slate-700 to-emerald-500",
        pages: [
          {
            heading: "Entry Structure",
            points: [
              "Debit entries appear first and credit entries follow with clear indentation.",
              "Narrations should explain the transaction and the basis for recognition.",
              "Compound entries are acceptable when they improve clarity.",
            ],
          },
          {
            heading: "Template Controls",
            points: [
              "Separate adjusting entries from regular transaction entries.",
              "Use account titles that match the chart of accounts used in the problem.",
              "Reconcile entries to ending balances after posting.",
            ],
          },
          {
            heading: "Review Step",
            points: [
              "Confirm that total debits equal total credits.",
              "Check whether the entry affects profit or loss, equity, assets, or liabilities.",
              "Review dates because period-end entries change the required treatment.",
            ],
          },
        ],
        type: "XLS",
        title: "Journal Entry Templates",
        updated: "Apr 11, 2026",
      },
    ],
  },
  {
    id: "rfbt",
    title: "RFBT",
    instructor: "Atty. Miguel Reyes",
    accent: "bg-teal-700",
    thumbnail: {
      label: "Business Law",
      summary: "Obligations, contracts, sales, and corporation code",
      tone: "from-teal-950 via-cyan-800 to-emerald-500",
    },
    progress: 15,
    lessons: [
      { title: "Law on Obligations", duration: "41:20", progress: 100 },
      { title: "Contracts", duration: "38:10", progress: 15 },
      { title: "Sales", duration: "36:40", progress: 0 },
      { title: "Corporation Code", duration: "42:35", progress: 0 },
    ],
    materials: [
      {
        coverSubtitle: "Business law reviewer for recall",
        coverTone: "from-teal-950 via-cyan-800 to-emerald-500",
        pages: [
          {
            heading: "Obligations",
            points: [
              "An obligation is a juridical necessity to give, to do, or not to do.",
              "Sources include law, contracts, quasi-contracts, delicts, and quasi-delicts.",
              "Civil liability may arise when an obligation is breached.",
            ],
          },
          {
            heading: "Contracts",
            points: [
              "Consent, object, and cause are essential requisites of a contract.",
              "Defects in consent can affect validity and enforceability.",
              "Contract interpretation starts with the intent of the parties.",
            ],
          },
          {
            heading: "Commercial Law",
            points: [
              "Corporation law questions often test powers, directors, and shareholder rights.",
              "Negotiable instruments require careful review of requisites and holder status.",
              "Special laws should be studied through elements, exceptions, and remedies.",
            ],
          },
        ],
        type: "PDF",
        title: "RFBT Code Reviewer",
        updated: "Apr 16, 2026",
      },
      {
        coverSubtitle: "Digest format and doctrine tracker",
        coverTone: "from-cyan-950 via-teal-800 to-slate-600",
        pages: [
          {
            heading: "Digest Format",
            points: [
              "State the facts only as needed to understand the legal issue.",
              "Identify the issue in a concise question format.",
              "Write the ruling with the controlling doctrine and practical effect.",
            ],
          },
          {
            heading: "Doctrine Notes",
            points: [
              "Group cases by legal topic to improve recall.",
              "Highlight exceptions because exam questions often turn on them.",
              "Connect each doctrine to a sample fact pattern.",
            ],
          },
          {
            heading: "Recitation Prep",
            points: [
              "Practice stating the issue in one sentence.",
              "Explain why the rule applies to the facts.",
              "Close with the answer before adding supporting details.",
            ],
          },
        ],
        type: "PDF",
        title: "Case Digest Pack",
        updated: "Apr 14, 2026",
      },
      {
        coverSubtitle: "Question prompts for contract law",
        coverTone: "from-emerald-950 via-teal-700 to-cyan-600",
        pages: [
          {
            heading: "Essential Requisites",
            points: [
              "Consent is manifested by offer and acceptance.",
              "The object must be within commerce, possible, and determinate as to kind.",
              "Cause is the essential reason that moves a party to enter the contract.",
            ],
          },
          {
            heading: "Validity Review",
            points: [
              "Void contracts produce no legal effect from the beginning.",
              "Voidable contracts are valid until annulled.",
              "Unenforceable contracts require ratification before enforcement.",
            ],
          },
          {
            heading: "Class Drill",
            points: [
              "Identify the type of defective contract in each fact pattern.",
              "State the remedy available to the affected party.",
              "Explain whether ratification, prescription, or estoppel changes the result.",
            ],
          },
        ],
        type: "PPT",
        title: "Contracts Recitation Slides",
        updated: "Apr 9, 2026",
      },
    ],
  },
];
