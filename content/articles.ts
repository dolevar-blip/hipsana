// content/articles.ts
// Central store for all Hipsana articles. No external dependencies.
// To add an article: append an object to the `articles` array.
//   status: "published" = live, indexable, and listed in the sitemap.
//   status: "draft"     = reachable by direct URL but noindex and NOT in the sitemap.

export type InlineRun =
  | string
  | { text: string; href: string } // a link
  | { strong: string }; // bold text

export type Block =
  | { type: "p"; runs: InlineRun[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: InlineRun[][] }
  | { type: "quote"; runs: InlineRun[] };

export type FaqItem = {
  question: string;
  answer: string; // plain text; also used verbatim in the FAQ schema
};

export type Article = {
  slug: string; // URL: /articles/<slug>
  status: "published" | "draft";
  title: string; // <h1> and <title>
  description: string; // meta description and on-page intro
  author: string;
  datePublished: string; // ISO date, e.g. "2026-06-02"
  dateModified: string; // ISO date
  body: Block[];
  faq: FaqItem[];
};

export const articles: Article[] = [
  {
    slug: "infrastructure-check",
    status: "draft",
    title: "Article infrastructure check",
    description:
      "Internal placeholder used to verify the article route, FAQ schema, and dynamic sitemap. Not indexed.",
    author: "Dolev Arama",
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    body: [
      {
        type: "p",
        runs: [
          "This page exists only to confirm the article system renders correctly: server-rendered text, a canonical tag, FAQ structured data, and a dynamic sitemap. It is marked ",
          { strong: "draft" },
          ", so it is set to noindex and kept out of the sitemap.",
        ],
      },
      { type: "h2", text: "What this proves" },
      {
        type: "ul",
        items: [
          [{ strong: "Routing: " }, "the URL /articles/infrastructure-check resolves."],
          [{ strong: "Server rendering: " }, "this text is present in the initial HTML."],
          [{ strong: "Structured data: " }, "the FAQ below emits FAQPage JSON-LD."],
        ],
      },
    ],
    faq: [
      {
        question: "Is this a real article?",
        answer:
          "No. It is an internal placeholder for verifying the article infrastructure and is not indexed by search engines.",
      },
      {
        question: "Where do real articles go?",
        answer:
          "Each real article is added to the articles array in content/articles.ts with status set to published.",
      },
    ],
  },
  {
    slug: "do-dental-practices-need-hipaa-risk-assessment",
    status: "published",
    title: "Do Dental Practices Need a HIPAA Risk Assessment? (2026)",
    description:
      "Yes. The HIPAA Security Rule requires a risk analysis from every dental practice, solo or group. Here's what OCR actually checks, and how to get it done.",
    author: "Dolev Arama",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    body: [
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "Yes. " },
            "A security risk analysis is a required part of the HIPAA Security Rule (45 CFR \u00a7 164.308(a)(1)(ii)(A)) for every covered dental practice, whether you run ten operatories or a single chair.",
          ],
          [
            { strong: "It is the most common gap OCR finds. " },
            "A solo doctor who reported his own vendor's breach paid $100,000 for never having done one.",
          ],
          [
            { strong: "A checklist is not a risk analysis. " },
            "The free government tool is a fine place to start, not an audit-ready program.",
          ],
          [
            { strong: "Do it at least once a year, " },
            "and again after anything material changes: new software, a new location, a data breach.",
          ],
          [
            { strong: "The 2026 overhaul is still proposed, not final. " },
            "It would tighten the requirements, so build now with it in mind.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "And \"your practice\" includes the solo office with one dentist and a front-desk coordinator. The risk analysis isn't a suggestion or an industry best practice; it is written into the rule as a requirement, and it is the first thing federal investigators ask to see.",
        ],
      },
      {
        type: "p",
        runs: [
          "In a hurry? The free HIPAA Risk Scorecard shows you where your own practice stands in about three minutes: ",
          { text: "Check my practice \u2192", href: "/scorecard" },
          ". If you'd rather understand the why first, read on.",
        ],
      },
      { type: "p", runs: ["Here is how that plays out in real life."] },
      {
        type: "p",
        runs: [
          "In 2020, the HHS Office for Civil Rights (OCR) announced its first HIPAA settlement of the year. The target was a solo gastroenterologist in Ogden, Utah, seeing about 3,000 patients a year. He had done something most owners would call responsible: he filed a breach report with OCR after his electronic records vendor locked him out of his own patient data over a billing dispute. OCR opened a review of that complaint, and the review turned back on him. They found he had never conducted a risk analysis, and still had not completed one even after the agency walked him through what was required. He paid $100,000 and accepted two years of federal monitoring. (HHS Resolution Agreement, Steven A. Porter, M.D., 2020.)",
        ],
      },
      {
        type: "p",
        runs: [
          "He is not a dentist. But to OCR, a solo physician and a solo dentist look identical: a small covered entity holding electronic patient data, answerable to the same baseline. The lesson here isn't \"don't report breaches.\" It's that the one document that would have protected him was the one he never had.",
        ],
      },
      { type: "h2", text: "Is your dental practice even covered by HIPAA?" },
      {
        type: "p",
        runs: [
          "Almost certainly, and the exceptions are narrower than most owners assume.",
        ],
      },
      {
        type: "p",
        runs: [
          "A dental practice is a HIPAA \"covered entity\" if it transmits health information electronically in connection with a covered transaction: submitting insurance claims, checking eligibility, sending referrals. That captures essentially every modern office that bills insurance or uses practice-management software. The American Dental Association frames it the same way in its HIPAA 20 Questions guidance for member dentists.",
        ],
      },
      { type: "p", runs: ["A few specifics worth nailing down:"] },
      {
        type: "ul",
        items: [
          [
            { strong: "\"I'm cash-pay, so I'm exempt.\" " },
            "Rare in practice. The moment any claim, eligibility check, or referral goes out electronically, the exemption is gone. You can also be bound contractually through a participating-provider agreement with an insurer, even without filing a claim yourself.",
          ],
          [
            { strong: "\"I'm solo, so this is for bigger groups.\" " },
            "A single-location office is held to the same Security Rule standard as a hospital network. A solo dentist is also required to name a HIPAA Privacy Officer and Security Officer, and the only candidate is usually you. Not designating one is itself a documentable violation, with or without a breach.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "So the threshold question is settled. The real question is what the rule actually demands once you're in.",
        ],
      },
      { type: "h2", text: "What the rule says, and what OCR actually checks first" },
      {
        type: "p",
        runs: [
          "The HIPAA Security Rule is organized around safeguards, and the very first administrative safeguard is the risk analysis. The text at 45 CFR \u00a7 164.308(a)(1)(ii)(A) reads:",
        ],
      },
      {
        type: "quote",
        runs: [
          "Risk analysis (Required). Conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of electronic protected health information held by the covered entity or business associate.",
        ],
      },
      {
        type: "p",
        runs: [
          "Two words in there carry the weight. \"Required\" means it is not in the flexible \"addressable\" category that lets you document an alternative. And \"accurate and thorough\" is the standard OCR measures you against, which is exactly where the Porter practice fell short.",
        ],
      },
      {
        type: "p",
        runs: [
          "This isn't a dormant rule. OCR has run a standing enforcement initiative around the right of access and around risk analysis, and its investigators consistently report that the absence of a completed risk analysis is the most frequent finding when they open a file. The Porter settlement is one named example of many. So is the broader pattern: when something goes wrong, the first request is \"show me your risk analysis,\" and a missing or thin one converts an incident into a finding.",
        ],
      },
      {
        type: "p",
        runs: [
          "There is a second, quieter point in the Porter story. He eventually got help, and still didn't produce an adequate analysis. Doing the work badly is treated much like not doing it at all. Which leads to what \"the work\" actually is.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "The hard part isn't running the analysis. It's knowing which gaps you have before OCR does. " },
          "The free HIPAA Risk Scorecard checks the 10 areas that come up most often in OCR investigations, then you get a short written review and an introduction to a vetted specialist. Three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What a real dental risk analysis actually covers" },
      {
        type: "p",
        runs: [
          "A risk analysis is a documented process, not a form you sign. Done properly, it moves through a clear sequence:",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Inventory your ePHI. " },
            "Map where electronic patient data actually lives. In a dental office that means more than the chart: digital X-rays and panoramic images, CBCT scans, intraoral photos, the practice-management system (Dentrix, Eaglesoft, Open Dental), imaging software (Dexis, iTero), the billing and insurance data, cloud backups, and anything synced to a laptop or phone.",
          ],
          [
            { strong: "Identify threats and vulnerabilities " },
            "to each of those, from ransomware and phishing down to an unencrypted backup drive in a desk.",
          ],
          [
            { strong: "Rate likelihood and impact " },
            "for each, so you can tell a minor issue from a serious one.",
          ],
          [{ strong: "Document your safeguards " }, "and the decisions you made."],
          [{ strong: "Write a remediation plan " }, "for the gaps you found."],
          [
            { strong: "Keep the record. " },
            "HIPAA requires documentation to be retained for six years.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This is also why a generic checklist fails the test. A checklist tracks whether you have a policy; a risk analysis evaluates whether that policy actually protects the data in your environment. OCR has said as much, and the practices that get cited often have a binder of policies and no real analysis behind them.",
        ],
      },
      { type: "h2", text: "Your three options for getting it done" },
      {
        type: "p",
        runs: [
          "There are three honest ways to satisfy the requirement. None is wrong; they trade cost against confidence.",
        ],
      },
      {
        type: "p",
        runs: [{ strong: "Option 1: Do it yourself with the free HHS tool." }],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "What it is. " },
            "The federal government, through HHS and the ONC, publishes a free Security Risk Assessment (SRA) Tool that walks you through the questions.",
          ],
          [
            { strong: "Who it fits. " },
            "A very small, very hands-on practice with time and patience.",
          ],
          [
            { strong: "The shortfall. " },
            "It hands you a structure and a questionnaire. It does not tell you where you are actually exposed, it doesn't scan anything, and it doesn't track whether you fixed what you found. The output is only as good as the answers you put in, and most owners don't know what they don't know.",
          ],
          [
            { strong: "Verdict. " },
            "A legitimate starting point and far better than nothing. Treat it as the first draft, not the finished, audit-ready program.",
          ],
        ],
      },
      {
        type: "p",
        runs: [{ strong: "Option 2: Lean on your IT provider or managed-services vendor." }],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "What it is. " },
            "Your existing IT company runs or assists with the assessment.",
          ],
          [
            { strong: "Who it fits. " },
            "Practices that already have a capable IT partner and a signed Business Associate Agreement with them.",
          ],
          [
            { strong: "The shortfall. " },
            "IT skill and HIPAA-compliance skill are not the same thing. A vendor can secure your network and still miss the administrative and documentation pieces OCR weighs most heavily. And the practice, not the vendor, stays legally responsible for the result.",
          ],
          [
            { strong: "Verdict. " },
            "Good for the technical layer. Confirm they produce documented, audit-ready output, not just a clean firewall.",
          ],
        ],
      },
      {
        type: "p",
        runs: [{ strong: "Option 3: Bring in a HIPAA compliance specialist." }],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "What it is. " },
            "A consultancy or compliance firm conducts the analysis and helps you remediate.",
          ],
          [
            { strong: "Who it fits. " },
            "Owners who want it done right once and defensible if OCR ever calls.",
          ],
          [
            { strong: "The shortfall. " },
            "It costs more than the other two, and quality varies, so the specialist still has to fit a solo-practice budget and workflow.",
          ],
          [
            { strong: "Verdict. " },
            "The strongest path for defensibility. A specialist assesses your specific environment and recommends a remediation plan; they don't wave a wand and make you \"compliant\" on their own.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "If you're not sure which path fits, that's the normal place to start. The Scorecard surfaces your likely gaps first, so you can tell whether you can reasonably self-serve or whether you need a specialist. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "How often, and the paperwork that proves it" },
      {
        type: "p",
        runs: [
          "The Security Rule treats the risk analysis as ongoing, not one-and-done. The practical standard most compliance professionals and federal programs use: complete a full analysis, then review and update it at least annually and whenever something material changes. A new practice-management system, a move to a new building, a staffing change with new access, or a security incident all reset the clock.",
        ],
      },
      {
        type: "p",
        runs: [
          "Documentation is not a side task; it is the deliverable. If OCR asks, \"we did one\" is not an answer. \"Here is the dated analysis, the gaps we identified, the remediation we completed, and the annual reviews since\" is. Keep it for six years.",
        ],
      },
      { type: "h2", text: "What's changing in 2026, and what to do now" },
      {
        type: "p",
        runs: [
          "You have probably seen headlines about a \"2026 HIPAA Security Rule.\" Here is the accurate status, because a lot of vendor content overstates it.",
        ],
      },
      {
        type: "p",
        runs: [
          "HHS published a Notice of Proposed Rulemaking in the Federal Register on January 6, 2025, proposing the first major overhaul of the Security Rule in over two decades. The comment period closed in March 2025. As of this writing, ",
          { strong: "OCR has not published a final rule" },
          ", and industry analysts now expect finalization in late 2026 or early 2027. So the changes below are proposed, not yet law.",
        ],
      },
      {
        type: "p",
        runs: [
          "If finalized, the overhaul would, among other things, remove much of the \"addressable\" flexibility and make safeguards like encryption and multi-factor authentication explicitly required, add vulnerability scanning, and compress breach-related timelines. The direction is clearly toward less discretion and more provable, documented controls.",
        ],
      },
      {
        type: "p",
        runs: [
          "The practical takeaway for a solo practice is simple. The existing rule already requires your risk analysis today, and the proposed changes only raise the bar. So there is no version of the next two years where doing the analysis now is wasted effort. Build it to today's requirement, and lean toward the stricter controls the proposed rule signals.",
        ],
      },
      { type: "h2", text: "Recommendation" },
      {
        type: "p",
        runs: [
          "Treat the risk analysis as the foundation of your HIPAA program, not a box to check before an audit. It is required now, it is the first thing OCR looks for, and a missing or thin one is what turns a bad day into a six-figure settlement.",
        ],
      },
      {
        type: "p",
        runs: [
          "Start by finding out where you actually stand. ",
          { strong: "Most solo practices carry two or three HIPAA gaps they can't see. The free HIPAA Risk Scorecard checks the 10 areas that come up most often in OCR investigations, then sends you a short written review and an introduction to a vetted specialist. It takes about three minutes. " },
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "This is general information, not legal advice. " },
          "Hipsana is not a law firm, a compliance officer, or a healthcare provider. Verify current requirements with HHS or qualified counsel before acting.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is the founder of Hipsana, where he runs the HIPAA Risk Scorecard and the short practice risk reviews behind it. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. Its compliance writing starts from primary regulators (HHS, OCR, NIST) and is checked against their current text before anything goes live. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, Resolution Agreement and press release, Steven A. Porter, M.D. (2020)."],
          ["HHS Office for Civil Rights, Resolution Agreement, Elite Dental Associates (2019)."],
          ["45 CFR \u00a7 164.308 (eCFR, current)."],
          ["HHS, Guidance on Risk Analysis (referencing NIST SP 800-66)."],
          ["Federal Register, HHS civil monetary penalty inflation adjustment, effective January 28, 2026."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025."],
          ["American Dental Association, HIPAA 20 Questions."],
        ],
      },
    ],
    faq: [
      {
        question: "Are dental X-rays really considered protected health information?",
        answer:
          "Yes. Any information that can be tied to a patient is PHI, and that includes digital radiographs, panoramic and CBCT images, and intraoral photos. They have to be inventoried in your risk analysis and protected like any other ePHI.",
      },
      {
        question: "What's the penalty if a dental practice gets it wrong?",
        answer:
          "HIPAA civil penalties run in four tiers based on culpability. As of the amounts effective January 28, 2026, they range from $145 per violation at the low end up to $2,190,294 per violation for willful neglect left uncorrected, with an annual cap of $2,190,294 per identical requirement. In practice, small-practice settlements are usually far below the maximum, because OCR weighs your size, your intent, and your cooperation. The Porter practice settled at $100,000; a Dallas dental practice settled at $10,000. The number that should worry you isn't the statutory ceiling; it's that the most common trigger is so basic: no risk analysis.",
      },
      {
        question: "Does OCR actually fine small dental practices, or just hospitals?",
        answer:
          "It fines dental practices. In 2019, Elite Dental Associates, a privately owned practice in Dallas, paid $10,000 to OCR and accepted a two-year corrective action plan after disclosing patients' protected health information in replies to Yelp reviews. That was a Privacy Rule case rather than a risk-analysis case, but the point stands: OCR enforces against small dental offices, and it reduced that penalty specifically because of the practice's size and cooperation.",
      },
      {
        question: "Do I need a Business Associate Agreement with my dental lab or IT company?",
        answer:
          "If the vendor receives patient-identifiable information, yes. Labs that get patient names with cases, IT companies that can access your systems, cloud backup providers, and billing companies are business associates and need a signed BAA. A lab receiving only de-identified cases with a number may not, though that's uncommon in practice.",
      },
      {
        question: "Can I just do the risk analysis myself?",
        answer:
          "You can, using the free HHS SRA Tool, and a careful owner can produce a reasonable first draft. The catch is that a self-assessment only catches what you already know to look for, and the gaps that sink small practices are usually the ones they didn't know they had. That blind spot is exactly what an OCR investigator finds first. Seeing where you actually stand before you decide is what the Scorecard is for.",
      },
      {
        question: "I'm a one-dentist office. Does this really apply to me?",
        answer:
          "Yes. Size doesn't change the requirement. A solo practice must conduct the risk analysis, designate Privacy and Security Officers (usually the owner), and keep the documentation. The Porter case was a solo practice, and so was Elite Dental.",
      },
    ],
  },
];

export function getAllArticles(): Article[] {
  return articles;
}

export function getPublishedArticles(): Article[] {
  return articles.filter((a) => a.status === "published");
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
