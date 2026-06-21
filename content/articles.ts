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
  | { type: "quote"; runs: InlineRun[] }
  | { type: "steps"; items: { label: string; detail: string }[] }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: InlineRun[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    };

export type FaqItem = {
  question: string;
  answer: string; // plain text; also used verbatim in the FAQ schema
};

export type Article = {
  slug: string; // URL: /articles/<slug>
  status: "published" | "draft";
  title: string; // <h1> and <title>
  metaTitle?: string; // optional shorter SERP <title>; overrides title for the tab/SERP
  kind?: "report"; // optional content-type label; drives the "Report" eyebrow and the index/home prominence. Absent = standard guide.
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
    metaTitle: "Do Dentists Need a HIPAA Risk Assessment? (2026)",
    description:
      "Yes. The HIPAA Security Rule requires a risk analysis from every dental practice, solo or group. Here's what OCR actually checks, and how to get it done.",
    author: "Dolev Arama",
    datePublished: "2026-06-03",
    dateModified: "2026-06-12",
    body: [
      {
        type: "p",
        runs: [
          "A solo doctor once reported a data breach to the federal government, and the government fined him $100,000 for one document he didn't have. Here is the document every dental practice is required to keep, why a checklist won't pass for it, and how to tell if you are exposed.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "Yes. " },
            "The HIPAA Security Rule requires one from every covered dental practice, whether you run ten operatories or a single chair. It is not optional, and not merely \"recommended.\"",
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
            "and again after anything material changes: new software, a new location, a data breach. AI counts as new software; ",
            {
              text: "whether ChatGPT and other AI tools are HIPAA compliant in a dental practice",
              href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
            },
            " is its own question, and so is ",
            {
              text: "the BAA test for an AI scribe that records visits",
              href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
            },
            ".",
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
          "This article explains whether a dental practice needs a HIPAA risk assessment. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
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
      { type: "p", runs: ["Here is how that plays out, and what to actually do about it."] },
      {
        type: "p",
        runs: [
          "Start with that solo doctor. He was a gastroenterologist in Ogden, Utah, seeing about 3,000 patients a year. Back in 2013 he reported his own records vendor to OCR for locking him out of his patients' data over a billing dispute. OCR opened a review of that complaint, and the review turned back on him: it found he had never conducted a risk analysis, and that he still had not completed one even after the agency walked him through what was required. The $100,000 settlement and two years of federal monitoring followed. (HHS Resolution Agreement, Steven A. Porter, M.D., 2020.)",
        ],
      },
      {
        type: "p",
        runs: [
          "He is not a dentist. But to OCR, a solo physician and a solo dentist look identical: a small covered entity holding electronic patient data, answerable to the same baseline. The lesson here isn't \"don't report breaches.\" It's that the one document that would have protected him was the one he never had.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-porter-risk-analysis.webp",
        alt: "Excerpts from the HHS Office for Civil Rights resolution agreement with Steven A. Porter, M.D., P.C., a solo practice, with the cited failure to conduct a risk analysis and the $100,000 settlement highlighted.",
        width: 1500,
        height: 562,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          {
            text: "Resolution Agreement, Steven A. Porter, M.D., P.C. (2020)",
            href: "https://www.hhs.gov/sites/default/files/porter-ra-cap-508.pdf",
          },
          ". Highlights added by Hipsana: a solo practice, the cited failure to conduct a risk analysis, and the $100,000 settlement.",
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
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "So the threshold question is settled. The real question is what the rule actually demands once you're in.",
        ],
      },
      { type: "h2", text: "What the rule says, and what OCR actually checks" },
      {
        type: "p",
        runs: [
          "The HIPAA Security Rule is organized around safeguards, and the very first administrative safeguard is the risk analysis. The text at ",
          { text: "45 CFR \u00a7 164.308(a)(1)(ii)(A)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308" },
          " reads:",
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
          "This isn't a dormant rule. OCR has run a standing enforcement initiative around the right of access and around risk analysis, and its investigators consistently report that the absence of a completed risk analysis is the most frequent finding when they open a file. The Porter settlement is one named example of many. So is ", { text: "the broader pattern", href: "/articles/dental-hipaa-breach-and-enforcement-report" }, ": when something goes wrong, the first request is \"show me your risk analysis,\" and a missing or thin one converts an incident into a finding.",
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
          "The free HIPAA Risk Scorecard checks the 10 areas that come up most often in OCR investigations, then you get a short written review and an introduction to a specialist. Three minutes. ",
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
        type: "steps",
        items: [
          {
            label: "Inventory your ePHI",
            detail:
              "Map where electronic patient data actually lives: digital X-rays and CBCT scans, intraoral photos, the practice-management system (Dentrix, Eaglesoft, Open Dental), imaging software (Dexis, iTero), billing and insurance data, cloud backups, and anything synced to a laptop or phone.",
          },
          {
            label: "Identify threats and vulnerabilities",
            detail:
              "For each of those, from ransomware and phishing down to an unencrypted backup drive in a desk drawer.",
          },
          {
            label: "Rate likelihood and impact",
            detail:
              "Score each risk so you can tell a minor issue from a serious one.",
          },
          {
            label: "Document your safeguards",
            detail:
              "Record the protections you have in place and the decisions you made.",
          },
          {
            label: "Write a remediation plan",
            detail: "Lay out how and when you will close each gap you found.",
          },
          {
            label: "Keep the record",
            detail:
              "HIPAA requires the documentation to be retained for six years.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "One data flow that is easy to leave out of that inventory is your own website. A booking page or contact form can send patient details to third parties through analytics or advertising code, so it belongs in the same analysis, ",
          {
            text: "as the rules on website tracking pixels spell out",
            href: "/articles/are-tracking-pixels-hipaa-compliant-dental-practice",
          },
          ".",
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
            "The federal government, through HHS and the ONC, publishes a free ",
            { text: "Security Risk Assessment (SRA) Tool", href: "https://healthit.gov/privacy-security/security-risk-assessment-tool/" },
            " that walks you through the questions.",
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
            "It costs more than the other two, and quality varies, so the specialist still has to fit a solo-practice budget and workflow. (For the actual numbers, here is ",
            { text: "what a dental HIPAA risk assessment typically costs", href: "/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice" },
            ".)",
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
          "HHS published ",
          { text: "a Notice of Proposed Rulemaking in the Federal Register", href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information" },
          " on January 6, 2025, proposing the first major overhaul of the Security Rule in over two decades. The comment period closed in March 2025. As of this writing, ",
          { strong: "OCR has not published a final rule" },
          ", and industry analysts now expect finalization in late 2026 or early 2027. So the changes below are proposed, not yet law.",
        ],
      },
      {
        type: "p",
        runs: [
          "If finalized, the overhaul would, among other things, remove much of the \"addressable\" flexibility and make safeguards like ", { text: "encryption", href: "/articles/is-email-hipaa-compliant-dental-practice" }, " and multi-factor authentication explicitly required, add vulnerability scanning, and compress breach-related timelines. The direction is clearly toward less discretion and more provable, documented controls.",
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
          "Treat the risk analysis as the foundation of your HIPAA program, not a box to check before an audit. It is required now, it is the first thing OCR looks for, and a missing or thin one is what turns a bad day into a six-figure settlement. For what that bad day actually looks like, see ",
          { text: "what happens when a dental practice fails a HIPAA audit", href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit" },
          " and, if a breach is the trigger, ",
          { text: "what to do in the first 60 days after a breach", href: "/articles/dental-data-breach-response" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "Start by finding out where you actually stand. ",
          { strong: "Most solo practices carry two or three HIPAA gaps they can't see. The free HIPAA Risk Scorecard checks the 10 areas that come up most often in OCR investigations, then sends you a short written review and an introduction to a specialist. It takes about three minutes. " },
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
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
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
  {
    slug: "what-happens-if-dental-practice-fails-hipaa-audit",
    status: "published",
    title: "What Happens If a Dental Practice Fails a HIPAA Audit? (2026)",
    metaTitle: "If a Dental Practice Fails a HIPAA Audit (2026)",
    description:
      "A random HIPAA audit rarely ends in a fine. The real risk is an OCR investigation after a breach or complaint, and what failing costs a small dental practice.",
    author: "Dolev Arama",
    datePublished: "2026-06-04",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "A surprise HIPAA audit almost never ends in a fine. What actually costs a dental practice five or six figures is the OCR investigation that follows a breach or a complaint, and it usually comes down to one document most practices never finished: the risk analysis. Here is what that process really looks like, what it costs, and how to get ahead of it.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          ["A surprise OCR audit is rare, and on its own it has almost never produced a fine. The 2016-2017 audit round found violations but imposed none."],
          [
            "The real financial risk is an OCR ",
            { strong: "investigation" },
            ", and nearly all of them start the same way: a patient complaint, or a breach you have to report yourself.",
          ],
          ["“Failing” usually comes down to one finding. After a breach, the first document OCR asks for is your risk analysis, and most small practices never did a real one."],
          ["Recent settlements for that single gap have run from about $10,000 to $225,000, plus two to three years of monitored corrective action."],
          [
            "The way to get ahead of it is to know your gaps before OCR does. ",
            { text: "Check your practice with the HIPAA Risk Scorecard.", href: "/scorecard" },
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains what happens if a dental practice fails a HIPAA audit. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "In late 2021, an Oklahoma emergency medical provider was hit by ransomware that locked records for roughly 14,000 patients. The provider, Bryan County Ambulance Authority, reported the breach to OCR, as the law required. OCR opened an investigation and found one decisive thing: it had never conducted a risk analysis, the basic security review HIPAA requires of every covered practice. The matter settled for $90,000 and three years of federal oversight (",
          {
            text: "HHS, October 2024",
            href: "https://www.hhs.gov/about/news/2024/10/31/hhs-office-for-civil-rights-settles-hipaa-ransomware-cybersecurity-investigation-for-90000-dollars.html",
          },
          "). It is an ambulance service, not a dental office. But the failure OCR cited has nothing to do with ambulances, and everything to do with the most common gap it finds in small practices of every kind.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-bryan-county-risk-analysis.webp",
        alt: "Excerpt from the U.S. HHS Office for Civil Rights announcement of the $90,000 Bryan County Ambulance Authority settlement, showing OCR's finding that the provider had failed to conduct a compliant risk analysis.",
        width: 1500,
        height: 760,
        caption: [
          "OCR's first Risk Analysis Initiative settlement: Bryan County Ambulance Authority paid $90,000 after OCR found it had never conducted a compliant risk analysis. Source: HHS / OCR, October 31, 2024.",
        ],
      },

      { type: "h2", text: "First, what a “HIPAA audit” really is (and isn’t)" },
      {
        type: "p",
        runs: [
          "Most dentists picture an audit as an official appearing unannounced to fine you for a missing box. That is not how the money usually changes hands. OCR runs a formal HIPAA Audit Program under the HITECH Act, but it is small and periodic: the 2016-2017 round reviewed about 200 organizations, and the current round, restarted in late 2024, covers just 50, focused on the risk analysis and risk management requirements of the Security Rule (",
          { text: "HHS", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/audit/index.html" },
          "). Across hundreds of thousands of practices, the odds yours is randomly selected in a given year are low.",
        ],
      },
      {
        type: "p",
        runs: [
          "Here is the part that surprises people. OCR frames the audit program as a way to improve compliance, not to punish. When the HHS Office of Inspector General reviewed the 2016-2017 round in 2024, it found OCR had identified violations but imposed no penalties, and the audits did not even trigger follow-up investigations. The thing most owners fear, failing a surprise audit, has historically carried no fine at all.",
        ],
      },
      {
        type: "p",
        runs: [
          "What actually puts a practice at financial risk is an OCR ",
          { strong: "investigation" },
          ", a different process with a different trigger. It starts when:",
        ],
      },
      {
        type: "ul",
        items: [
          ["A patient or staff member files a complaint with OCR, or"],
          [
            "You report a breach of unsecured patient information, which the ",
            { text: "Breach Notification Rule", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-D" },
            " requires (45 CFR §§164.400-414). Breaches affecting 500 or more people are also posted on OCR’s public portal, the “Wall of Shame.”",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "The resumed audit program adds one wrinkle: if an audit surfaces a serious problem, OCR can convert it into an investigation. But the dominant path to a penalty still runs through the breach you report or the complaint a patient files, not a random knock on the door.",
        ],
      },

      { type: "h2", text: "What an OCR investigation actually looks like" },
      {
        type: "p",
        runs: ["The Bryan County case is a clean map of the process, and of the timeline."],
      },
      {
        type: "steps",
        items: [
          {
            label: "The trigger",
            detail: "Ransomware encrypted the provider's files in November 2021. It reported the breach to OCR in May 2022.",
          },
          {
            label: "OCR opens an investigation",
            detail: "In June 2022, weeks after the breach report, OCR opened its review.",
          },
          {
            label: "One document comes first",
            detail:
              "After a breach, one of the first things OCR asks for is your risk analysis and when you last completed it. It is the required written exercise of finding where patient data lives and what could go wrong with it (45 CFR §164.308(a)(1)(ii)(A)).",
          },
          {
            label: "OCR makes findings",
            detail: "Here it was blunt: no evidence the provider had ever done one.",
          },
          {
            label: "Resolution",
            detail:
              "Most matters end in a Resolution Agreement, a settlement plus a Corrective Action Plan, with no admission of wrongdoing. Bryan County paid $90,000 and accepted a plan OCR monitors for three years. A formal Civil Money Penalty is reserved for the worst cases.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "Two things catch practices off guard. It is slow: Bryan County's 2021 breach did not settle until late 2024, and another 2024 case ran roughly six years from breach to resolution. And the corrective action plan, not the check, is what people underestimate. It is a multi-year commitment, supervised by the government, to fix what they found.",
        ],
      },

      { type: "h2", text: "What “failing” actually costs" },
      {
        type: "p",
        runs: [
          "The honest numbers are smaller than the headlines and larger than most owners assume. In October 2024, OCR launched a Risk Analysis Initiative to focus investigations on this one requirement, and in its first year it announced ", { text: "more than a dozen settlements", href: "/articles/dental-hipaa-breach-and-enforcement-report" }, ", from small physician groups to hospital systems. Nearly all shared Bryan County's gap: no accurate, thorough risk analysis. A few published outcomes for that single failure:",
        ],
      },
      {
        type: "ul",
        items: [
          ["A behavioral health provider: $225,000, plus a two-year corrective action plan, after ransomware."],
          ["Another small provider: $10,000."],
          ["Bryan County's emergency service: $90,000."],
          ["A wellness-plan vendor: about $228,000."],
        ],
      },
      {
        type: "p",
        runs: [
          "For a solo or small dental practice, realistic exposure for a serious failure sits in the five-to-six-figure range, not the seven-figure range you may have seen quoted. The multimillion-dollar numbers attach to large organizations or the worst tier of violation. The statutory ceiling is real, the maximum annual penalty for willful neglect left uncorrected is $2,190,294 for 2026 (",
          {
            text: "Federal Register, January 2026",
            href: "https://www.federalregister.gov/documents/2026/01/28/2026-01688/annual-civil-monetary-penalties-inflation-adjustment",
          },
          "), but under OCR's longstanding approach that cap applies in practice only to that worst category. A small practice that reports a breach and shows good-faith effort is not the profile that draws it.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "The costs that are not a dollar figure matter too. The corrective action plan means years of work under OCR supervision. If a breach crossed the 500-person line, your practice name sits on a public federal list. For a solo dentist whose reputation is the practice, that can outlast the check.",
        ],
      },
      {
        type: "p",
        runs: [
          "One dental-specific point is worth knowing, because it is the other common way a dentist ends up in front of OCR. In 2022, dental practices were a focus of OCR's Right of Access enforcement, the rule that requires giving patients a copy of their records, usually within 30 days. That September, OCR settled three dental cases at once, for $30,000, $80,000, and $25,000, each over a patient who waited months for records they were owed. So the two paths that most often end in a penalty for a dentist are a reported breach, where the risk analysis is the issue, and ",
          {
            text: "a records request the patient had to chase",
            href: "/articles/how-to-handle-a-patient-records-request-dental-practice",
          },
          ".",
        ],
      },

      {
        type: "quote",
        runs: [
          "OCR's audits are built to improve compliance, not to fine. The money comes from the investigation that follows a breach.",
        ],
      },
      { type: "h2", text: "The one document OCR checks first" },
      {
        type: "p",
        runs: [
          "Step back, and the pattern is hard to miss: the expensive failure is almost never exotic. After a breach, the risk analysis is the first thing OCR asks to see, because it shows whether you were watching your own vulnerabilities before something went wrong. A current, honest one does not make you breach-proof, but it changes the conversation, and the factors OCR weighs when setting a penalty include your compliance history and your good-faith effort to fix problems (45 CFR §160.408).",
        ],
      },
      {
        type: "p",
        runs: [
          "This is also where most practices quietly fall short. The risk analysis is required of every covered practice, but it is not a twenty-minute form. HHS offers a free ",
          { text: "Security Risk Assessment Tool", href: "https://healthit.gov/privacy-security/security-risk-assessment-tool/" },
          ", a reasonable place to start, but not a finished assessment that would satisfy an investigator: it gives you the questions, not which answers are wrong in your office. If you have never run one, ",
          { text: "our guide to the dental HIPAA risk assessment", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" },
          " covers what it has to include.",
        ],
      },
      {
        type: "p",
        runs: [
          "That is the gap the ",
          { text: "HIPAA Risk Scorecard", href: "/scorecard" },
          " is built to surface. It checks the controls OCR most commonly cites, scores your practice, and follows with a short review and an intro to a specialist if you want help. A few minutes, and you see where you stand before a breach or a complaint forces the question. ",
          { text: "Check your practice now.", href: "/scorecard" },
        ],
      },

      { type: "h2", text: "How to get ahead of an investigation" },
      {
        type: "p",
        runs: [
          "The work is not mysterious. It mirrors what OCR puts in nearly every corrective action plan, which is a fair description of what “good” looks like to them.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Do a real risk analysis. " },
            "Map where patient data lives and what could expose it. Write it down and date it. This is the highest-value step, and the one OCR checks first.",
          ],
          [
            { strong: "Build a risk management plan. " },
            "An analysis that finds problems and fixes nothing is worse than none. List each gap and how you will close it.",
          ],
          [
            { strong: "Sign real business associate agreements. " },
            { text: "Every vendor that touches patient data", href: "/articles/does-my-dental-practice-need-a-baa" }, ", your practice-management software, IT company, billing service, needs one (45 CFR §164.504(e)). Missing BAAs are a recurring finding, and AI tools are the newest place they go missing; here is ",
            {
              text: "which AI tools will sign a BAA for a dental practice",
              href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
            },
            ", and ",
            {
              text: "the five-question test to run on any AI scribe vendor",
              href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
            },
            ".",
          ],
          [
            { strong: "Write your policies, and follow them. " },
            "“We know what to do” is not a policy. OCR expects documents you can produce.",
          ],
          [
            { strong: "Train your team, and keep the records. " },
            "A front-desk mistake is the practice's liability. Documented annual training is both a requirement and a defense.",
          ],
          [
            { strong: "Have a breach response plan. " },
            "Knowing how to report on time keeps a manageable incident from becoming a Breach Notification Rule violation on top of the breach, and we walk through ",
            { text: "the first 60 days after a dental data breach", href: "/articles/dental-data-breach-response" },
            " step by step.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          { text: "None of these is expensive alone", href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice" },
          ", and ",
          { text: "what a dental HIPAA risk assessment actually costs", href: "/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice" },
          " ranges from free with the federal tool to a specialist's fee. What makes them feel impossible is not knowing which you are missing, which is the whole reason the risk analysis comes first.",
        ],
      },

      { type: "h2", text: "The catch: a few things that are easy to get wrong" },
      {
        type: "p",
        runs: [
          { strong: "“We’re too small to be on OCR’s radar.” " },
          "The Risk Analysis Initiative reached small physician groups, and one settlement for this failure was $10,000, a number that only makes sense for a very small organization. OCR’s position is that no entity is too small for the requirement.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "“Reporting my own breach just invites a fine.” " },
          "Not reporting is far worse. A failure to notify is its own violation, and hiding a breach is the kind of conduct that pushes a case toward willful neglect. The practices that fare best report promptly and show they had done the groundwork.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "“A clean audit means I’m fine.” " },
          "The audit and an investigation test different things. The audit is a documentation review of a handful of practices. The investigation is what happens after a real breach or complaint, and that is where the money is.",
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
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, settlement with Bryan County Ambulance Authority (October 2024)."],
          ["HHS Office for Civil Rights, HIPAA Audit Program."],
          ["HHS Office of Inspector General, review of OCR's HIPAA Audit Program (2024)."],
          ["45 CFR §§ 164.308, 164.400-414, 164.504(e), and 160.404-160.408."],
          ["Federal Register, HHS civil monetary penalty inflation adjustment, effective January 28, 2026."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025."],
          ["HHS Office for Civil Rights, Right of Access enforcement actions (2022)."],
        ],
      },
    ],
    faq: [
      {
        question: "Does OCR randomly audit small dental practices?",
        answer:
          "Rarely. The current audit round, restarted in late 2024, covers about 50 organizations nationwide and is focused on risk analysis and risk management. The far more common way a small practice ends up in front of OCR is through a patient complaint or a breach the practice itself had to report.",
      },
      {
        question: "What is the difference between a HIPAA audit and a HIPAA investigation?",
        answer:
          "An audit is a periodic, documentation-based review OCR initiates to encourage compliance, and historically it has produced no fines on its own. An investigation is OCR's response to a specific event, usually a complaint or a reported breach, and it is the process that leads to settlements and penalties.",
      },
      {
        question: "How much is a HIPAA fine for a small dental practice?",
        answer:
          "There is no single number, but recent settlements for the most common failure, a missing risk analysis, have ranged from about $10,000 to over $225,000, plus a corrective action plan lasting two to three years. The seven-figure figures you may have read about generally apply to large organizations or the most serious, uncorrected violations.",
      },
      {
        question: "Is the free HHS risk assessment tool enough?",
        answer:
          "It is a fair starting point for understanding what a risk analysis involves, but it is not a finished assessment on its own. It gives you the questions, not the answer to which gaps exist in your specific practice. The HIPAA Risk Scorecard checks the controls OCR most commonly cites and follows with a short review.",
      },
      {
        question: "What happens if a breach affects more than 500 patients?",
        answer:
          "On top of notifying the affected individuals and OCR, you must notify prominent media in the area, and your practice is listed on OCR's public breach portal. For a solo practice, the reputational exposure of that listing can matter as much as any settlement.",
      },
      {
        question: "Can a dentist lose their license over a HIPAA violation?",
        answer:
          "Not from OCR directly. OCR enforces HIPAA with civil settlements and corrective action plans, and it has no power over your dental license. Licensure is handled by your state dental board, under state law. A serious privacy violation can draw a state board's attention, and state Attorneys General also have authority to bring their own HIPAA cases. The situations where a dentist has actually lost a license generally came from state action over the underlying conduct, not from a HIPAA fine itself.",
      },
      {
        question: "Can a HIPAA violation be a crime?",
        answer:
          "Rarely, and not for ordinary compliance gaps. Criminal HIPAA cases are prosecuted by the Department of Justice and are reserved for knowingly obtaining or disclosing patient information wrongfully, such as selling records or snooping with intent to harm. At the most serious level, involving intent to sell or profit from the data, the law allows fines up to $250,000 and up to ten years in prison. A practice that simply skipped its risk analysis is in civil territory, not criminal.",
      },
      {
        question: "Are the 2026 HIPAA Security Rule changes already in effect?",
        answer:
          "No. In late 2024, OCR proposed a major Security Rule update that would, among other things, make encryption and multi-factor authentication mandatory and remove today's addressable flexibility. As of mid-2026 it is still a proposed rule. OCR has not issued a final version and has not confirmed when, or whether, it will. The current Security Rule still governs, and the risk analysis it already requires is what OCR is enforcing right now. If the rule is finalized, practices would get roughly eight months to comply.",
      },
      {
        question: "Will having a risk analysis stop a fine?",
        answer:
          "It is not a guarantee, and no document makes a real breach disappear. But OCR weighs your compliance history and good-faith efforts when deciding on a penalty, so a current, honest risk analysis materially changes how an investigation is likely to go.",
      },
    ],
  },
  {
    slug: "dental-data-breach-response",
    status: "published",
    title: "What to Do If Your Dental Practice Has a Data Breach: The First 60 Days (2026)",
    metaTitle: "Dental Practice Data Breach: What to Do (2026)",
    description:
      "A dental data breach starts a 60-day HIPAA clock. The exact steps to take, who to notify, and what OCR most commonly cites, anchored to a real OCR settlement.",
    author: "Dolev Arama",
    datePublished: "2026-06-05",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "Someone in your office clicks the wrong link, or your practice-management software (Dentrix, Eaglesoft, or Open Dental) stops opening and a ransom note appears on the screen. Maybe a laptop full of patient records walks out the door. The moment you realize patient data may be exposed, a legal clock starts. Under HIPAA you have a fixed number of days to tell the people affected, and federal regulators pay attention to what you do next. Here is the order to do things in, the deadlines that actually bind you, and the one mistake that turns a bad week into a federal investigation.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [{ strong: "Contain it first, then assess." }, " Disconnect affected systems without wiping them, get a third-party forensics firm involved, and only then work out whether the incident is a reportable breach."],
          [{ strong: "You have 60 days to tell patients." }, " Notify each affected individual without unreasonable delay and no later than 60 calendar days after you discover the breach (45 CFR 164.404)."],
          [{ strong: "HHS gets notified too." }, " If 500 or more people are affected, report to HHS within that same 60 days. If fewer than 500, log it and file by roughly March 1 of the following year (45 CFR 164.408)."],
          [{ strong: "Encrypted data may be off the hook." }, " The rules apply only to \"unsecured\" patient information. Data ", { text: "encrypted to the federal standard", href: "/articles/is-email-hipaa-compliant-dental-practice" }, " can fall under a safe harbor and may not trigger notice at all."],
          [{ strong: "The report you file is what opens the investigation." }, " When a small New York neurology practice reported a ransomware attack, the first thing OCR asked for was its risk analysis. There wasn't one. It paid $25,000."],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains what to do in the first 60 days after a dental practice data breach. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "The first hour: contain it, but don't destroy the evidence" },
      {
        type: "p",
        runs: [
          "Your instinct will be to make the problem disappear. Resist deleting anything. The same logs and forensic data you might be tempted to wipe are exactly what you will need to prove what happened and to answer regulators later. The first hour sets up everything that follows.",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "Isolate, don't wipe or power down." }, " Disconnect affected devices from the network to stop the spread, but leave them running and intact. Shutting a machine off can overwrite forensic evidence that shows how the attacker got in."],
          [{ strong: "Bring in a third-party forensics firm, not just your IT company." }, " The people who set up your network are not always the right ones to investigate a breach inside it. A dedicated cybersecurity or digital-forensics team works out how the attacker got in, what they reached, and whether data actually left the building."],
          [{ strong: "Start a written timeline." }, " Record when you first noticed something, what you saw, and every step you take. The discovery date drives every deadline that follows."],
          [{ strong: "Call your cyber-insurer." }, " If you carry ", { text: "cyber coverage", href: "/articles/dental-practice-cyber-insurance" }, ", notify them right away. Many policies require prompt notice and provide a breach coach who runs the response, and some deny claims if you act on your own first."],
          [{ strong: "Report it to the FBI." }, " Filing with the FBI's Internet Crime Complaint Center at ic3.gov is voluntary, but law enforcement may share intelligence on the attacker and occasionally help with recovery. It does not replace your duty to notify patients."],
          [{ strong: "Don't rush to pay a ransom." }, " Paying does not erase your notification obligations, and the FBI generally discourages it. Make that call with counsel and your insurer, not in a panic."],
        ],
      },
      { type: "h2", text: "Is this even a reportable breach?" },
      {
        type: "p",
        runs: [
          "Not every security scare is a reportable breach, but HIPAA puts the burden on you to prove it isn't. A breach can take many shapes: ransomware that locks your records, a lost or stolen laptop, an email sent to the wrong patient, a former employee who copied files on the way out, a stolen server, or ",
          {
            text: "patient information pasted into a public AI tool",
            href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
          },
          ", or a breach at ",
          {
            text: "the AI scribe vendor that records your visits",
            href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
          },
          ". Whatever the cause, the same test applies.",
        ],
      },
      {
        type: "p",
        runs: [
          "Under the Breach Notification Rule (45 CFR 164.402), any impermissible use or disclosure of unsecured protected health information is presumed to be a breach unless you can show a low probability that the information was compromised. You make that call through a documented four-factor risk assessment that weighs the nature of the data involved, who received it, whether it was actually viewed or acquired, and how far the risk has since been contained.",
        ],
      },
      {
        type: "p",
        runs: [
          "Two words decide whether the rule applies at all. \"Unsecured\" patient information is data that has not been encrypted or destroyed to the standard HHS specifies; if a stolen laptop was properly encrypted, you may fall under the encryption safe harbor and owe no notification, while data sitting in plain text gets no such protection. \"Discovered\" is defined broadly: a breach is treated as discovered on the first day anyone on your team knew about it, or reasonably should have (45 CFR 164.404(a)(2)), so your 60-day clock can start running before you have all the facts.",
        ],
      },
      {
        type: "p",
        runs: [
          "Ransomware deserves a separate note. Owners often assume that if the attacker only locked the data instead of stealing it, nothing was really \"disclosed.\" OCR rejects that reasoning. Its ",
          { text: "Ransomware Fact Sheet", href: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity/ransomware-fact-sheet/index.html" },
          " is blunt:",
        ],
      },
      {
        type: "quote",
        runs: ["When ePHI is encrypted in a ransomware attack, \"a breach has occurred because the ePHI encrypted by the ransomware was acquired.\""],
      },
      {
        type: "p",
        runs: [
          "The attacker taking control of your data is itself the breach, and notification is presumed required unless your risk assessment shows a low probability of compromise.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h2", text: "The 60-day clock: exactly who you must notify" },
      {
        type: "p",
        runs: [
          "Once you have confirmed a reportable breach, HIPAA's Breach Notification Rule (45 CFR 164.400 through 164.414) lays out who hears about it and when. For a solo or small dental practice, four notifications can apply.",
        ],
      },
      {
        type: "steps",
        items: [
          { label: "1. The affected patients: within 60 days", detail: "Send written notice by first-class mail, or by email if the patient agreed to electronic notice, without unreasonable delay and no later than 60 calendar days after discovery (45 CFR 164.404). The letter must explain what happened, what information was involved, what you are doing about it, and what the patient can do to protect themselves." },
          { label: "2. HHS: timing depends on the headcount", detail: "If 500 or more individuals are affected, notify the Secretary of HHS at the same time you notify patients, through the online breach portal (45 CFR 164.408). If fewer than 500 are affected, keep an internal log and submit it to HHS no later than 60 days after the calendar year ends, which in practice means by about March 1." },
          { label: "3. The media: only for larger breaches", detail: "If a breach affects more than 500 residents of a single state or jurisdiction, you must also notify prominent media outlets serving that area, within the same 60-day window (45 CFR 164.406). Most small-practice breaches stay under this threshold, but a large patient list can cross it." },
          { label: "4. Your own clock, if a vendor was breached", detail: "If the breach happened at a business associate (your billing company, cloud host, or IT vendor), they must notify you without unreasonable delay and no later than 60 days after they discover it (45 CFR 164.410). The clock for telling your patients is still yours to manage, which is why many practices contractually require vendors to report within days, not weeks." },
        ],
      },
      { type: "h2", text: "A real case: the report that opened the door" },
      {
        type: "p",
        runs: [
          "In December 2020, a small New York neurology practice called Comprehensive Neurology, PC reported to the HHS Office for Civil Rights that its entire IT network, including all of its electronic patient records, had been encrypted by ransomware. About 6,800 people were affected. The exposed data included names, clinical information, Social Security numbers, and driver's license numbers.",
        ],
      },
      {
        type: "p",
        runs: [
          "Here is the part most practice owners miss. The breach report Comprehensive was legally required to file is the same document that opened a federal investigation. And the first thing investigators looked for was something every covered entity must already have: an accurate, thorough risk analysis of where its patient data lived and how it was protected (",
          { text: "45 CFR 164.308(a)(1)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308" },
          "). Comprehensive didn't have one. In April 2025 it agreed to pay $25,000 and to operate under a corrective action plan monitored by OCR for two years.",
        ],
      },
      {
        type: "p",
        runs: [
          "The dollar figure is small by enforcement standards. The lesson is not. OCR did not penalize the practice for being attacked; ", { text: "ransomware hits well-run organizations", href: "/articles/dental-hipaa-breach-and-enforcement-report" }, " too. It acted because, when investigators asked the practice to show how it had assessed its own risks, there was nothing to show.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-comprehensive-neurology-risk-analysis.webp",
        alt: "Highlighted excerpts from the OCR settlement with Comprehensive Neurology, PC, a small New York neurology practice that failed to conduct an accurate and thorough risk analysis and paid $25,000.",
        width: 1500,
        height: 562,
        caption: [
          "Excerpts from the OCR settlement, highlighted. Source: ",
          { text: "U.S. Department of Health and Human Services, April 25, 2025", href: "https://www.hhs.gov/press-room/ocr-hipaa-racap-np.html" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "The fine is rarely the worst part. A ransomware attack can freeze your scheduling, billing, and imaging for days, and a breach notice arriving in your patients' mailboxes can cost trust that took years to build. Those losses are harder to measure than a settlement, and they are why the response you run in the first week matters as much as any check you might eventually write.",
        ],
      },
      {
        type: "p",
        runs: [
          "The hard part of a breach isn't fixing the gaps. It's knowing which ones you have before OCR does. The HIPAA Risk Scorecard checks the areas OCR most commonly cites, then gives you a short risk review and an intro to a specialist. It takes about 3 minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What OCR looks for after a breach" },
      {
        type: "p",
        runs: [
          "A breach report triggers a review of your entire security program, not just the incident. Drawing on its own guidance from the Comprehensive case, OCR expects a practice to produce a current risk analysis showing where electronic patient data enters, moves through, and leaves its systems, alongside a risk management plan that actually closes the gaps that analysis found. It looks for audit controls that record and let you review system activity, encryption of patient data in transit and at rest where appropriate, workforce training built around your practice and each person's real job, and evidence that you fed the lessons from any incident back into how you work.",
        ],
      },
      {
        type: "p",
        runs: [
          "None of this is about the attack itself. It is about whether you ran a real compliance program before it happened. That is the gap between owning a free risk-assessment template and having something that would hold up under an OCR review.",
        ],
      },
      {
        type: "p",
        runs: [
          "A free self-assessment tool will get you started. It won't tell you whether your program would survive a breach report landing on a regulator's desk tomorrow. If you want a clear read on where your practice actually stands, ",
          { text: "start with the Scorecard", href: "/scorecard" },
          ".",
        ],
      },
      { type: "h2", text: "How to make sure you never read this in a panic" },
      {
        type: "p",
        runs: [
          "Breach response is the expensive end of HIPAA. ",
          { text: "The cheap end is prevention", href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice" },
          ", and it begins with the same document OCR asked Comprehensive for. We break down ",
          { text: "what a dental HIPAA risk assessment costs", href: "/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice" },
          " separately. If you are reading this before anything has gone wrong, this is where your attention pays off most. A handful of moves cover most of the risk for a small dental practice:",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "Run a real risk analysis, then fix what it finds." }, " This is the single most-cited failure in OCR settlements. We break down what one involves in ", { text: "our guide to HIPAA risk assessments for dental practices", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" }, "."],
          [{ strong: "Encrypt laptops, backups, and any device that touches patient data," }, " so a lost or stolen device falls under the safe harbor."],
          [{ strong: "Sign a " }, { text: "business associate agreement", href: "/articles/does-my-dental-practice-need-a-baa" }, { strong: " with every vendor that handles patient data," }, " and require fast breach reporting inside it."],
          [{ strong: "Train your team on phishing and basic security," }, " since most breaches start with a click."],
          [{ strong: "Put the free-AI line in writing," }, " so patient details never land in a public chatbot. ", { text: "The staff AI-use policy a small practice needs", href: "/articles/staff-free-ai-tools-patient-data-dental-policy" }, " takes one page."],
          [{ strong: "Keep tested, offline backups," }, " so ransomware can't take your records hostage."],
        ],
      },
      {
        type: "p",
        runs: [
          "If a colleague's breach is what brought you here, the honest next step is to find out whether your own practice would hold up, which is exactly what ",
          { text: "the Scorecard", href: "/scorecard" },
          " is built to show you before a regulator ever asks. And if you want to understand what a federal investigation involves before you ever face one, we walk through it in ",
          { text: "what happens when a dental practice fails a HIPAA audit", href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit" },
          ".",
        ],
      },
      { type: "h2", text: "The catch: where this gets complicated" },
      { type: "p", runs: ["A few things trip up small practices:"] },
      {
        type: "ul",
        items: [
          [{ strong: "Small breaches still require patient notice." }, " The under-500 rule changes only when you tell HHS, not whether you tell the people affected. They still get notified within 60 days."],
          [{ strong: "\"Discovery\" may be earlier than you think." }, " If a staff member noticed something odd weeks ago, your clock may have started then, not on the day you formally confirmed the breach."],
          [{ strong: "You carry the burden of proof." }, " If you decide an incident was not a reportable breach, you must document the risk assessment that justifies it (45 CFR 164.414). \"We assumed it was fine\" is not a defense."],
          [{ strong: "State law often adds rules." }, " Most states have their own breach-notification laws, some with shorter deadlines or different triggers than HIPAA. Check your state's requirements, or have someone check them for you."],
        ],
      },
      {
        type: "p",
        runs: [
          "This article is general information, not legal advice. Breach decisions depend on facts specific to your practice; confirm current requirements with the ",
          { text: "U.S. Department of Health and Human Services", href: "https://www.hhs.gov/hipaa/for-professionals/index.html" },
          " or qualified counsel before you act. The case and rules described here come from HHS and the ",
          { text: "Code of Federal Regulations", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-D" },
          ".",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, Resolution Agreement and press release, Comprehensive Neurology, PC (April 2025)."],
          ["HHS Office for Civil Rights, Ransomware Fact Sheet."],
          ["45 CFR §§ 164.400-414, Breach Notification Rule (eCFR, current)."],
          ["45 CFR § 164.308(a)(1) (eCFR, current)."],
          ["FBI Internet Crime Complaint Center (ic3.gov)."],
        ],
      },
    ],
    faq: [
      { question: "How long do I have to report a HIPAA breach?", answer: "You must notify affected individuals without unreasonable delay and no later than 60 calendar days after you discover the breach (45 CFR 164.404). If 500 or more people are affected, you also notify HHS within that same 60 days. For breaches affecting fewer than 500 people, you keep an internal log and report it to HHS no later than 60 days after the end of the calendar year." },
      { question: "Do I have to report a breach if fewer than 500 patients were affected?", answer: "Yes. The size of the breach changes when you notify HHS, not whether you notify patients. Affected individuals still receive notice within 60 days. Breaches under 500 people are recorded in an internal log and submitted to HHS annually, by roughly March 1 of the following year (45 CFR 164.408)." },
      { question: "What if the data breach was my IT company's fault?", answer: "A business associate, such as your IT vendor or billing company, must notify you of a breach without unreasonable delay and no later than 60 days after they discover it (45 CFR 164.410). The legal responsibility to notify your patients still rests with your practice, which is why many practices require vendors by contract to report breaches within a few days." },
      { question: "Is a ransomware attack automatically a HIPAA breach?", answer: "Usually, but not always. When ransomware encrypts patient data, OCR's position is that a breach has occurred because the attacker acquired control of the data. HIPAA then presumes a reportable breach unless you can show, through a documented four-factor risk assessment, a low probability that the information was compromised (45 CFR 164.402). If the data was already encrypted to the HHS standard, the encryption safe harbor may apply." },
      { question: "Will OCR fine a small dental practice over a breach?", answer: "Small practices are investigated and do pay. In 2025, OCR settled with a small New York neurology practice for $25,000 after a ransomware breach, because the practice had never conducted a required risk analysis. OCR's focus after a breach is whether you ran a real security program, not whether you happened to be attacked." },
      { question: "Do I have to notify the media about a breach?", answer: "Only for larger breaches. If a breach affects more than 500 residents of a single state or jurisdiction, you must notify prominent media outlets serving that area within 60 days (45 CFR 164.406). Most small-practice breaches do not reach this threshold." },
      { question: "Do I have to report a breach to anyone besides HHS?", answer: "Possibly. Beyond notifying affected patients, HHS, and sometimes the media under HIPAA, reporting the attack to the FBI's Internet Crime Complaint Center at ic3.gov is voluntary but recommended. Many states also have their own breach-notification laws that can require notice to the state attorney general or other agencies, sometimes on a shorter timeline than HIPAA. Check your state's rules, or ask counsel." },
      { question: "What happens if I don't report a breach?", answer: "Failing to report a breach you were required to report can itself be treated as a violation, and HHS has indicated it can rise to the level of willful neglect, which carries higher mandatory penalties. The notification rules are not optional, and the burden is on you to document any decision that an incident was not reportable." },
      { question: "Should I pay the ransom in a ransomware attack?", answer: "This is a decision for counsel, your insurer, and law enforcement, not a quick call in the moment. Paying does not remove your duty to notify affected patients and HHS, and the FBI generally discourages payment because it funds further attacks and does not guarantee that you get your data back. This is general information, not legal advice." },
    ],
  },
  {
    slug: "how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice",
    status: "published",
    title: "How Much Does a HIPAA Risk Assessment Cost for a Dental Practice? (2026)",
    metaTitle: "HIPAA Risk Assessment Cost for Dentists (2026)",
    description:
      "A HIPAA risk assessment for a dental practice runs $1,500–$6,000 with a specialist; the free HHS tool is $0. What each path buys, and why cheap can cost more.",
    author: "Dolev Arama",
    datePublished: "2026-06-05",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "Ask three vendors what a HIPAA risk assessment costs and you will get three numbers, anywhere from $0 to $15,000. Each one can be defended, which is why the price tag means little until you separate what you are actually buying. For a solo dental office, the assessment itself is usually a few thousand dollars. The expensive mistake is treating the cheapest version as the whole job, then learning during an investigation that it was not.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "About $1,500 to $6,000 for a specialist-run analysis. " },
            "The ",
            { text: "free federal SRA tool", href: "https://healthit.gov/privacy-security/security-risk-assessment-tool/" },
            " is $0, and software platforms that include an assessment start in the low hundreds of dollars a year. These are 2026 market estimates; your number depends on how much you do in-house.",
          ],
          [
            { strong: "The free government tool is a starting point, not a finished analysis. " },
            "By its own disclaimer, using it does not guarantee compliance.",
          ],
          [
            { strong: "Skipping it is the expensive path. " },
            "One small imaging practice that never did one paid $5,000 to federal regulators, then had to complete the analysis anyway under two years of monitoring.",
          ],
          [
            { strong: "It is required by law right now. " },
            "A proposed 2026 overhaul would raise the bar and the price, but it is not final yet.",
          ],
          [
            { strong: "Not sure which gaps you would be paying to fix? " },
            "The Scorecard checks the areas OCR most commonly cites, in about three minutes. ",
            { text: "Check my practice \u2192", href: "/scorecard" },
          ],
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Short answer: " },
          "for a solo or small dental practice in 2026, a HIPAA risk analysis performed by a specialist typically runs about $1,500 to $6,000. The HHS Security Risk Assessment Tool is free. Software platforms that bundle an assessment start in the low hundreds of dollars a year. What you pay comes down to how complex your setup is and how much of the work you keep in-house.",
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains what a HIPAA risk assessment costs for a dental practice. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "What a risk assessment actually is under HIPAA" },
      {
        type: "p",
        runs: [
          "The HIPAA Security Rule requires every covered practice to run what the rule calls an \"accurate and thorough assessment\" of the risks to its electronic protected health information. That language is the law itself, at 45 CFR \u00a7 164.308(a)(1)(ii)(A). HHS calls it a risk analysis; vendors usually call it a risk assessment or a security risk assessment (SRA). Same obligation.",
        ],
      },
      {
        type: "p",
        runs: [
          "Two things matter for your budget. First, it is not optional and not tied to your size. When federal regulators settled with a single-location imaging provider in 2025, the official statement put it plainly: \"Small providers also must conduct accurate and thorough risk analyses.\" Second, the analysis is the foundation everything else sits on. Your access controls, staff training, backups, and breach plan all depend on first knowing where your patient data lives and what threatens it. Skip the analysis and the rest is guesswork.",
        ],
      },
      {
        type: "p",
        runs: [
          "That is also why \"do I even need one?\" has a one-word answer. If you are still asking it, start with ",
          { text: "whether a dental practice needs a HIPAA risk assessment", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" },
          ".",
        ],
      },
      { type: "h2", text: "The four ways to get one, and what each really costs" },
      {
        type: "p",
        runs: [
          "There is no single price because there is no single product. Here are the four paths a small practice actually chooses between, cheapest first.",
        ],
      },
      { type: "h3", text: "1. The free HHS SRA tool: $0" },
      {
        type: "p",
        runs: [
          { strong: "What it is. " },
          "A downloadable application from the federal government, currently version 3.6, about 166 questions, that walks you through the assessment and produces a report. It runs on your own computer, and the government never sees your answers.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Who it fits. " },
          "A very small, low-complexity practice with the time and discipline to work through it honestly.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Where it falls short. " },
          "The tool gives you a questionnaire and a report. It does not tell you how to fix what it finds. It does not monitor anything afterward, and it does not write your policies. The government says so itself: its disclaimer reads \"neither required by nor guarantees compliance.\"",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Verdict. " },
          "A real starting point, not a finish line. More on that gap below.",
        ],
      },
      { type: "h3", text: "2. A DIY spreadsheet or template: near $0" },
      {
        type: "p",
        runs: [
          { strong: "What it is. " },
          "A downloaded checklist or template you fill in yourself.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Who it fits. " },
          "Almost no one, honestly.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Where it falls short. " },
          "It lacks the structure, the documentation, and the year-over-year review that regulators expect. It also makes it easy to produce a \"checkbox\" analysis that looks finished but is not, which is exactly the kind of paper exercise OCR has repeatedly found inadequate.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Verdict. " },
          "The cheapest option on paper, and the most likely to fail you when it counts.",
        ],
      },
      { type: "h3", text: "3. A compliance platform or software: about $500 to $2,000+ a year (estimated)" },
      {
        type: "p",
        runs: [
          { strong: "What it is. " },
          "A paid service that runs the assessment and then adds policy templates, staff training, vendor tracking, and an audit trail you can show a regulator. Small-practice plans start in the low hundreds a year and climb with features.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Who it fits. " },
          "The practice that wants structure and ongoing documentation without consultant prices.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Where it falls short. " },
          "It still needs your honest input, and hands-on review of your physical setup, waiting room, front desk, paper records, varies by product.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Verdict. " },
          "Good value for most small practices that want to stay audit-ready, not just assessed once.",
        ],
      },
      { type: "h3", text: "4. A consultant or specialist: about $1,500 to $6,000 for the assessment (estimated)" },
      {
        type: "p",
        runs: [
          { strong: "What it is. " },
          "An expert who performs the analysis for you, often including an onsite look at your physical setup, a plan tailored to fix what they find, and documentation built to hold up under review. Hourly rates commonly run $150 to $300.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Who it fits. " },
          "Practices with real complexity, like several locations, an imaging-heavy setup, or a recent breach, plus anyone who wants a defensible, expert-reviewed analysis.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Where it falls short. " },
          "The cost and scheduling, plus some disruption to your day.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Verdict. " },
          "The strongest choice when the stakes or the complexity are high.",
        ],
      },
      {
        type: "p",
        runs: [
          { text: "A fuller first-year program", href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice" },
          ", meaning the assessment plus the work of fixing what it finds and setting up policies and training, commonly lands around $5,000 to $15,000 for a small practice (2026 estimates). The assessment is the first line item, not the whole bill.",
        ],
      },
      { type: "h2", text: "Risk assessment, gap analysis, vulnerability scan: which one are you buying?" },
      {
        type: "p",
        runs: [
          "Part of the reason quotes swing so widely is that practices are often pricing different services and assuming they are the same. Three terms get used interchangeably, and only one is the legal requirement.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Risk analysis (required). " },
            "The accurate, thorough assessment HIPAA actually mandates: where your patient data lives, what threatens it, how likely and how serious each risk is, and a plan to reduce it. This is the line item above.",
          ],
          [
            { strong: "Gap analysis (not required, still useful). " },
            "A higher-level check of whether your safeguards and policies exist, measured against a HIPAA checklist. A good starting point. On its own, it does not satisfy the risk-analysis requirement.",
          ],
          [
            { strong: "Vulnerability scan or penetration test (not required, sometimes wise). " },
            "Technical tests that probe your network for weak points. They produce useful evidence that can feed your risk analysis, but they are not the analysis itself, and they carry their own price, often $300 to $3,000 for a scan and more for a pen test.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "If a quote looks cheap, check what it actually covers. A questionnaire or a gap checklist by itself is not the risk analysis OCR looks for, and paying for the wrong one is how a practice ends up exposed while believing it is covered.",
        ],
      },
      { type: "h2", text: "Why the free tool is not the same as a finished risk analysis" },
      {
        type: "p",
        runs: [
          "This is the part that costs practices the most, so it is worth being precise.",
        ],
      },
      {
        type: "p",
        runs: [
          "Running the SRA tool feels like completing your risk analysis. It is not the same thing. The tool documents your answers to a set of questions. HIPAA asks for an accurate and thorough assessment plus a risk-management step, meaning you actually reduce the risks you found. A questionnaire with no remediation behind it, no follow-up, and no written policies is a starting point that regulators have, case after case, treated as not enough.",
        ],
      },
      {
        type: "p",
        runs: [
          "Put plainly: the tool can tell you that a laptop has no encryption. It cannot encrypt the laptop, write the policy that says you will, or prove a year later that you did. That work is the risk analysis OCR is actually looking for.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Most solo practices have two or three HIPAA gaps they cannot see. " },
          "The Scorecard checks the areas OCR most commonly cites, then sends you a short written review of your gaps and an intro to a specialist who can help you close them. About three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "The real cost of skipping it" },
      {
        type: "p",
        runs: [
          "The cleanest way to understand the price of a risk analysis is to look at what skipping one costs.",
        ],
      },
      {
        type: "p",
        runs: [
          "In May 2025, federal regulators settled with Vision Upright MRI, a single-location imaging provider in San Jose. An unauthorized party had reached the server holding its medical images, exposing the records of 21,778 people. When OCR investigated, it found the practice had never conducted a HIPAA risk analysis and had missed the 60-day deadline to notify the affected patients.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-vision-upright-mri-risk-analysis.webp",
        alt: "Exhibit from the HHS Office for Civil Rights press release on the Vision Upright MRI settlement: OCR found the single-location imaging provider had never conducted a HIPAA risk analysis, exposing 21,778 patients' records; it paid a $5,000 settlement and entered a two-year corrective action plan.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          {
            text: "Settlement with Vision Upright MRI (May 15, 2025)",
            href: "https://www.hhs.gov/press-room/hhs-hipaa-investigate-vum.html",
          },
          ". Highlights added by Hipsana: a single-location provider that never ran a risk analysis, the $5,000 settlement, and the two-year corrective action plan.",
        ],
      },
      {
        type: "p",
        runs: [
          "The settlement payment was $5,000. That is roughly what a paid assessment would have cost in the first place. But the money was the small part. The practice also signed a two-year corrective action plan that required it to do the risk analysis anyway, build a risk-management plan, write HIPAA policies, train its staff, and send every overdue breach notice, with federal regulators checking its progress the whole time.",
        ],
      },
      {
        type: "p",
        runs: [
          "So the \"save money by skipping it\" route cost about the same as the assessment in fines, plus all the work it had avoided, plus two years of oversight. Doing it up front is the cheaper option, not the more expensive one. For what an investigation looks like from the inside, see ",
          { text: "what happens when a dental practice fails a HIPAA audit", href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "Vision Upright MRI is not an outlier. In October 2024, OCR launched a Risk Analysis Initiative, an enforcement push aimed squarely at organizations that had not done an adequate analysis. Across 2025, the settlements ran from a few thousand dollars for small providers into the millions for large ones, and the deficiency cited again and again was the same: no accurate and thorough risk analysis. Size was not a defense.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Knowing your gaps before an investigator does is the cheapest insurance there is. " },
          "You can see where your practice stands in about three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What the proposed HIPAA changes could do to the price" },
      {
        type: "p",
        runs: [
          "One thing to watch before you budget. Everything above describes the law as it stands today. There is also a proposed overhaul of the Security Rule.",
        ],
      },
      {
        type: "p",
        runs: [
          "HHS published ",
          { text: "the proposal in the Federal Register", href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information" },
          " on January 6, 2025 (its rulemaking ID is RIN 0945-AA22). If finalized as written, it would turn several safeguards that are currently flexible into hard requirements, among them encryption of patient data, multi-factor authentication, routine vulnerability scanning, and penetration testing. That would raise compliance costs across the board. HHS's own analysis estimated the proposal would cost the healthcare industry roughly $9 billion in its first year, which is part of why more than 100 hospital and provider groups have asked the agency to withdraw it.",
        ],
      },
      {
        type: "p",
        runs: [
          "As of June 2026, the proposal is not final, and there is no confirmed date for if or when it will be. Two practical takeaways. Do not spend money now trying to comply with a rule that has not been written. And know that a thorough annual risk analysis is your head start either way, because every version of HIPAA, current and proposed, is built on it.",
        ],
      },
      { type: "h2", text: "How to get a risk analysis done without overpaying" },
      {
        type: "p",
        runs: ["A sensible path for a solo or small practice:"],
      },
      {
        type: "steps",
        items: [
          {
            label: "Map where your patient data lives",
            detail:
              "About one to two hours. List every place ePHI is stored, sent, or received: practice-management software, email, imaging, backups, laptops, phones, plus any vendor that touches it. The analysis is only as good as this inventory.",
          },
          {
            label: "Pick your path by complexity",
            detail:
              "One location, a simple setup, and time to do it carefully? The free tool or a low-cost platform may be enough. Multiple locations, teledentistry, a recent scare, or no spare time? Use a specialist.",
          },
          {
            label: "Do the analysis",
            detail:
              "A day to a few weeks, depending on the path. Identify the real risks to that data, and how likely and how serious each one is.",
          },
          {
            label: "Build a risk-management plan",
            detail:
              "This is the step that actually protects you: decide what you will fix, in what order, by when. The analysis finds the gaps; this closes them.",
          },
          {
            label: "Document everything and set an annual review",
            detail:
              "Save the analysis, the plan, and a record of what you did. Repeat it every year and after any material change to your setup, like new software or a new location.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "If you remember one thing, make it this: pay for the version that produces a real, documented analysis and a plan to fix what it finds. That is what holds up later, regardless of which path you chose to get there.",
        ],
      },
      { type: "h2", text: "The catch" },
      {
        type: "p",
        runs: ["A few honest caveats."],
      },
      {
        type: "p",
        runs: [
          "A risk analysis is not a one-time purchase. HIPAA expects it to be ongoing, refreshed every year and after meaningful changes to your systems. The first assessment usually costs more than the annual update, so budget for both.",
        ],
      },
      {
        type: "p",
        runs: [
          "Cost climbs with complexity. What moves a dental practice's number: how many operatory and front-desk workstations you run, your practice-management system (Dentrix, Eaglesoft, Open Dental, or similar), digital imaging, cloud versus on-premise servers, the number of locations, teledentistry, and whether you have a prior assessment to build on. A breach already on the books pushes you toward a specialist and a higher number. So does adding AI: every scribe or chatbot is one more system in scope, and ",
          {
            text: "whether ChatGPT is HIPAA compliant for a dental practice",
            href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
          },
          " is worth settling before you buy; the same goes for ",
          {
            text: "the BAA an AI scribe needs before it hears a patient",
            href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
          },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "And the cheapest route is only cheap if it produces a real analysis. A bargain assessment that turns out to be a checkbox exercise becomes the most expensive option of all if regulators come knocking, as the cases above show. If the worst has already happened, here is ",
          { text: "what to do after a dental data breach", href: "/articles/dental-data-breach-response" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "This article is general information, not legal advice. What a risk assessment costs is a market estimate, not a fixed quote; confirm current requirements with the ",
          { text: "U.S. Department of Health and Human Services", href: "https://www.hhs.gov/hipaa/for-professionals/index.html" },
          " or qualified counsel before you act. The risk-analysis requirement is at ",
          { text: "45 CFR 164.308(a)(1)(ii)(A)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308" },
          ", and the case described comes from HHS.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, settlement with Vision Upright MRI (May 2025)."],
          ["HHS Office for Civil Rights, Risk Analysis Initiative (announced October 2024)."],
          ["HHS, Security Risk Assessment (SRA) Tool (HealthIT.gov), version 3.6."],
          ["45 CFR § 164.308(a)(1)(ii)(A) (eCFR, current)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
        ],
      },
    ],
    faq: [
      { question: "Is the free HHS SRA tool enough for a dental practice?", answer: "It is a legitimate place to start, and for a very small, simple practice it can carry a lot of the assessment. But by its own disclaimer it does not guarantee compliance, and it stops at a report. The risk-management work that follows, the part where you fix what you found and document it, is what regulators actually weigh, and the tool does not do that for you." },
      { question: "How much does a HIPAA risk assessment cost for a solo dentist?", answer: "As a 2026 estimate: about $1,500 to $6,000 for a specialist-led assessment, $0 for the federal tool, and low hundreds of dollars a year for a software platform that includes one. A full first-year compliance program, with remediation, policies, training, and safeguards on top of the assessment, commonly runs $5,000 to $15,000." },
      { question: "How often does a dental practice need a risk analysis?", answer: "At least once a year, and again after any material change such as new software, a new location, or a breach. HIPAA treats it as an ongoing process, not a one-time event." },
      { question: "Does a small practice really need one?", answer: "Yes. The requirement does not scale with size, and federal regulators have settled with single-location providers specifically to make that point. A small practice with patient data carries the same core obligation as a hospital." },
      { question: "Who can perform a HIPAA risk assessment, and can I do it myself?", answer: "You can do it yourself. HIPAA does not require an outside firm, and the free federal tool exists for exactly that. What matters is that the analysis is accurate, thorough, documented, and followed by a plan to fix what it finds. Many small practices run the assessment in-house and bring in help only for the parts they cannot judge alone, such as technical testing or a recent breach. If you want a quick read on which gaps you would be doing it for, the Scorecard shows you in about three minutes." },
      { question: "How long does a HIPAA risk assessment take?", answer: "Anywhere from an afternoon with the free tool for a simple solo practice to a few weeks for a consultant-led review with an onsite visit and a written plan. The larger time cost is usually fixing what the analysis turns up, not running the analysis." },
      { question: "Does the Hipsana Scorecard replace a risk analysis?", answer: "No, and we would not claim it does. The Scorecard is a fast self-check of the gaps OCR most commonly cites. A formal risk analysis is the documented, thorough assessment the law requires. The Scorecard shows you where you likely stand so you can decide what to do next, including a short free review and an intro to a specialist." },
    ],
  },
  {
    slug: "is-chatgpt-hipaa-compliant-dental-practice",
    status: "published",
    title: "Is ChatGPT HIPAA Compliant for a Dental Practice? (2026)",
    metaTitle: "Is ChatGPT HIPAA Compliant for Dentists? (2026)",
    description:
      "ChatGPT's everyday plans are not HIPAA compliant, by OpenAI's own terms. Which AI tools will sign a BAA for a dental practice, and what OCR most commonly cites.",
    author: "Dolev Arama",
    datePublished: "2026-06-11",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "Mostly no. ChatGPT's Free, Plus, Pro, Team, and self-serve Business plans are not HIPAA compliant for patient information: OpenAI offers no Business Associate Agreement for them, and HIPAA bars giving patient data to a vendor without one (45 CFR \u00a7 164.502(e)). AI use in a dental practice gets onto defensible ground with a signed BAA and a risk analysis that lists the tool: the necessary foundation, not the finish line.",
        ],
      },
      {
        type: "p",
        runs: [
          "The question usually arrives the practical way: somewhere in the past month, there is a fair chance someone in your office pasted a patient email into ChatGPT to draft a reply. It is fast, it writes well, and it is free. That one paste is where most practices meet this question without realizing they asked it.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "That is OpenAI's own position, not a cautious reading of it. " },
            "The company ",
            {
              text: "does not offer a Business Associate Agreement",
              href: "https://help.openai.com/en/articles/8660679-how-can-i-get-a-business-associate-agreement-baa-with-openai",
            },
            " for any of those everyday plans, so patient information must never go into them, no matter which privacy settings are switched on.",
          ],
          [
            { strong: "HIPAA does not ban AI. " },
            "It treats an AI vendor the way it treats ", { text: "any vendor that touches patient data", href: "/articles/does-my-dental-practice-need-a-baa" }, ": as a business associate that needs a signed BAA before the first patient detail flows.",
          ],
          [
            { strong: "Two documents decide your exposure: " },
            "a BAA with the AI vendor, and a ",
            {
              text: "risk analysis",
              href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308",
            },
            " that lists the tool. The second one is the document OCR's current enforcement initiative is built around.",
          ],
          [
            { strong: "A \"HIPAA compliant\" badge is a claim, not a contract. " },
            "The badge says compliance is possible on the vendor's platform. The agreement with your practice's name on it is what counts in an investigation.",
          ],
          [
            { strong: "Not sure where your practice stands? " },
            "The Scorecard checks the areas OCR most commonly cites, in about three minutes. ",
            { text: "Check my practice \u2192", href: "/scorecard" },
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains whether ChatGPT is HIPAA compliant for a dental practice. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "Why every dental office is suddenly asking" },
      {
        type: "p",
        runs: [
          "AI arrived in dentistry from three directions at once: scribes that listen chairside and write the clinical note, imaging tools that flag findings on x-rays, and general chatbots the front desk quietly adopted for emails and insurance narratives. The federal government noticed. HHS issued a request for information on AI adoption in clinical care, and the American Dental Association ",
          {
            text: "answered in February 2026",
            href: "https://adanews.ada.org/ada-news/2026/february/ada-responds-to-hhs-request-for-information-on-ai-adoption-in-dentistry/",
          },
          ", noting that adoption decisions fall on practice owners precisely when, in its words, \"regulatory status is unclear,\" a burden it called heaviest for small offices.",
        ],
      },
      {
        type: "p",
        runs: [
          "Here is the part that cuts through the noise: there is no AI-specific HIPAA rule. The existing rules apply to AI software exactly as they apply to your practice management system or your cloud backup. That makes the answer to this article's question less about ChatGPT and more about two requirements that have existed for years.",
        ],
      },
      { type: "h2", text: "What HIPAA actually says when an AI tool touches patient data" },
      {
        type: "p",
        runs: [
          "First, the vendor question. Under HIPAA, any company that creates, receives, maintains, or transmits protected health information on your behalf is a business associate, and the rules require a signed Business Associate Agreement before that information reaches it (45 CFR \u00a7 160.103 and \u00a7 164.502(e)). ",
          {
            text: "An AI scribe that hears your exam-room conversation",
            href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
          },
          ", a chatbot that drafts replies to identifiable patient emails, an imaging model that reads a named x-ray: all of these sit squarely inside that definition. No BAA, no patient data. There is no volume exception, and no exception for having only done it once.",
        ],
      },
      {
        type: "p",
        runs: [
          "Second, the inventory question. The Security Rule requires an accurate and thorough ",
          {
            text: "risk analysis",
            href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308",
          },
          " covering every system that holds or moves electronic patient information (45 CFR \u00a7 164.308(a)(1)(ii)(A)). A new AI tool is a new system. If your last risk analysis predates your first AI tool, it no longer describes the practice you actually run. We covered ",
          {
            text: "whether a dental practice needs a risk assessment at all",
            href: "/articles/do-dental-practices-need-hipaa-risk-assessment",
          },
          " separately; the short answer is yes, and AI only raises the stakes.",
        ],
      },
      {
        type: "p",
        runs: [
          "There is a third path the vendors like to mention: de-identified data is not protected health information, so HIPAA does not restrict it. True, and narrower than it sounds. The de-identification standard (45 CFR \u00a7 164.514) requires stripping 18 categories of identifiers, including most dates and contact details, or a formal expert determination. Deleting a name from a note whose story still identifies the patient does not qualify.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h2", text: "Is ChatGPT itself HIPAA compliant?" },
      {
        type: "p",
        runs: [
          "Not by default, and for the versions a solo practice would realistically sign up for, not at all. OpenAI's own terms draw the lines:",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Free, Plus, Pro, Team, and self-serve Business: no. " },
            "OpenAI states it does not offer a BAA for these plans. Typing patient information into them is an impermissible disclosure the moment you hit enter, whether or not anything ever leaks. Privacy toggles like turning off training do not change that legal fact.",
          ],
          [
            { strong: "ChatGPT Enterprise and Edu: possible, with conditions. " },
            "A BAA is available only to sales-managed accounts, arranged through OpenAI's sales team. This is corporate procurement, not a settings page.",
          ],
          [
            { strong: "ChatGPT for Healthcare and the API: yes, for eligible customers. " },
            "OpenAI now offers a dedicated healthcare product with a BAA and a stated commitment that customer content is not used to train models, and it signs BAAs case by case for zero-data-retention API endpoints. Both are aimed at organizations with technical staff.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "What the free version is still good for, with zero patient information in it: blank consent templates, job postings, a recall letter with placeholder fields, supplier emails. The line is identifiability, and one pasted patient message crosses it. If your team uses public AI at all, that line belongs in writing and in training, because a staff member who crosses it creates the practice's violation, not a personal one. What that written rule needs to say, and how to put it in force in a small office, is covered in ",
          {
            text: "the staff AI-use policy a dental practice needs",
            href: "/articles/staff-free-ai-tools-patient-data-dental-policy",
          },
          ".",
        ],
      },
      { type: "h2", text: "Which AI tools will sign a BAA, and which will not" },
      {
        type: "p",
        runs: [
          "Current as of June 2026, taken from each vendor's published terms rather than from reputation. These pages change; confirm the live text before you rely on a row.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "OpenAI: " },
            "BAA available for the API (zero-data-retention endpoints, approved case by case) and for sales-managed ChatGPT Enterprise, Edu, and ChatGPT for Healthcare. ",
            {
              text: "Explicitly unavailable",
              href: "https://help.openai.com/en/articles/8660679-how-can-i-get-a-business-associate-agreement-baa-with-openai",
            },
            " for Free, Plus, Pro, Team, and self-serve Business.",
          ],
          [
            { strong: "Google: " },
            "the Workspace BAA is accepted electronically in the ",
            { text: "Admin console", href: "https://support.google.com/a/answer/3407054" },
            "; Google's ",
            {
              text: "covered-functionality list",
              href: "https://workspace.google.com/terms/2015/1/hipaa_functionality/",
            },
            " (updated May 14, 2026) includes Gemini in Workspace and the Gemini app, and excludes Gemini in Chrome and all third-party add-ons. Consumer Gemini on a personal account carries no BAA.",
          ],
          [
            { strong: "Microsoft: " },
            "commercial Microsoft 365 customers get the HIPAA BAA by default through Microsoft's Data Protection Addendum, and Microsoft lists Microsoft 365 Copilot among the in-scope services. Copilot inside the consumer and Family plans is a consumer product with no BAA.",
          ],
          [
            { strong: "Dental AI vendors (scribes, imaging, front-desk tools): " },
            "most advertise HIPAA compliance and BAA availability. Treat those as vendor statements. The test is whether they will execute a BAA naming your practice and put their data-retention and model-training terms in writing before the first patient is recorded.",
          ],
        ],
      },
      { type: "h2", text: "AI scribes and the operatory microphone" },
      {
        type: "p",
        runs: [
          "Scribes deserve their own section because they do something no other office tool does: they record patient conversations, which means they create protected health information at the source, in audio. Three questions decide whether that is safe. Where do the recordings and transcripts live, and for how long? Is the audio used to train the vendor's models? And does the patient know a system is listening? Recording-consent rules also exist in state law, separate from HIPAA, and they vary; this is general information, not legal advice.",
        ],
      },
      {
        type: "p",
        runs: [
          "Before any scribe goes live, get four things from the vendor in writing: a BAA naming your practice, the retention period for audio and transcripts, a model-training commitment, and the procedure for exporting or deleting your data if you leave. A vendor that hesitates on any of the four has answered the real question.",
        ],
      },
      { type: "h2", text: "What enforcement looks like when a dental vendor fails: MMG Fusion" },
      {
        type: "p",
        runs: [
          "On March 5, 2026, OCR ",
          {
            text: "announced a settlement",
            href: "https://www.hhs.gov/press-room/ocr-mmg-fusion-hipaa-agreement.html",
          },
          " with MMG Fusion, LLC, a Maryland company whose software handled patient communication and marketing for dental practices, which made it a business associate to the dentists who used it. In December 2020 an intruder got into MMG's systems and reached the information of roughly 15 million people: names, phone numbers, mailing and email addresses, birth dates, and the dates and times of appointments. The data surfaced on the dark web. OCR learned of it only from a complaint in 2023, because MMG had never notified the practices it served. OCR's investigation also concluded MMG had not conducted an accurate and thorough risk analysis. MMG resolved the matter by settlement, without admitting liability.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-mmg-fusion-risk-analysis.webp",
        alt: "Exhibit from the HHS Office for Civil Rights press release on the MMG Fusion settlement: OCR's investigation concluded the Maryland dental software vendor, a business associate to dental practices, had not conducted an accurate and thorough HIPAA risk analysis and had not notified the practices of a December 2020 breach that exposed about 15 million people's information; MMG resolved the matter by settlement, paying $10,000 and entering a three-year corrective action plan.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          {
            text: "Settlement with MMG Fusion, LLC (March 5, 2026)",
            href: "https://www.hhs.gov/press-room/ocr-mmg-fusion-hipaa-agreement.html",
          },
          ". Highlights added by Hipsana: a dental software vendor with no compliant risk analysis, the $10,000 settlement, the three-year corrective action plan, and roughly 15 million people exposed.",
        ],
      },
      {
        type: "p",
        runs: [
          "Two lessons sit in that exhibit. The settlement was $10,000 against the information of roughly 15 million people because OCR weighed the company's financial condition; MMG was effectively gone. The dentists were not. Their patients' data had been exposed for years while the practices, the covered entities in the chain, knew nothing. A vendor's collapse does not transfer the relationship with your patients anywhere; it lands back on you. And the case was the twelfth enforcement action in OCR's Risk Analysis Initiative, the same document-first pattern we described in ",
          {
            text: "what happens when a dental practice fails a HIPAA audit",
            href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit",
          },
          ": the investigation opens with a request for the risk analysis, and the absence of one is the finding.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "An AI tool you adopted this year is exactly the kind of system OCR expects to find listed in that document, and a vendor's badge will not stand in for it. " },
          "Most independent practices carry gaps they cannot see from the inside. The Scorecard checks the areas OCR most commonly cites, then offers a short free risk review and, if you want one, an intro to a specialist. Takes about three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "If patient information already went into a public AI tool" },
      {
        type: "p",
        runs: [
          "This happens in ordinary, well-run offices, usually at the front desk, and panic is the wrong response. Documented action is the right one. Stop using that channel for patient content. Write down what was entered and when, and which account was used. Then run a breach risk assessment: the structured, written evaluation of how probable it is the information was compromised. Some incidents end there, documented as low probability. Others start notification clocks. The full sequence, including the deadlines, is in ",
          {
            text: "what to do after a dental data breach",
            href: "/articles/dental-data-breach-response",
          },
          ". The one unacceptable response is the undocumented shrug, because that is the line investigators quote later.",
        ],
      },
      { type: "h2", text: "How to bring AI into the practice without creating a HIPAA problem" },
      {
        type: "steps",
        items: [
          {
            label: "Inventory what is already in use",
            detail:
              "Ask every team member which AI tools they have touched for work in the past month, on any device, personal phones included. No blame attached; you are mapping, not policing. About 30 minutes at a staff meeting.",
          },
          {
            label: "Sort every tool into one of three buckets",
            detail:
              "Never touches patient information: keep. Touches it under a signed BAA: keep, with the paperwork checked. Touches it with no BAA: stops today. The vendor list above does most of the sorting.",
          },
          {
            label: "Collect the paperwork for the keepers",
            detail:
              "Get the BAA naming your practice, then the vendor's written answers on retention and model training, then the export-or-delete procedure. An afternoon of email, and the vendors that handle it smoothly are telling you something too.",
          },
          {
            label: "Update your risk analysis",
            detail:
              "Add each approved tool as a system that creates or transmits patient information, note its risks, and record the safeguards you chose. If the analysis itself is missing or stale, that is the first repair, and it is the one OCR checks.",
          },
          {
            label: "Write the one-page AI rule and train on it",
            detail:
              "Which tools are approved, what may never be typed into a public chatbot, and who to tell when something slips. Ten minutes at a staff meeting beats a binder nobody opens, and the training itself is a HIPAA requirement you can document.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "If the fix list ends in hiring help, ",
          {
            text: "what a HIPAA risk assessment costs for a dental practice",
            href: "/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice",
          },
          " breaks down the market so you do not overpay.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Want the gaps mapped before you start? " },
          "The Scorecard surfaces them in about three minutes, and the free review walks through the result with you. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "The catch" },
      {
        type: "p",
        runs: [
          "A signed BAA is necessary and not sufficient. It makes the vendor legally accountable; it does not make their servers secure, and MMG Fusion is the proof that when a vendor fails, the patients and the notification duties are still yours. Treat vendor selection as a security control, not a signature to collect.",
        ],
      },
      {
        type: "p",
        runs: [
          "And the ground is still moving. A proposed overhaul of the ",
          {
            text: "HIPAA Security Rule",
            href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information",
          },
          " published in January 2025 would harden the technical requirements behind everything in this article. As of June 2026 it remains a proposal, not law, and OCR's AI-specific guidance is still developing. Write your AI policy against today's rules, date it, and expect to revisit it.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, settlement with MMG Fusion, LLC (March 5, 2026); 12th action in the Risk Analysis Initiative."],
          ["HHS Office for Civil Rights, Risk Analysis Initiative (announced October 2024)."],
          ["OpenAI, \"How can I get a Business Associate Agreement (BAA) with OpenAI?\" help article and business-data security page (accessed June 2026)."],
          ["Google Workspace Admin Help, \"HIPAA Compliance with Google Workspace and Cloud Identity,\" and the HIPAA Included Functionality list (as of May 14, 2026)."],
          ["Microsoft, HIPAA/HITECH documentation: the BAA via the Microsoft Products and Services Data Protection Addendum, with Microsoft 365 Copilot listed in scope (accessed June 2026)."],
          ["American Dental Association, response to the HHS request for information on AI adoption in clinical care (February 2026)."],
          ["45 CFR \u00a7 160.103; \u00a7 164.502(e); \u00a7 164.308(a)(1)(ii)(A); \u00a7 164.514 (eCFR, current)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
        ],
      },
    ],
    faq: [
      { question: "Can I use the free version of ChatGPT for anything in a dental office?", answer: "Yes, for work that contains no patient information: drafting a job posting, a blank consent template, a generic oral-hygiene handout, a supplier email. The line is patient information of any kind; even a name alone or a recognizable photo crosses it, and so does one pasted patient email." },
      { question: "Is ChatGPT Plus or Team HIPAA compliant if I turn off chat history and training?", answer: "No. Privacy toggles change what the vendor does with the data, not your legal position. Without a Business Associate Agreement, sending patient information to the service is an impermissible disclosure under HIPAA, and OpenAI states it does not offer a BAA for these plans." },
      { question: "Does removing the patient's name make the data safe to paste?", answer: "Usually not. HIPAA's de-identification standard requires removing 18 categories of identifiers, most dates and all contact details among them, or obtaining a formal expert determination. A note with the name deleted but the story intact is often still identifiable, and still protected health information." },
      { question: "Are AI scribes a HIPAA violation?", answer: "Not inherently. A scribe with a signed BAA, clear retention and model-training terms, patient awareness of the recording, and a line in your risk analysis can be used compliantly. The same scribe adopted on a free trial with none of that paperwork is an open liability." },
      { question: "Is there a HIPAA-compliant version of ChatGPT a small practice can actually get?", answer: "The compliant paths today are procurement products aimed at organizations with IT support: OpenAI's API, sales-managed Enterprise and Edu accounts, and ChatGPT for Healthcare. Most independent practices that want generative AI near patient data end up on a healthcare-specific tool that bundles the BAA, or they keep public AI strictly on the no-patient-data side of the line." },
      { question: "What should I do if a team member already put patient details into a public AI tool?", answer: "Stop using that channel for patient content. Note exactly what was entered and when. Then run a documented breach risk assessment to judge the probability the information was compromised. Some incidents are defensibly low risk; others start notification obligations. The worst response is an undocumented shrug, because that is the gap investigators later quote." },
      { question: "Does the Hipsana Scorecard check AI risks?", answer: "It checks the foundations those risks land on: whether you have a current risk analysis, signed BAAs, staff training, and the other items OCR most commonly cites. AI tools enter your practice through exactly those doors. The Scorecard takes about three minutes, and the free review that follows can flag where an AI tool you use still needs paperwork." },
    ],
  },
  {
    slug: "are-ai-scribes-hipaa-compliant-dental-practice",
    status: "published",
    title: "Are AI Scribes HIPAA Compliant for a Dental Practice? (2026)",
    metaTitle: "Are AI Scribes HIPAA Compliant for Dentists (2026)",
    description:
      "AI scribes are HIPAA compliant only when the vendor signs a BAA and your risk analysis lists the tool. The five-question test to run before you sign up.",
    author: "Dolev Arama",
    datePublished: "2026-06-12",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "Sometimes, and never by default. An AI scribe is HIPAA compliant for a dental practice only when the vendor signs a Business Associate Agreement before patient data flows (45 CFR \u00a7 164.502(e)) and your risk analysis lists the tool. Some scribe vendors will sign one; consumer AI tools mostly will not. Five questions sort them.",
        ],
      },
      {
        type: "p",
        runs: [
          "The pitch has probably reached you already: an AI scribe listens to the exam-room conversation, writes the clinical note while you work, and gives you your evenings back. The demos are genuinely impressive. But the demo is not where compliance lives. Compliance lives in one contract the salesperson rarely opens first, and a small Illinois practice once paid $31,000 for not having it.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "It depends on the contract, not the technology. " },
            "HIPAA treats an AI scribe vendor like ", { text: "any other vendor that touches patient data", href: "/articles/does-my-dental-practice-need-a-baa" }, ": a business associate (45 CFR \u00a7 160.103) that needs a signed BAA before the first patient detail reaches it.",
          ],
          [
            { strong: "A scribe handles patient data by design. " },
            "It hears the patient's name, voice, and clinical story. There is no usage light enough to keep it outside HIPAA.",
          ],
          [
            { strong: "\"We never store your audio\" does not exempt the vendor. " },
            "Under ",
            {
              text: "OCR's cloud guidance",
              href: "https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html",
            },
            ", a service that receives or maintains patient data is a business associate even if it cannot view a word of it.",
          ],
          [
            { strong: "A missing BAA alone has cost a small practice $31,000. " },
            "The Center for Children's Digestive Health paid exactly that in 2017, for exactly one cited failure: no signed agreement with a records vendor.",
          ],
          [
            { strong: "Five written questions sort any AI vendor. " },
            "The BAA test below takes one email, and the vendor's answers tell you whether the tool can be used legally in your operatory.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains whether AI scribes are HIPAA compliant for a dental practice. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "What does an AI scribe actually do with patient data?" },
      {
        type: "p",
        runs: [
          "An ambient AI scribe records the visit through a phone or an operatory microphone, then turns the transcript into a draft clinical note. Vendors market the same product as ambient AI or AI note-taking. Close cousins are arriving through the same dental AI sales channels: AI phone agents that answer patient calls, voice-driven perio charting, and models that read x-rays. Different products, identical legal posture.",
        ],
      },
      {
        type: "p",
        runs: [
          "HIPAA's trigger phrase is \"creates, receives, maintains, or transmits\" protected health information on a practice's behalf. Any company doing that for you is a ",
          {
            text: "business associate",
            href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html",
          },
          " under 45 CFR \u00a7 160.103, and the rule has required a signed agreement with every business associate since long before anyone said \"large language model.\" A scribe does all four verbs at once, with the richest data a practice produces: the patient's own spoken words.",
        ],
      },
      {
        type: "p",
        runs: [
          "This is a different question from the one we answered about consumer chatbots. ",
          {
            text: "Whether ChatGPT is HIPAA compliant in a dental practice",
            href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
          },
          " turns on staff pasting patient details into a tool that was never meant to hold them. A scribe is the opposite case: a tool built to take patient data, where the only open question is whether the legal plumbing was installed before the data started flowing.",
        ],
      },
      { type: "h2", text: "The $31,000 lesson: a missing BAA was the entire case" },
      {
        type: "p",
        runs: [
          "In 2017, the Center for Children's Digestive Health, a small pediatric subspecialty group running seven clinics in Illinois, paid ",
          {
            text: "$31,000 to settle a HIPAA Privacy Rule investigation",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/ccdh/index.html",
          },
          ". There was no hack and no headline breach. OCR opened its file on CCDH while investigating FileFax, a records-storage vendor, and looked for the one document that should have existed: a signed Business Associate Agreement covering the patient records CCDH had been handing to FileFax since 2003. Neither side could produce one.",
        ],
      },
      {
        type: "p",
        runs: [
          "HHS did not bury the lesson; it titled the announcement \"No Business Associate Agreement? $31K Mistake.\" And the story did not end with the practice. FileFax itself ",
          {
            text: "later agreed to pay $100,000 to settle separate potential Privacy Rule violations",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/filefax/index.html",
          },
          " over its own mishandling of patient records, a settlement its court-appointed receiver entered after the company had already dissolved, with no admission of liability. One vendor relationship, and OCR reached both ends of it.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-ccdh-business-associate.webp",
        alt: "Excerpts from the U.S. HHS Office for Civil Rights announcement of the $31,000 Center for Children's Digestive Health settlement, highlighting that the practice was small and that neither party could produce a signed Business Associate Agreement.",
        width: 1500,
        height: 760,
        caption: [
          "A missing vendor contract as the entire case: CCDH paid $31,000 after OCR found no signed BAA behind twelve years of record-sharing. Source: ",
          {
            text: "HHS / OCR, April 20, 2017",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/ccdh/index.html",
          },
          ". Highlights added by Hipsana.",
        ],
      },
      {
        type: "p",
        runs: [
          "OCR has not announced an enforcement action involving an AI scribe; its published settlement list contains none as of this writing. Read that as a countdown rather than a comfort. The agency needs no AI precedent, because the failure an unvetted scribe invites is the one OCR has acted on again and again: patient data in a vendor's hands with no BAA behind it. CCDH's vendor held paper charts in storage. A scribe vendor holds a recording of everything said in your operatory. Same rule, richer data.",
        ],
      },
      {
        type: "p",
        runs: [
          "A vendor contract you cannot produce is the kind of gap a practice never notices until someone asks. ",
          {
            strong: "The free HIPAA Risk Scorecard checks the areas OCR most commonly cites, missing BAAs included, then sends a short written review of your top gaps and an intro to a specialist if you want one. About three minutes. ",
          },
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "The BAA test: five questions to send any AI scribe vendor" },
      {
        type: "p",
        runs: [
          "Send these in writing before any pilot begins, and keep the replies with the contract. A vendor that lives comfortably with HIPAA answers all five inside a day. Evasion on any one of them is itself an answer.",
        ],
      },
      { type: "h3", text: "1. Will you sign a BAA for the exact plan I'm buying?" },
      {
        type: "p",
        runs: [
          "Vendors often advertise \"HIPAA compliant\" across the whole product while the BAA exists only on a higher tier or a sales-managed account. The question is not whether a BAA exists somewhere in the catalog; it is whether one covers your subscription, signed before patient data flows, trial included. There is also no such thing as a government HIPAA certification, so a badge on the website is a marketing claim, not a contract. What a real agreement contains is no mystery either: HHS publishes ",
          {
            text: "sample BAA provisions",
            href: "https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html",
          },
          " you can compare against. The red flag: \"the platform is fully compliant,\" with no paperwork attached.",
        ],
      },
      { type: "h3", text: "2. Where does the recording go, and what does the BAA say about keeping it?" },
      {
        type: "p",
        runs: [
          "The audio is protected health information from the moment of capture. Ask what is stored, where it lives, how long it is kept, and whether deletion timelines appear in the BAA rather than on a marketing page.",
        ],
      },
      {
        type: "p",
        runs: [
          "Some vendors answer that they never store recordings at all. That can be a genuinely good design choice, but it does not remove them from HIPAA. ",
          {
            text: "OCR's guidance on cloud services",
            href: "https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html",
          },
          " is explicit that a company receiving or maintaining patient data is a business associate even when it cannot view that data, and the narrow \"conduit\" exception covers pure transmission services like an internet provider, not a service that turns your audio into a note.",
        ],
      },
      { type: "h3", text: "3. Do you train your AI on my patients' data, and is the answer in the contract?" },
      {
        type: "p",
        runs: [
          "Using patient data to improve a model is a use of protected health information, and every use must be permitted by the BAA. A good answer excludes your patients' data from model training in writing, or limits training to data de-identified under the HIPAA standard (45 CFR \u00a7 164.514), which means stripping 18 categories of identifiers or obtaining a formal expert determination. \"We anonymize everything\" with no named method is the red flag here; deleting names from notes whose stories still identify the patient does not qualify.",
        ],
      },
      { type: "h3", text: "4. Who else touches the data, and are they under BAAs too?" },
      {
        type: "p",
        runs: [
          "Most scribes are assembled from other companies' parts: the underlying AI model from one company, transcription from another, hosting from a third. Each subcontractor that handles patient data must itself be bound by a business associate agreement, all the way down the chain. You do not need the vendor's supplier list published; you need written confirmation that the chain is covered. A vendor that cannot say whether its own model provider signed has answered the question.",
        ],
      },
      { type: "h3", text: "5. If you have a breach, what do I get, and when?" },
      {
        type: "p",
        runs: [
          "When a scribe vendor is breached, the legal cleanup lands on your desk, not theirs: the Breach Notification Rule (45 CFR \u00a7\u00a7 164.400-414) puts the duty to notify patients and HHS on the practice. So the BAA must obligate the vendor to report a breach of unsecured patient data to you, and the useful question is the number: in how many days, written where? \"That has never happened to us\" is not a notification clause. For what those first weeks actually involve, see ",
          {
            text: "what a dental data breach response looks like",
            href: "/articles/dental-data-breach-response",
          },
          ".",
        ],
      },
      { type: "h2", text: "Adding an AI scribe the compliant way" },
      {
        type: "steps",
        items: [
          {
            label: "Get the BAA signed before the pilot",
            detail:
              "If real patient conversations flow during a trial, the trial needs the BAA. A pilot is not a legal grace period, and the CCDH case shows that sharing records without the agreement is itself the violation.",
          },
          {
            label: "Run the five questions in writing",
            detail:
              "Email them and file the replies with the contract. Written vendor answers are what diligence looks like on paper if anyone ever asks.",
          },
          {
            label: "Add the tool to your risk analysis",
            detail:
              "A system that hears every visit changes your risk picture. Update the document and date the change, noting who can access recordings and transcripts.",
          },
          {
            label: "Set the operatory rules",
            detail:
              "Decide who may run the scribe and how patients are told, including what happens when a patient declines. Many states require consent from everyone being recorded, so check your state's recording-consent law first.",
          },
          {
            label: "Train the team on the line",
            detail:
              "The scribe becomes the approved channel for AI in the operatory. Patient details still never go into personal chatbot accounts, an easy place for patient data to slip out.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "Step three deserves its own emphasis. The Security Rule requires an accurate and thorough ",
          {
            text: "risk analysis",
            href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308",
          },
          " covering every system that touches electronic patient information (45 CFR \u00a7 164.308(a)(1)(ii)(A)), and that document is what OCR's current enforcement initiative is built around. If your last one predates your first AI tool, it describes a practice you no longer run. We covered ",
          {
            text: "what a compliant risk assessment involves",
            href: "/articles/do-dental-practices-need-hipaa-risk-assessment",
          },
          " separately.",
        ],
      },
      { type: "h2", text: "When an AI scribe is not the compliant choice" },
      {
        type: "p",
        runs: [
          "Walk away, or wait, in four situations. The vendor will not sign a BAA on the tier you can afford; there is no workaround, and no privacy toggle substitutes for the contract. The free or trial mode runs on the same consumer-grade systems as the free chatbots, with no BAA behind it. The vendor cannot answer the subcontractor question. Or your state's recording-consent rules cannot be met in your actual workflow.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "And the test travels. AI phone agents, voice charting, x-ray reading models, website chatbots that take patient messages: if a tool touches patient information in any of the four ways the rule names, it takes the same five questions before it sits in on a single visit. And the products are only half the answer: which staff may use which AI tools at all belongs in ",
          {
            text: "a written staff AI-use policy",
            href: "/articles/staff-free-ai-tools-patient-data-dental-policy",
          },
          ", which is its own guide.",
        ],
      },
      { type: "h2", text: "Does the proposed Security Rule update change the answer?" },
      {
        type: "p",
        runs: [
          "Not yet, and not in the direction vendors might hope. The overhaul ",
          {
            text: "proposed in January 2025",
            href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information",
          },
          " would harden the technical safeguards behind vendor relationships, but as of June 2026 no final rule has been issued and the current Security Rule remains the law. The BAA requirement in this article predates AI by two decades and applies either way. Run the test against today's rules and date the answers; revisit them when OCR finalizes.",
        ],
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        runs: [
          "An AI scribe can be used legally in a dental practice, and the practices that do it well share one habit: they treat the contract as part of the product. A signed BAA on the exact tier they bought and five written vendor answers on file, with the tool listed in a dated risk analysis. That is the core of the test, and it costs one email to start.",
        ],
      },
      {
        type: "p",
        runs: [
          "Not sure what your practice would show if someone asked tomorrow? ",
          {
            strong: "The free HIPAA Risk Scorecard asks ten yes/no questions about how your practice handles patient data, scores you out of 100, then sends a short written review of your top gaps and an introduction to a specialist if a referral makes sense. About three minutes. ",
          },
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
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, \"No Business Associate Agreement? $31K Mistake\": resolution agreement with the Center for Children's Digestive Health (April 20, 2017)."],
          ["HHS Office for Civil Rights, \"Consequences for HIPAA violations don't stop when a business closes\": Filefax, Inc. settlement (February 13, 2018)."],
          ["HHS Office for Civil Rights, Guidance on HIPAA & Cloud Computing (business associate status of no-view services; the conduit exception)."],
          ["HHS, Business Associate Contracts: sample business associate agreement provisions (current)."],
          ["45 CFR \u00a7 160.103; \u00a7 164.502(e); \u00a7 164.308(a)(1)(ii)(A); \u00a7 164.514; \u00a7\u00a7 164.400-414 (eCFR, current)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
        ],
      },
    ],
    faq: [
      {
        question: "Is there such a thing as a HIPAA-certified AI scribe?",
        answer:
          "No. Neither HHS nor OCR certifies any product as HIPAA compliant, so a certification badge is marketing shorthand at best. Compliance is a property of your arrangement with the vendor: a signed BAA on your plan, honest configuration, and a risk analysis that lists the tool.",
      },
      {
        question: "The vendor says it never stores recordings. Do I still need a BAA?",
        answer:
          "Yes. OCR's cloud-computing guidance states that a vendor receiving or maintaining patient data is a business associate even if it cannot view that data, and the narrow conduit exception covers pure transmission services like an internet provider, not a service that turns your audio into a clinical note.",
      },
      {
        question: "Do my patients have to consent before I use an AI scribe?",
        answer:
          "Tell them regardless; trust is cheaper to keep than to rebuild. HIPAA itself permits uses of patient information for treatment, but separate state recording-consent laws often require the consent of everyone being recorded, and those vary by state. Check yours before the first recorded visit. This is general information, not legal advice.",
      },
      {
        question: "We piloted a scribe for a month with no BAA. How bad is that?",
        answer:
          "Treat it as a real gap, not a footnote. Disclosing patient information to a vendor without a BAA is the exact failure behind the $31,000 CCDH settlement. Stop the data flow and either get the agreement signed or drop the tool. Then document what was shared and have the incident assessed rather than quietly filed away.",
      },
      {
        question: "How do I find out whether the scribe is my only gap?",
        answer:
          "A scribe contract is one line in a longer checklist. The free HIPAA Risk Scorecard asks ten yes/no questions about how your practice handles patient data, scores you out of 100, and ends with a short written review of your top gaps, plus an intro to a specialist if a referral makes sense.",
      },
    ],
  },
  {
    slug: "staff-free-ai-tools-patient-data-dental-policy",
    status: "published",
    title: "Staff Using Free AI Tools With Patient Data? The Policy Your Dental Practice Needs (2026)",
    metaTitle: "Staff Using Free AI Tools With Patient Data (2026)",
    description:
      "Free AI tools don't sign BAAs, so one pasted patient detail is an impermissible disclosure. The five-part AI use policy a dental practice needs.",
    author: "Dolev Arama",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    body: [
      {
        type: "p",
        runs: [
          "Almost certainly, and the fix is a one-page rule. Most free AI tools will not sign a Business Associate Agreement, so the moment a staff member pastes a patient's details into one, the practice has made an impermissible disclosure under 45 CFR \u00a7 164.502(a). HIPAA already requires the written policy, the training, and the sanctions that prevent it. Here is what that policy needs to say.",
        ],
      },
      {
        type: "p",
        runs: [
          "Picture the quiet version of a data breach. Your front-desk coordinator is behind on recall letters, so she pastes a list of patient names into a free chatbot and asks it to draft the wording. No hacker, no ransom note, nothing on the news. Under HIPAA, the upload itself is the disclosure: patient information just left your practice for a company that owes your patients nothing. In survey after survey, most healthcare workers admit to using exactly these tools for work.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [{ strong: "Your staff are probably already doing it. " }, "Netskope's healthcare threat report found 71% of healthcare workers still using personal AI accounts for work, and in a Black Book survey of U.S. health-system staff, 17% of the frontline workers who use generic AI tools said they sometimes or often include identifiable patient information."],
          [{ strong: "A free AI tool cannot legally hold patient data. " }, "OpenAI offers no Business Associate Agreement on ChatGPT's free or consumer paid tiers, and the same is true across consumer chatbots. No BAA means patient information may not go in at all (45 CFR \u00a7 164.502(e))."],
          [{ strong: "One paste is an impermissible disclosure. " }, "The Privacy Rule's baseline (45 CFR \u00a7 164.502(a)) is that patient information goes nowhere unless a rule permits it, and no rule permits a chatbot without an agreement. OCR settled with an Alabama dental practice for $62,500 over patient lists that went to outside parties, and cited the practice's missing written policies by section."],
          [{ strong: "HIPAA already requires the policy. " }, "Written policies and procedures (\u00a7 164.530(i)), workforce training (\u00a7 164.530(b)), and applied sanctions (\u00a7 164.530(e)) are standing obligations, not new AI red tape. The policy below simply points them at AI."],
          [{ strong: "Prohibition alone fails, so give a sanctioned lane. " }, "Staff reach for AI to save time. A policy that holds pairs the hard line on patient data with an approved way to keep the time savings without it."],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains the staff AI-use policy a dental practice needs. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "Why this lands on the owner's desk" },
      {
        type: "p",
        runs: [
          "Security teams call it shadow AI: staff using AI tools the practice never approved, usually with good intentions and on personal accounts. The numbers say it is the norm, not the exception. Netskope's research, reported in April 2026, found 71% of healthcare workers still using personal AI accounts for work, down from 87% a year earlier but nowhere near zero. A Black Book survey of 228 U.S. health-system employees found 58% of frontline staff using generic tools like ChatGPT, Gemini, or Copilot at least monthly, and 17% of those users admitting that identifiable patient information sometimes goes in. The warning is coming from inside dentistry too: dental IT providers now publish ",
          {
            text: "explicit alarms about staff feeding patient data to free AI tools",
            href: "https://opendental.blog/ai-threat-free-ai-tools-e-phi/",
          },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "Two facts turn that habit into the owner's problem. First, the violation belongs to the practice, not the employee: a covered entity must ensure compliance by its workforce (45 CFR \u00a7 164.306(a)(4)), so a well-meaning shortcut by your assistant is your disclosure. Second, there is no consumer tier to buy your way out with. OpenAI signs Business Associate Agreements only for sales-managed enterprise and education plans and qualifying API arrangements, never for the free, Plus, or Team tiers, so a staff member's paid personal ChatGPT login is the same consumer product with a credit card attached. ",
          {
            text: "Whether ChatGPT itself can ever be HIPAA compliant in a dental practice",
            href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
          },
          " is a question we took apart separately; this guide is about the people using it.",
        ],
      },
      { type: "h2", text: "What HIPAA already requires from a five-person office" },
      {
        type: "p",
        runs: [
          "None of the obligations below were written for AI. All of them were written for exactly this shape of problem: a workforce member, a shortcut, and patient data leaving the building.",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "A default of no. " }, "45 CFR \u00a7 164.502(a) sets the Privacy Rule's baseline: patient information is not used or disclosed unless a rule permits it. A chatbot with no BAA is not a permitted destination, full stop."],
          [{ strong: "Training, scaled to the job. " }, "\u00a7 164.530(b)(1) requires training every workforce member on your policies, as necessary and appropriate for their role. A documented ten-minute staff meeting on the AI line qualifies."],
          [{ strong: "Sanctions you actually apply. " }, "\u00a7 164.530(e)(1) requires appropriate sanctions against workforce members who break the rules, with each application documented. The Security Rule repeats the demand for electronic data at \u00a7 164.308(a)(1)(ii)(C)."],
          [{ strong: "The policies themselves, in writing. " }, "\u00a7 164.530(i) requires written policies and procedures, kept current. On the security side, \u00a7 164.308(a)(5)(i) adds a security awareness and training program for the whole workforce, management included."],
          [{ strong: "Someone whose job it is. " }, "\u00a7 164.530(a)(1) requires a designated privacy official. In a solo practice that is usually the owner or the office manager; the title matters less than the designation being written down."],
        ],
      },
      { type: "h2", text: "The $62,500 case where the missing policy was cited by name" },
      {
        type: "p",
        runs: [
          "In March 2022, OCR announced ",
          {
            text: "a $62,500 settlement with Northcutt Dental-Fairhope, LLC",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/northcutt/index.html",
          },
          ", a dental practice in small-town Alabama with about 17 employees. In 2017 the owner ran for state senate and handed his campaign manager an Excel spreadsheet with the names and addresses of thousands of patients; campaign letters went out addressed \"Dear Valued Patient.\" The next spring, a campaign email reached 5,385 patients, sent through the practice's own marketing vendor.",
        ],
      },
      {
        type: "p",
        runs: [
          "OCR's resolution agreement lists four findings, and the quiet two should worry a practice owner more than the loud two. The loud findings are the disclosures themselves, both cited under \u00a7 164.502(a). The quiet findings are the paperwork: the practice did not designate a privacy official until late 2017 (\u00a7 164.530(a)) and had no written policies and procedures at all until 2018 (\u00a7 164.530(i)). The missing documents carry their own section numbers in the federal record, right next to the disclosures.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-northcutt-dental-impermissible-disclosure.webp",
        alt: "Excerpts from the Covered Conduct section of the OCR resolution agreement with Northcutt Dental-Fairhope, LLC, highlighting the $62,500 resolution amount, two impermissible disclosures of patient information, the late designation of a privacy official, and the absence of written policies and procedures until 2018.",
        width: 1500,
        height: 962,
        caption: [
          "The findings that cost $62,500: two impermissible disclosures, no privacy official, and no written policies until 2018. Source: ",
          {
            text: "HHS / OCR Resolution Agreement, March 2022",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/northcutt/index.html",
          },
          ". Highlights added by Hipsana.",
        ],
      },
      {
        type: "p",
        runs: [
          "Northcutt was not an AI case, and it was not a rogue-employee case: the disclosure decision came from the owner himself. That is exactly why it matters here. OCR needed no hacker, no breach report, and no bad intent. It needed patient data going to an outside party no rule permitted, and a practice that could not produce the policy that should have stopped it. Finding B is the sharpest edge for the AI question: the marketing vendor was a company the practice already worked with, and the disclosure was still impermissible because it served purposes outside the service arrangement in place. Swap \"campaign emails through the marketing vendor\" for \"patient list into a free chatbot\" and the legal shape is identical: a familiar tool, fed patient data for a purpose no agreement covers.",
        ],
      },
      {
        type: "p",
        runs: [
          "The corrective action plan is the most useful page in the file, because it is OCR writing out the policy program it expects from a 17-person practice: written policies covering uses, disclosures, and training, submitted for federal approval; every workforce member documented as having read and understood them before touching patient data; new hires trained within 14 days; violations investigated, sanctioned, and reported. You can wait for OCR to install that machinery for you, at $62,500 plus two years of supervision, or you can build the one-page version yourself this month.",
        ],
      },
      {
        type: "p",
        runs: [
          "Most owners cannot say today which of those documents their practice could actually produce. ",
          {
            strong: "The free HIPAA Risk Scorecard checks the areas OCR most commonly cites, written policies and staff training included, then sends a short written review of your top gaps and an intro to a specialist if you want one. About three minutes. ",
          },
          {
            text: "Check my practice \u2192",
            href: "/scorecard",
          },
        ],
      },
      { type: "h2", text: "The five parts of a staff AI-use policy that holds" },
      { type: "h3", text: "1. The hard line: no patient information in any AI tool without a BAA" },
      {
        type: "p",
        runs: [
          "One sentence carries most of the weight: no patient information, in any form, goes into any AI tool unless the practice has a signed Business Associate Agreement covering that exact tool and has approved it in writing. Then define patient information the way staff actually meet it: names, photos, x-rays, chart notes, schedules, insurance details, voicemail transcripts, and any story specific enough to identify someone even with the name removed. Give the team a test they can remember: if you would not ",
          { text: "post it on the practice's public Facebook page", href: "/articles/hipaa-social-media-rules-dental-practice" },
          ", it does not go into a chatbot.",
        ],
      },
      {
        type: "p",
        runs: [
          "Spell out that the line covers personal devices and personal accounts. The disclosure happens where the data goes, not whose phone it left from, and the surveys above show personal accounts are precisely where the habit lives.",
        ],
      },
      { type: "h3", text: "2. The sanctioned lane: what staff may use, and for what" },
      {
        type: "p",
        runs: [
          "A policy that only says no will lose to the time pressure that sent staff to AI in the first place; the survey data shows people reach for these tools to work faster, not to misbehave. So give the lane. AI is fine for work with zero patient information in it: blank consent templates, job postings, a recall letter with placeholder fields, supplier emails, patient-education drafts about procedures in general. And if the practice adopts a tool that is allowed to touch patient data, name it in the policy as the approved channel. An ambient scribe with a signed BAA is the usual first case, and ",
          {
            text: "how to vet an AI scribe before it hears a patient",
            href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
          },
          " is its own five-question test.",
        ],
      },
      {
        type: "p",
        runs: [
          "One honest warning belongs in the policy text: \"I removed the name\" is not de-identification. HIPAA's standard (45 CFR \u00a7 164.514) requires stripping 18 categories of identifiers or a formal expert determination, and a detailed clinical story can identify a patient with no name attached. For day-to-day use, the workable rule is fictional placeholders, never lightly edited real cases.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h3", text: "3. Training that fits a staff meeting" },
      {
        type: "p",
        runs: [
          "\u00a7 164.530(b) does not demand a seminar. It demands that every workforce member is trained on your policies, appropriately for their role, and that you can prove it happened. Ten minutes at a staff meeting covers the AI rule: what counts as patient information, the no-BAA line, the approved lane, and who to tell when something slips. Have everyone sign a one-line acknowledgment with the date. New hires get the same ten minutes in their first week, before they touch patient data, which is exactly the sequencing OCR wrote into Northcutt's corrective action plan.",
        ],
      },
      { type: "h3", text: "4. Sanctions you can defend" },
      {
        type: "p",
        runs: [
          "The rule asks for appropriate sanctions, which means graduated and documented, not theatrical. A workable scale: a documented conversation for a first slip with no patient harm, a written warning plus retraining for a repeat, and termination on the table for knowing or repeated disclosure. Two things matter more than severity. The scale is written into the policy before anyone violates it, and every application is documented, because \u00a7 164.530(e)(2) requires the record. An owner who quietly forgives the first incident has, on paper, no sanctions program at all.",
        ],
      },
      { type: "h3", text: "5. The response path: what happens when someone slips anyway" },
      {
        type: "p",
        runs: [
          "Assume a slip. The policy's last section tells staff to report it the same day, with no punishment for the reporting itself, because silence is the expensive version. The practice then documents exactly what was entered and where, and runs a breach risk assessment to judge whether notification duties start. Some incidents are defensibly low risk; an identifiable patient record pasted into a tool that trains on its inputs usually is not. The mechanics of that assessment, and the 60-day notification clock behind it, are covered in ",
          {
            text: "what to do when a dental practice has a data breach",
            href: "/articles/dental-data-breach-response",
          },
          ".",
        ],
      },
      { type: "h2", text: "Put it in force this week" },
      {
        type: "steps",
        items: [
          {
            label: "Name the owner of the rule",
            detail:
              "Designate your privacy official in writing if you never have: the owner or office manager, one sentence, signed and dated. Northcutt's missing designation was a cited finding on its own. Ten minutes.",
          },
          {
            label: "Write the one-page policy",
            detail:
              "The five parts above, in your own plain language: the hard line, the approved lane, training, sanctions, and the report-it path. One page that gets read beats a binder that gets shelved. About an hour.",
          },
          {
            label: "Map what staff already use",
            detail:
              "Ask every team member which AI tools they have touched for work in the past month, personal phones included. No blame attached; you are finding out where patient data may already be going. Fifteen minutes at a staff meeting.",
          },
          {
            label: "Train and collect signatures",
            detail:
              "Walk the page at the same meeting, take the edge-case questions, and have everyone sign and date a one-line acknowledgment. That signature stack is your training documentation under \u00a7 164.530(b). Ten minutes.",
          },
          {
            label: "Date it into your risk analysis",
            detail:
              "Add staff AI use to your risk analysis as an identified risk, with the policy as the control, and date the update. If your last risk analysis predates ChatGPT, it describes a practice you no longer run.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "Step five is where the policy connects to the document OCR asks for first in nearly every investigation. ",
          {
            text: "What a compliant dental risk assessment involves",
            href: "/articles/do-dental-practices-need-hipaa-risk-assessment",
          },
          " is covered separately, and the short answer is that a one-page AI policy is one of the cheapest controls it will ever list.",
        ],
      },
      { type: "h2", text: "The catch" },
      {
        type: "p",
        runs: [
          "Three complications deserve a line in the policy or a note on your calendar.",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "AI is arriving inside tools you already trust. " }, "Practice-management systems, imaging software, and email platforms add AI features by quiet update. The policy line: a new AI feature inside an approved tool still needs a yes before patient data flows through it, because the BAA you signed may not cover the new processing."],
          [{ strong: "State law is adding its own layer. " }, "A growing number of states are legislating AI in healthcare separately from HIPAA. This article covers the federal floor; if your state has its own AI or privacy statute, the policy deserves a counsel check before you rely on it."],
          [{ strong: "The Security Rule overhaul is still pending. " }, "The update ", { text: "proposed in January 2025", href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information" }, " would tighten the technical side of everything here, but as of June 2026 no final rule has been issued and the current Security Rule remains the law. Write the policy against today's rules, date it, and revisit it when OCR finalizes."],
        ],
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        runs: [
          "Free AI in a dental practice is a people problem before it is a technology problem, and HIPAA solved the people problem decades ago: a written rule, ten minutes of documented training, sanctions with dates on them, and one person whose job it is. Northcutt Dental paid $62,500 in a case where the missing paperwork was cited by section right next to the disclosures. The one-page version costs you an afternoon, and it is the difference between an employee's mistake and a federal finding.",
        ],
      },
      {
        type: "p",
        runs: [
          "Not sure what your practice would show if someone asked tomorrow? ",
          {
            strong: "The free HIPAA Risk Scorecard asks ten yes/no questions about how your practice handles patient data, scores you out of 100, then sends a short written review of your top gaps and an introduction to a specialist if a referral makes sense. About three minutes. ",
          },
          {
            text: "Check my practice \u2192",
            href: "/scorecard",
          },
        ],
      },
      {
        type: "p",
        runs: [
          {
            strong: "This is general information, not legal advice. ",
          },
          "Hipsana is not a law firm, a compliance officer, or a healthcare provider. Verify current requirements with HHS or qualified counsel before acting.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, Resolution Agreement and Corrective Action Plan, Northcutt Dental-Fairhope, LLC, HHS Transaction No. 18-304734 (signed March 8, 2022; announced March 28, 2022)."],
          ["HHS Office for Civil Rights, \"Four HIPAA enforcement actions hold healthcare providers accountable with compliance\" (March 28, 2022)."],
          ["45 CFR \u00a7 164.502(a) and (e); \u00a7 164.514; \u00a7 164.530(a), (b), (e), (i); \u00a7 164.306(a)(4); \u00a7 164.308(a)(1)(ii)(C) and (a)(5)(i) (eCFR, current)."],
          ["OpenAI published documentation: Business Associate Agreements limited to sales-managed ChatGPT Enterprise and Edu plans and qualifying API arrangements; none offered on Free, Plus, or Team tiers (as referenced June 2026)."],
          ["Netskope Threat Labs healthcare findings, as reported by Medical Economics (April 2026): 71% of healthcare workers using personal AI accounts for work."],
          ["Black Book Market Research survey of 228 U.S. health-system employees (December 2025), as reported by Managed Healthcare Executive (June 2026): 58% of frontline staff use generic AI tools at least monthly; 17% of those users sometimes or often include identifiable patient information."],
          ["Reuben Kamp (Darkhorse Tech), \"AI Threat? Is Your Staff Using Free AI Tools With e-PHI?\", Open Dental Blog (February 2026)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
        ],
      },
    ],
    faq: [
      {
        question: "Can my staff use ChatGPT at all, or is it banned in a dental office?",
        answer:
          "They can use it for work that contains zero patient information: blank templates, job postings, generic patient-education drafts, supplier emails. HIPAA does not ban tools; it bans patient information going where no agreement protects it. The policy's job is to draw that line in writing and to name an approved alternative for work that does involve patient data.",
      },
      {
        question: "A staff member pays for ChatGPT Plus. Does a paid account make it compliant?",
        answer:
          "No. OpenAI offers a Business Associate Agreement only on sales-managed enterprise and education plans and qualifying API arrangements, not on the free, Plus, or Team tiers. A personal paid login is the same consumer product with a subscription attached, so patient information still may not go into it.",
      },
      {
        question: "Someone already pasted patient details into a free AI tool. Do I have to fire them?",
        answer:
          "Not necessarily, and a panic firing is the wrong first move. Apply the sanction your written policy sets for a first incident, document it, and run a breach risk assessment on what was disclosed, because notification duties may apply. If you have no written policy yet, that gap is the bigger finding. What an investigator wants to see is a documented, proportionate response, not a dramatic one.",
      },
      {
        question: "Does a verbal \"don't put patient stuff in ChatGPT\" count as a policy?",
        answer:
          "No. HIPAA requires policies and procedures in writing (45 CFR \u00a7 164.530(i)) and documented training on them (\u00a7 164.530(b)). The same instruction, written on one page and signed and dated by your team, is the difference between a rule and a rumor. Northcutt Dental's missing written policies were a federally cited finding in a $62,500 settlement.",
      },
      {
        question: "What if we only use AI with the patient names removed?",
        answer:
          "Removing a name is not de-identification under HIPAA. The standard at 45 CFR \u00a7 164.514 requires stripping 18 categories of identifiers or obtaining a formal expert determination, and a detailed clinical story can identify a patient by itself. For routine use, fictional placeholder details are the safe version; truly de-identified data is achievable, but it is a project, not a habit.",
      },
      {
        question: "How do I find out whether staff AI use is my only gap?",
        answer:
          "It almost never is; AI enters a practice through the same doors OCR checks, like training, written policies, and vendor agreements. The free HIPAA Risk Scorecard asks ten yes/no questions about how your practice handles patient data, scores you out of 100, and ends with a short written review of your top gaps, plus an intro to a specialist if a referral makes sense.",
      },
    ],
  },
  {
    slug: "does-my-dental-practice-need-a-baa",
    status: "published",
    title: "Does Your Dental Practice Need a BAA, and With Which Vendors? (2026)",
    metaTitle: "Does Your Dental Practice Need a BAA? (2026)",
    description:
      "Does your dental practice need a BAA? Yes, if a vendor handles patient data. Which vendors, how to get one, and what one missing agreement can cost.",
    author: "Dolev Arama",
    datePublished: "2026-06-17",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "A North Carolina clinic gave a vendor the X-ray films of 17,300 patients to recycle for the silver. No contract, just a phone call. That missing piece of paper cost it $750,000. The problem was not the recycling; it was handing patient records to a vendor without a business associate agreement (BAA), the contract HIPAA requires first. If a company creates, receives, stores, or transmits your patients' data, you need a signed BAA. Here is which vendors qualify, how to get one, and what skipping it costs.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "It depends on the vendor, and the list is longer than most practices think. " },
            "Any company that creates, receives, stores, or transmits patient data on your behalf is a business associate, and it needs a signed BAA before the first record reaches it (45 CFR \u00a7 160.103 and \u00a7 164.502(e)).",
          ],
          [
            { strong: "Your everyday software and service vendors usually qualify. " },
            "Practice-management and imaging software, the billing or claims clearinghouse, your IT or managed-services provider, cloud backup, and any email or file-sharing that carries patient data typically each need one.",
          ],
          [
            { strong: "\"They never look at the data\" is not an exemption. " },
            "Under ",
            {
              text: "OCR's cloud guidance",
              href: "https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html",
            },
            ", a vendor that stores or transmits your patient data is a business associate even if it cannot read a single record.",
          ],
          [
            { strong: "One missing BAA has cost a practice $750,000. " },
            "Raleigh Orthopaedic paid exactly that in 2016 for one cited failure: giving a vendor patient records with no agreement in place.",
          ],
          [
            { strong: "The fix is a signed agreement and a current list. " },
            "Inventory every vendor that touches patient data, get a BAA from each, and review the list when vendors change. The Scorecard checks whether you have one with every vendor that touches patient data.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains when a dental practice needs a Business Associate Agreement, and with which vendors. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "Before you go vendor by vendor, it helps to see where your practice actually stands. The free HIPAA Scorecard checks your BAAs and the other controls an auditor looks at first, then scores your practice out of 100. About three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What a BAA is, and what HIPAA actually requires" },
      {
        type: "p",
        runs: [
          "A business associate agreement, or BAA, is a written contract between your practice and any outside company that handles protected health information on your behalf. HIPAA calls that company a ",
          {
            text: "business associate",
            href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html",
          },
          " (45 CFR \u00a7 160.103). The rule is blunt about the order of operations: you may disclose patient data to a business associate only after it gives you satisfactory assurances, in writing, that it will protect the data (45 CFR \u00a7 164.502(e)).",
        ],
      },
      {
        type: "p",
        runs: [
          "The Security Rule says the same thing for electronic records, in its own words. A covered practice may let a vendor create, receive, maintain, or transmit electronic patient information only after obtaining written assurances that the vendor will safeguard it (45 CFR \u00a7 164.308(b)). Those assurances have required contents: the vendor must agree to follow the Security Rule, to report security incidents and breaches back to you, and to bind its own subcontractors to the same terms (45 CFR \u00a7 164.314(a)).",
        ],
      },
      {
        type: "quote",
        runs: [
          "Under HIPAA, you may hand patient data to an outside company only after it signs an agreement promising, in writing, to protect it. No agreement, no data.",
        ],
      },
      {
        type: "p",
        runs: [
          "That last line is not a slogan. It is the part Raleigh Orthopaedic missed, and it is the part a checklist alone will not catch.",
        ],
      },
      { type: "h2", text: "Which of your vendors need a BAA?" },
      {
        type: "p",
        runs: [
          "Start with one question for each vendor: does this company create, receive, store, or transmit our patients' information to do its job? If the answer is yes, it is almost certainly a business associate, and it needs a BAA. That phrase covers far more than the companies that obviously look at patient charts.",
        ],
      },
      {
        type: "p",
        runs: [
          "Industry compliance guides estimate that a typical dental office works with more business associates than most owners expect, often well into the double digits. Here is how the common dental-office vendors usually fall. Treat it as a starting map, not a substitute for checking each contract.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Practice-management and imaging software (PMS, EHR, the cloud platform behind your charts and x-rays): " },
            "Yes. It stores your entire patient database. Cloud-based vendors almost always have a BAA ready on request.",
          ],
          [
            { strong: "Billing service or claims clearinghouse: " },
            "Yes. It transmits claims containing patient data to payers on your behalf.",
          ],
          [
            { strong: "IT support or managed-services provider (MSP): " },
            "Almost always yes. If the company can reach the systems that hold patient data, even only to fix them, it is a business associate. It is one of the most commonly overlooked.",
          ],
          [
            { strong: "Cloud storage and backup: " },
            "Yes. A service that stores electronic patient data is a business associate even when the data is encrypted and the vendor never views it.",
          ],
          [
            { strong: "Email, secure messaging, and file-sharing: " },
            "It depends. If the service stores or routes patient data through its own systems, such as ", { text: "emailing an x-ray to a specialist", href: "/articles/is-email-hipaa-compliant-dental-practice" }, ", the provider needs a BAA. A pure transmission line, like your phone carrier or internet provider, does not.",
          ],
          [
            { strong: "Records, film, and hard-drive disposal (shredding and e-waste): " },
            "Yes, when the vendor handles media that still contains patient data. Raleigh's vendor was, in effect, a film-recycling service.",
          ],
          [
            { strong: "Answering service, virtual reception, and scheduling: " },
            "Yes, if the staff or software can see patient names, numbers, or appointment details.",
          ],
          [
            { strong: "AI tools (scribes, chatbots, imaging assistants): " },
            "Yes, on the same terms as any other vendor. Whether ",
            {
              text: "ChatGPT is HIPAA compliant in a dental practice",
              href: "/articles/is-chatgpt-hipaa-compliant-dental-practice",
            },
            ", and how to run ",
            {
              text: "the five-question BAA test on an AI scribe",
              href: "/articles/are-ai-scribes-hipaa-compliant-dental-practice",
            },
            ", are their own questions.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "The one real exception is narrow. A vendor that only carries data from one point to another without storing it, a true conduit such as the postal service or an internet provider, is not a business associate. OCR draws the line at whether the company maintains or can access the data, not at whether anyone there looks. That is why cloud storage and most email services are business associates and the phone company is not. When in doubt, treat the vendor as one and ask for the agreement. The opposite case also comes up: a few vendors that receive patient data will not sign a BAA at all, the way website analytics and advertising pixels such as Google Analytics and the Meta Pixel do, which is why ",
          {
            text: "website tracking pixels are their own HIPAA problem",
            href: "/articles/are-tracking-pixels-hipaa-compliant-dental-practice",
          },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "A few relationships do not need a BAA, and they trip people up. You do not sign one with another healthcare provider you share records with for a patient's treatment. That is why a dental lab you send impressions or images to for a case does not need one: under HIPAA's treatment exception, HHS and the ADA treat the lab as another health care provider, not your business associate. You also do not sign one with your own staff, who are workforce members rather than vendors. The treatment exception is narrow, though: if that lab or another provider does a non-treatment job for you, such as billing or records review, the BAA requirement comes back.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h2", text: "What one missing BAA can cost" },
      {
        type: "p",
        runs: [
          "The risk is ", { text: "not theoretical", href: "/articles/dental-hipaa-breach-and-enforcement-report" }, ", and it is not only historical. In 2025, an attacker reached the records of roughly 1.2 million patients at Absolute Dental, a Nevada dental group, through a single compromised account belonging to its outside IT vendor. The practice agreed to a ", { text: "$3.3 million class-action settlement", href: "/articles/dental-practice-cyber-insurance" }, ", entered without admitting wrongdoing and still pending a final approval hearing set for July 2026. A BAA would not have stopped that intrusion by itself, but the case is a plain lesson in why the contract matters: your vendor's access to your systems is your attack surface, and the BAA is where you pin down what that vendor must do to protect it.",
        ],
      },
      {
        type: "p",
        runs: [
          "Skipping the agreement is its own, separately punishable failure. Raleigh Orthopaedic Clinic reported a breach to the federal government in 2013, after it gave a vendor the X-ray films and records of 17,300 patients so the films could be digitized and the silver recovered. The arrangement was made over the phone, with no BAA. OCR's investigation did not turn on the recycling. It turned on the missing contract. The clinic paid $750,000 and accepted a corrective action plan that, among other things, required it to name one person responsible for getting a BAA from every vendor before any data is shared.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-raleigh-orthopaedic-business-associate.webp",
        alt: "Excerpt from the HHS Office for Civil Rights resolution agreement with Raleigh Orthopaedic Clinic: the practice paid $750,000 for failing to execute a business associate agreement before giving a vendor the protected health information of 17,300 patients.",
        width: 1500,
        height: 946,
        caption: [
          "From the U.S. Department of Health and Human Services, Office for Civil Rights settlement with Raleigh Orthopaedic Clinic, P.A. (2016). ",
          {
            text: "Read the HHS announcement \u2192",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/raleigh-orthopaedic-clinic/index.html",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "If a vendor breach does reach your patients, ",
          {
            text: "responding to a dental data breach",
            href: "/articles/dental-data-breach-response",
          },
          " is a separate process with its own deadlines. ",
          { text: "The cheaper path", href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice" },
          " is to close the gap before anything goes wrong.",
        ],
      },
      {
        type: "p",
        runs: [
          "A missing or unsigned BAA is a common finding in HIPAA audits and breach investigations, and it is the kind of thing that is hard to spot from inside the office. The free HIPAA Scorecard checks for it, and for the other controls OCR most commonly cites, in about three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "How to get a BAA from a vendor" },
      {
        type: "p",
        runs: [
          "None of this needs a lawyer for the routine cases. It needs a list and a few emails.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            label: "List every vendor that touches patient data",
            detail:
              "Walk through your software, your service providers, and anyone with access to your systems or records. The IT company, the billing service, the cloud backup, the imaging platform: write them all down. Many practices have never made this list.",
          },
          {
            label: "Ask each vendor for its BAA",
            detail:
              "Established vendors keep one ready and will send it when you ask. If a vendor does not know what a BAA is, treat that as a warning sign about how it handles patient data.",
          },
          {
            label: "Read the three things it must contain",
            detail:
              "The agreement must require the vendor to safeguard the data, to report breaches and security incidents to you, and to hold its own subcontractors to the same terms (45 CFR \u00a7 164.314(a)). A BAA that quietly disclaims all of that is not doing its job.",
          },
          {
            label: "Sign it before any data flows",
            detail:
              "The agreement has to be in place before you share anything. Signing one after a disclosure does not cure the disclosure, which is the exact timing the Raleigh settlement turned on.",
          },
          {
            label: "Keep the list current and owned",
            detail:
              "Store the signed agreements with the vendor list, and review it whenever you add or change a vendor. Naming one person to own this was literally part of the corrective action OCR ordered.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "Keeping track of which vendors have a signed BAA is also part of a real ",
          {
            text: "HIPAA risk analysis",
            href: "/articles/do-dental-practices-need-hipaa-risk-assessment",
          },
          ", the document the same enforcement office checks first. The two go together: the risk analysis is where you notice the gap, and the BAA is how you close it.",
        ],
      },
      {
        type: "p",
        runs: [
          "Not sure which of your vendors are missing one? The Scorecard runs through the controls an auditor checks first, including signed BAAs, and scores where your practice stands. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "When a vendor will not sign, and other edge cases" },
      {
        type: "p",
        runs: ["A few situations come up often enough to plan for."],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "The vendor refuses, or will only sign on a tier you cannot afford: " },
            "Then you cannot use it for anything involving patient data. No privacy setting or paid add-on substitutes for the contract; find a vendor that will sign.",
          ],
          [
            { strong: "\"We will send you our BAA\": " },
            "That is normal and fine. Read it anyway. The vendor's version still has to meet the required contents, and some are written to protect the vendor more than your patients.",
          ],
          [
            { strong: "Subcontractors behind your vendor: " },
            "You do not sign with them directly. Your vendor is responsible for binding its own subcontractors, such as the data center behind your cloud software, to the same terms (45 CFR \u00a7 164.308(b)). The chain has to hold the whole way down.",
          ],
          [
            { strong: "Agencies you are required to report to: " },
            "Sharing data because the law requires it, such as a report to a state board, is not a business-associate relationship and does not need a BAA.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "One change is on the horizon. A proposed overhaul of the ",
          {
            text: "HIPAA Security Rule",
            href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information",
          },
          ", published in January 2025, would add a step to all of this: practices would have to obtain written verification from each vendor that it has actually deployed the required technical safeguards, refreshed every year. As of June 2026 it is still a proposal, not law. Build your vendor list against today's rules, date it, and expect the bar to rise.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "This is general information, not legal advice. " },
          "Whether a particular vendor counts as a business associate can depend on the specific facts of the arrangement. When a relationship is unclear, confirm it against current HHS guidance or with qualified counsel before you share patient data.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, \"$750,000 settlement highlights the need for HIPAA business associate agreements,\" resolution agreement with Raleigh Orthopaedic Clinic, P.A. (2016)."],
          ["HHS Office for Civil Rights, \"Guidance on HIPAA & Cloud Computing\" (a cloud or transmission vendor that maintains protected health information is a business associate, encrypted or not)."],
          ["HHS Office for Civil Rights, sample business associate agreement provisions (accessed June 2026)."],
          ["American Dental Association, FAQs on HIPAA business associates (a dental lab is a healthcare provider; no BAA is needed to share PHI for treatment)."],
          ["Jordan v. Absolute Dental Group, LLC, No. 2:25-cv-00986 (D. Nev.); $3.3 million proposed class-action settlement over a 2025 vendor-account breach; final approval hearing July 30, 2026."],
          ["45 CFR \u00a7 160.103; \u00a7 164.502(e); \u00a7 164.504(e); \u00a7 164.308(b); \u00a7 164.314(a) (eCFR, current)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
        ],
      },
    ],
    faq: [
      {
        question: "Does a solo dental practice really need BAAs, or is that just for large groups?",
        answer:
          "It applies to every covered practice, regardless of size. The rules make no exception for solo or small offices, and OCR has settled cases with single-doctor practices. If a vendor handles your patient data, you need a BAA with it whether you run one chair or ten.",
      },
      {
        question: "Is my practice-management or imaging software vendor a business associate?",
        answer:
          "Almost always, yes. That software stores or processes your patients' records, which is the definition of a business associate. Cloud-based dental software vendors typically have a BAA ready and will provide it on request.",
      },
      {
        question: "Do I need a BAA with my IT or computer-support company?",
        answer:
          "Usually yes. If the company can access the systems that hold patient data, even only to maintain or repair them, it is a business associate under HIPAA. This is one of the most commonly missed agreements in small practices.",
      },
      {
        question: "Do I need a BAA with my dental lab?",
        answer:
          "Usually no. HHS and the ADA treat a dental lab as its own healthcare provider, and sharing patient information with it for a patient's treatment falls under HIPAA's treatment exception, which does not require a BAA. You would need one only if a lab or other provider does a non-treatment job for your practice, such as billing or records review.",
      },
      {
        question: "We email x-rays to specialists. Does the email provider need a BAA?",
        answer:
          "If the provider stores or routes that patient data through its systems, yes. Most standard email and file-sharing services that hold the message are business associates. A pure conduit that only transmits without storing, like your phone or internet carrier, is not.",
      },
      {
        question: "What happens if a vendor refuses to sign a BAA?",
        answer:
          "Then you cannot use that vendor for anything involving patient data. No privacy toggle or paid tier substitutes for the contract. The practical answer is to choose a vendor that will sign one.",
      },
      {
        question: "Is having a BAA the same as being HIPAA compliant?",
        answer:
          "No. A signed BAA is one required piece. You still need a risk analysis and written policies, with the safeguards themselves actually in place. The Scorecard checks the BAA alongside the other core controls so you can see the whole picture, not just one part.",
      },
      {
        question: "Can a BAA be backdated to cover data we already shared?",
        answer:
          "A BAA cannot be backdated. The agreement has to be in place before you disclose patient data to the vendor. Signing one afterward does not undo the earlier disclosure, which is exactly the timing the Raleigh Orthopaedic settlement turned on.",
      },
    ],
  },  {
    slug: "how-much-does-hipaa-compliance-cost-for-a-dental-practice",
    status: "published",
    title: "How Much Does HIPAA Compliance Cost for a Dental Practice Per Year? (2026)",
    metaTitle: "Annual HIPAA Compliance Cost for Dentists (2026)",
    description:
      "HIPAA compliance costs a dental practice about $1,500\u2013$12,000 a year, less if you run it yourself, more if you hand it off. Where the money goes.",
    author: "Dolev Arama",
    datePublished: "2026-06-17",
    dateModified: "2026-06-17",
    body: [
      {
        type: "p",
        runs: [
          "For a solo or small dental practice, HIPAA compliance runs roughly $1,500 to $12,000 a year, and the spread between those two numbers is the whole story. Run it yourself with software and you sit near the bottom; hand it to a firm and you sit near the top. What actually decides your bill is not which tool you buy, but whether you run the ongoing program the law requires or skip it, the way a small treatment center recently did before regulators billed it $103,000 and made it build the program anyway. Done on purpose, the program costs a fraction of that. Here is what it runs, and where the money goes.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "Roughly $1,500 to $12,000 a year, and the range is that wide for a reason. " },
            "A solo practice that runs compliance itself with software sits near the bottom; one that hands it to an outside firm sits near the top. Year one costs more. These are 2026 estimates.",
          ],
          [
            { strong: "Compliance is a program, not a purchase. " },
            "The risk assessment is one line item. Policies, training, vendor agreements, secure email, backups, and monitoring are the rest, and they renew every year.",
          ],
          [
            { strong: "The cheapest software is not the same as an audit-ready program. " },
            "A $99-a-month subscription can run the paperwork; it cannot prove a year later that you actually fixed what it found.",
          ],
          [
            { strong: "Skipping the program is the expensive path. " },
            "One small treatment center that never built one paid $103,000 and spent two years rebuilding it under federal supervision.",
          ],
          [
            { strong: "Not sure which line items you are missing? " },
            "The Scorecard checks the areas OCR most commonly cites, in about three minutes. ",
            { text: "Check my practice \u2192", href: "/scorecard" },
          ],
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Short answer: " },
          "for a solo or small dental practice in 2026, running a HIPAA compliance program costs roughly $1,500 to $12,000 a year. You land near the low end if you run it yourself with a compliance platform, and near the high end if you hand it to a healthcare-experienced IT or compliance firm. Year one usually costs more, because of the first assessment and the work of fixing what it finds. The assessment is one line item; the recurring program is everything else.",
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains what HIPAA compliance costs a dental practice per year. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "What you are actually paying for" },
      {
        type: "p",
        runs: [
          "HIPAA compliance is not a product you buy once. The law treats it as an ongoing program: find your risks, fix them, document everything, train your people, and prove it year after year. That is why a single price never fits. You are funding a set of moving parts that renew annually, not a one-time invoice.",
        ],
      },
      {
        type: "p",
        runs: [
          "The foundation is the risk analysis the Security Rule requires at 45 CFR \u00a7 164.308(a)(1)(ii)(A), the same accurate-and-thorough assessment every covered practice must run. The rest of the program sits on top of it: written policies, workforce training, a signed agreement with every vendor that touches patient data, secure email and encryption, reliable backups, and ongoing monitoring. The risk analysis anchors the budget because everything else depends on first knowing where your data lives and what threatens it.",
        ],
      },
      { type: "h2", text: "Two ways to run it: do it yourself, or hand it off" },
      {
        type: "p",
        runs: [
          "Almost every small practice picks one of two paths. The difference between them is mostly your time versus your money.",
        ],
      },
      {
        type: "table",
        headers: ["What to weigh", "Self-managed", "Managed"],
        rows: [
          ["Typical annual cost", "$1,500\u2013$4,000", "$6,000\u2013$12,000"],
          ["Who does the work", "You, with a platform", "An outside firm"],
          ["Best for", "A simple solo practice with time to keep up", "Complexity, multiple locations, or no spare hours"],
          ["Main risk", "You stop keeping it current", "Hiring a firm that does not know healthcare"],
        ],
        caption: "Two paths, one goal: an audit-ready program. The right one depends on your complexity and what your time is worth.",
      },
      { type: "h3", text: "Path 1. Run it yourself with software: about $1,500 to $4,000 a year (estimated)" },
      {
        type: "p",
        runs: [
          { strong: "What it is. " },
          "A compliance platform built for small practices does the heavy lifting: it walks you through the risk analysis, gives you policy templates, tracks your vendor agreements, runs staff training, and keeps an audit trail you can show a regulator. You add cheaper pieces around it, secure email, backups, and your own hours.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "What it costs. " },
          "A small-practice compliance platform runs about $500 to $3,000 a year. Staff training adds $4 to $100 per person per year. The rest is your time, a few hours to set up and a few more to keep current.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Who it fits. " },
          "A solo or very small practice with a simple setup and the discipline to keep the documentation honest, year after year.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Where it falls short. " },
          "The platform runs the paperwork; it does not judge your physical setup, configure your network, or catch a misconfigured server. And it only protects you if you keep it current, a platform you stop maintaining stops counting.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Verdict. " },
          "The best value for most small practices that will genuinely keep up with it.",
        ],
      },
      { type: "h3", text: "Path 2. Hand it to an outside firm: about $6,000 to $12,000 a year (estimated)" },
      {
        type: "p",
        runs: [
          { strong: "What it is. " },
          "A healthcare-experienced IT provider, often called a managed service provider or MSP, or a compliance firm runs the program for you: the annual assessment, remediation, policy maintenance, training, vendor management, and monitoring, with someone accountable for keeping it current.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "What it costs. " },
          "For a small dental practice, a managed compliance and IT arrangement commonly runs about $6,000 to $12,000 a year, depending on how many workstations, locations, and systems you have. Larger or multi-location practices pay more.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Who it fits. " },
          "Practices with real complexity, several operatories, multiple locations, heavy imaging, teledentistry, or a recent breach, and anyone who does not have the spare hours and wants it handled.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Where it falls short. " },
          "The cost, and the need to pick a firm that actually knows healthcare. A generic IT company that has never read the Security Rule can leave you exposed while charging you to feel covered.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Verdict. " },
          "The right call when the stakes or the complexity are high, or when your time is worth more than the savings.",
        ],
      },
      {
        type: "table",
        headers: ["Your practice", "Likely path"],
        rows: [
          ["Solo owner, one office", "Run it yourself with software"],
          ["Two to five providers, one office", "Either \u2014 your time decides"],
          ["Multiple locations", "Hand it to an MSP"],
          ["Heavy imaging or teledentistry", "Hand it to an MSP"],
          ["A recent breach, or no spare hours", "Hand it to an MSP"],
        ],
        caption: "A rule of thumb, not a rule. The more systems, locations, and risk you carry, the more an outside firm earns its fee.",
      },
      {
        type: "p",
        runs: [
          { strong: "You cannot budget for a gap you cannot see. " },
          "The Scorecard checks the areas OCR most commonly cites and sends you a short written review of where your practice stands. About three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What it costs by practice size" },
      {
        type: "p",
        runs: [
          "Rough 2026 ranges for the ongoing program, before year-one setup. Within each row, the low end is self-managed and the high end is outsourced; your number moves with your systems and locations.",
        ],
      },
      {
        type: "table",
        headers: ["Practice size", "Estimated annual cost", "Typical path"],
        rows: [
          ["Solo, one location", "$1,500\u2013$6,000", "Self-managed to light MSP"],
          ["Two to five providers", "$3,000\u2013$10,000", "Either"],
          ["Multiple locations", "$8,000\u2013$15,000+", "MSP"],
        ],
        caption: "2026 estimates for the recurring program; year one runs higher. How we built these is explained below.",
      },
      { type: "h2", text: "Where the money actually goes" },
      {
        type: "p",
        runs: [
          "Whichever path you choose, the annual budget breaks into the same line items. Here is what each one is, and what it runs for a small practice in 2026 (estimates; the platform and MSP paths usually bundle several of these into one fee).",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "The risk analysis (required). " },
            "The accurate, thorough assessment HIPAA mandates, refreshed every year. A specialist runs $1,500 to $6,000; the free federal tool is $0; software bundles it for low hundreds a year. ",
            { text: "What a HIPAA risk assessment actually costs", href: "/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice" },
            " breaks this line down on its own.",
          ],
          [
            { strong: "Policies and documentation. " },
            "Written HIPAA policies and the records that prove you follow them. Templates come with most platforms; a consultant-built set costs more. Either way, they need updating as your practice changes.",
          ],
          [
            { strong: "Workforce training. " },
            "Annual HIPAA training for everyone who touches patient data, from the front desk up. Online modules run $4 to $100 per person per year.",
          ],
          [
            { strong: "Business associate agreements. " },
            "A signed BAA with every vendor that handles patient data: your practice-management software, imaging, email, IT, billing. Most practices do not pay for the agreement itself; the cost, and the gap OCR keeps finding, is identifying every vendor that needs one and keeping the records current. ",
            { text: "Which vendors need a BAA", href: "/articles/does-my-dental-practice-need-a-baa" },
            " covers who counts.",
          ],
          [
            { strong: "Secure email, encryption, and backups. " },
            { text: "HIPAA-compliant email", href: "/articles/is-email-hipaa-compliant-dental-practice" }, ", device and file encryption, and reliable backups of your records. Often a few dollars per mailbox a month plus your IT setup, and frequently bundled into a platform or MSP fee.",
          ],
          [
            { strong: "Monitoring and vulnerability scanning. " },
            "Watching your systems for trouble and scanning for weak points. A small-footprint scanning program runs about $600 to $3,000 a year, and matters more if the proposed 2026 rules become law.",
          ],
        ],
      },
      { type: "h2", text: "Year one costs more than every year after" },
      {
        type: "p",
        runs: [
          "The single most useful thing to know before you budget: your first year costs more than the years that follow.",
        ],
      },
      {
        type: "p",
        runs: [
          "Year one carries the setup, the initial risk analysis, fixing what it turns up, writing your policies from scratch, getting every vendor under a BAA. For a small practice that brings in help, that first year commonly lands around $5,000 to $15,000, less if you do more of it yourself. After that you drop to the recurring figure: the annual assessment refresh, training, renewals, and monitoring, which is why the ongoing number is lower. Budget for both, and do not let the larger first-year figure scare you off. Skipping it costs far more, as the next section shows.",
        ],
      },
      { type: "h2", text: "What it cost the practice that skipped it" },
      {
        type: "p",
        runs: [
          "The clearest way to price a compliance program is to look at what skipping one costs.",
        ],
      },
      {
        type: "p",
        runs: [
          "Top of the World Ranch Treatment Center is a small addiction-treatment provider in Illinois, not a dental practice, but ", { text: "the failure OCR fined it for", href: "/articles/dental-hipaa-breach-and-enforcement-report" }, " is the one any small practice can have. In 2023 it reported that a phishing email had let an attacker into a staff inbox, exposing the records of 1,980 patients, the same click a dental front desk faces every day. OCR's finding was not about the breach. It was that the practice had not conducted an accurate and thorough risk analysis, the foundation the whole program sits on.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-top-of-the-world-ranch-risk-analysis.webp",
        alt: "Exhibit from the HHS Office for Civil Rights press release on the Top of the World Ranch Treatment Center settlement: OCR found the small Illinois addiction-treatment provider had not conducted an accurate and thorough HIPAA risk analysis after a phishing email exposed 1,980 patients' records; it paid a $103,000 settlement and entered a two-year corrective action plan.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          {
            text: "Settlement with Top of the World Ranch Treatment Center (February 19, 2026)",
            href: "https://www.hhs.gov/press-room/ocr-settles-hipaa-security-rule-investigation-twrtc.html",
          },
          ". Highlights added by Hipsana: a small provider that had not conducted an accurate and thorough risk analysis, the $103,000 settlement, and the two-year corrective action plan.",
        ],
      },
      {
        type: "p",
        runs: [
          "In February 2026 the center paid $103,000 and signed a two-year corrective action plan that ordered it to do the very things it had skipped: run the risk analysis, build a plan to fix what it finds, write and maintain policies, and train staff every year, all under federal monitoring. In other words, OCR made it build the program anyway, at a multiple of what the program would have cost. The center had fewer than 2,000 patients; size has never been a defense, and ",
          { text: "an OCR investigation", href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit" },
          " is an expensive way to learn that.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "A program you can show a regulator costs far less than the one OCR builds for you. " },
          "See where your practice stands in about three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "The proposed rules could raise the floor" },
      {
        type: "p",
        runs: [
          "One caveat before you lock a number. A proposed overhaul of the Security Rule, published in the Federal Register on January 6, 2025 (rulemaking ID RIN 0945-AA22), would, if finalized as written, make several now-flexible safeguards mandatory, encryption, multi-factor authentication, and routine vulnerability scanning among them, which would raise the monitoring and scanning line items. As of June 2026 it is not final and has no confirmed date, so do not spend now to meet a rule that does not exist yet. The foundation, a thorough risk analysis, is required either way.",
        ],
      },
      { type: "h2", text: "How to budget without overpaying" },
      {
        type: "p",
        runs: ["A sensible path for a solo or small dental practice:"],
      },
      {
        type: "steps",
        items: [
          {
            label: "Inventory what you have",
            detail:
              "About an hour. List every place patient data lives: practice-management software, email, imaging, backups, laptops, phones, plus every vendor that touches it. Your budget tracks this list, and a bigger, more connected setup costs more to protect.",
          },
          {
            label: "Run the risk analysis first",
            detail:
              "It is the foundation and the legal requirement, and it tells you what you actually need to spend on. Doing it before you buy tools keeps you from paying for fixes you do not need, or missing ones you do.",
          },
          {
            label: "Pick your path by time and complexity",
            detail:
              "Simple setup and time to keep up? A compliance platform you run yourself is the cheaper route. Multiple locations, heavy imaging, teledentistry, no spare hours, or a recent scare? An MSP or compliance firm is worth the higher fee.",
          },
          {
            label: "Fund year one, then the renewal",
            detail:
              "Expect the first year to cost more for setup and remediation. Budget a lower recurring figure for the annual refresh, training, renewals, and monitoring. Both are real, so plan for both.",
          },
          {
            label: "Keep the proof, every year",
            detail:
              "Save the assessment, the policies, the training records, and proof you fixed what you found. That documentation is what holds up under review, and it is what turns a one-time spend into an audit-ready program.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "If you remember one thing: pay for the version that produces real, documented proof you found your gaps and closed them. That paper trail is what holds up if OCR ever calls.",
        ],
      },
      { type: "h2", text: "How we estimated these costs" },
      {
        type: "p",
        runs: [
          "These ranges are 2026 estimates, not a fixed quote or a formal survey. We built them from publicly available pricing published by HIPAA compliance vendors, healthcare IT providers, training vendors, and managed compliance services that serve small healthcare practices. The self-managed range combines a small-practice compliance platform, staff training, and your own hours. The managed range reflects a healthcare-experienced IT or compliance firm running the program for you. Year one adds the initial assessment and the work of fixing what it finds. The figures exclude major breach remediation, enterprise or multi-state programs, and legal fees, and they round to practical bands. Your number depends on your systems, locations, and how much you keep in-house.",
        ],
      },
      { type: "h2", text: "The catch" },
      {
        type: "p",
        runs: ["A few honest caveats."],
      },
      {
        type: "p",
        runs: [
          "The wide range is real, not a hedge. A disciplined solo practice running good software can stay compliant for a couple thousand dollars a year; a multi-location group that outsources everything will pay several times that. Your number depends on your setup and the path you pick, which is why no one can quote you a single figure sight unseen.",
        ],
      },
      {
        type: "p",
        runs: [
          "And cheap is only cheap if it produces an audit-ready program. A bargain platform you half-finish, or a budget IT vendor who never runs a real risk analysis, becomes the most expensive option the moment regulators come knocking, the way it did for the treatment center above. If the worst has already happened, here is ",
          { text: "what to do after a dental data breach", href: "/articles/dental-data-breach-response" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "This article is general information, not legal advice. The cost figures here are 2026 market estimates, not quotes; your number will vary, and you should confirm current requirements with the ",
          { text: "U.S. Department of Health and Human Services", href: "https://www.hhs.gov/hipaa/for-professionals/index.html" },
          " or qualified counsel before you act. The risk-analysis requirement is at ",
          { text: "45 CFR 164.308(a)(1)(ii)(A)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308" },
          ", and the settlement described comes from HHS.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, settlement with Top of the World Ranch Treatment Center (February 2026)."],
          ["HHS Office for Civil Rights, Risk Analysis Initiative (announced October 2024)."],
          ["45 CFR \u00a7 164.308(a)(1)(ii)(A) (eCFR, current)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
          ["Cost ranges are 2026 market estimates, synthesized from publicly available pricing published by HIPAA compliance vendors, healthcare IT and managed-compliance providers, and training vendors serving small practices; figures are rounded and your number will vary with your setup."],
        ],
      },
    ],
    faq: [
      { question: "How much does HIPAA compliance cost per year for a small dental practice?", answer: "As a 2026 estimate, roughly $1,500 to $12,000 a year. You sit near the low end running it yourself with a compliance platform (about $1,500 to $4,000), and near the high end handing it to a healthcare-experienced IT or compliance firm (about $6,000 to $12,000). Year one usually costs more because of the initial assessment and setup." },
      { question: "Which HIPAA compliance costs are required, and which are optional?", answer: "The risk analysis, written policies, workforce training, business associate agreements, and a breach-response process are core requirements under the HIPAA Rules. How you meet them, free tool or paid platform, in-house or outsourced, is your choice. Some technical safeguards, like encryption, are currently addressable, meaning you implement them or document an equally effective alternative; the proposed 2026 rules would make several of them mandatory. Vulnerability scanning and penetration testing are not required today, though they are sensible and may become required if that proposal is finalized." },
      { question: "Is compliance software enough on its own?", answer: "For a simple solo practice, a good platform can run most of the program: the risk analysis, policies, training, and vendor tracking. What it cannot do is judge your physical setup, configure your network, or do the work for you. A subscription you do not fully complete leaves the same gap a regulator looks for." },
      { question: "Can a dental practice stay HIPAA compliant without hiring anyone?", answer: "Yes. HIPAA does not require you to hire a compliance officer or an outside firm. A solo or small practice can run the program itself with a compliance platform that handles the risk analysis, policies, training, and vendor tracking, plus a few hours of your time a year. The catch is discipline: the do-it-yourself path only works if you keep the documentation current and act on what the risk analysis finds." },
      { question: "Is it cheaper to do HIPAA compliance myself or hire an MSP?", answer: "Doing it yourself with software is cheaper in dollars, about $1,500 to $4,000 a year for a small practice, but it costs your time and discipline. An MSP or compliance firm runs about $6,000 to $12,000 a year and handles it for you. The right choice depends on your complexity and how much your hours are worth." },
      { question: "Why does the first year cost more?", answer: "Year one carries the setup: the initial risk analysis, fixing what it finds, writing policies from scratch, and getting every vendor under a business associate agreement. A small practice that brings in help commonly spends $5,000 to $15,000 in year one, then drops to a lower recurring figure for annual refreshes, training, and monitoring." },
      { question: "Is HIPAA compliance a tax-deductible business expense?", answer: "Generally, yes. Compliance software, training, and professional services are ordinary and necessary business expenses, and HIPAA being legally required strengthens that case, so they are typically deductible. Larger one-time purchases, such as new equipment, may need to be depreciated rather than deducted in full the first year. This is general information, not tax advice; confirm the specifics with your accountant." },
      { question: "What is the cheapest way for a solo practice to stay HIPAA compliant?", answer: "Run the free federal risk-assessment tool, add a low-cost compliance platform for policies and training, put a BAA in place with every vendor, and keep the documentation current yourself. That can hold annual costs to a couple thousand dollars, but only if you genuinely do the work and keep the proof. The savings disappear if the result is a checkbox exercise." },
      { question: "Does a solo dental practice really need all of this?", answer: "Yes. The HIPAA Security Rule does not scale its core obligations to your size, and federal regulators have settled with single-location providers, and practices with fewer than 2,000 patients, specifically to make that point. A small practice with patient data carries the same foundational duties as a hospital." },
      { question: "Can the Hipsana Scorecard tell me what I will need to budget for?", answer: "It points you at the gaps. The Scorecard checks the areas OCR most commonly cites and sends you a short written review of where your practice stands, which is the fastest way to see which line items you are actually missing before you spend. It is not a formal risk analysis, and we would not claim it is." },
    ],
  },

  {
    slug: "is-email-hipaa-compliant-dental-practice",
    status: "published",
    title: "Is Your Dental Practice's Email HIPAA Compliant? (2026)",
    metaTitle: "HIPAA-Compliant Email for Dentists (2026)",
    description:
      "Is your dental practice's email HIPAA compliant? Standard Gmail and Microsoft 365 don't encrypt patient records by default. Here's how to fix it.",
    author: "Dolev Arama",
    datePublished: "2026-06-18",
    dateModified: "2026-06-18",
    body: [
      {
        type: "p",
        runs: [
          "Probably not the way you are using it. HIPAA does not ban emailing patient information, but it does require you to secure it, and standard Gmail or Microsoft 365 will not encrypt an outgoing message on its own. After a small clinic sent the records of 1,263 patients to an unknown email account, federal regulators fined it $25,000. Here is what the rules actually require, what is changing in 2026, and how to close the gap before it is your practice.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "HIPAA does not forbid email. " },
            "The Privacy Rule lets you email patient information as long as you add reasonable safeguards. The practical catch is that \"reasonable\" almost always lands on encryption.",
          ],
          [
            { strong: "Encryption is \"addressable,\" not skippable. " },
            "You may use an alternative, but only if you document why encryption is not reasonable for your practice. OCR treats unencrypted patient email as a gap.",
          ],
          [
            { strong: "Free Gmail can never qualify. " },
            "Google will not sign an agreement for a consumer @gmail.com account. Paid Google Workspace and Microsoft 365 can qualify, with a signed agreement and the right settings.",
          ],
          [
            { strong: "Emailing an x-ray to a lab or specialist is the real exposure. " },
            "That is provider to provider, where there is no patient consent to fall back on, so the message has to be encrypted.",
          ],
          [
            { strong: "A patient may still ask for plain email. " },
            "If they request it and you warn them of the risk, you must honor it, and you are not responsible for what happens in transit.",
          ],
          [
            { strong: "Encryption buys a safe harbor. " },
            "A properly encrypted message that goes astray is usually not a reportable breach, as long as the decryption key was not exposed too.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains whether a dental practice's email is HIPAA compliant. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },

      { type: "h2", text: "Does HIPAA actually let a dental practice email patient information?" },
      {
        type: "p",
        runs: [
          "Yes. The HIPAA Privacy Rule lets a dental practice communicate with patients by email, as long as it applies reasonable safeguards, such as checking the address before hitting send. ",
          { text: "HHS has said this plainly", href: "https://www.hhs.gov/hipaa/for-professionals/faq/570/does-hipaa-permit-health-care-providers-to-use-email-to-discuss-health-issues-with-patients/index.html" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "The Security Rule then governs the electronic copy. It does not flatly require encryption. Encryption sits in the rule as an \"addressable\" specification in ",
          { text: "two places", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.312" },
          ", one for data at rest on your devices and one for data in transit across the internet.",
        ],
      },
      {
        type: "p",
        runs: [
          "\"Addressable\" does not mean optional. It means you either encrypt, or you document why encryption is not reasonable for your practice and put an equivalent safeguard in its place. Two myths waste a lot of time here. A confidentiality line at the bottom of the message does not make an unencrypted email compliant. And a password is not encryption: a password keeps someone out of a file, while encryption scrambles the contents so that intercepting the message reveals nothing.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },

      { type: "h2", text: "Is Gmail HIPAA compliant? Is Microsoft 365?" },
      {
        type: "p",
        runs: [
          "Not in their consumer form. A free @gmail.com or @outlook.com account cannot be made compliant under any setting, because the vendor will not sign a ",
          { text: "business associate agreement", href: "/articles/does-my-dental-practice-need-a-baa" },
          " covering it. That agreement, or BAA, is the contract that makes a vendor responsible for the patient data it touches. Without one, sending protected health information through that account is a violation the moment it leaves your outbox.",
        ],
      },
      {
        type: "p",
        runs: [
          "Paid Google Workspace and Microsoft 365 are different. Both will sign a BAA, and both can be configured to handle patient data. Signing it is step one, not the finish line. The agreement covers the vendor's own systems. It does not cover your staff using a personal account on the side, a plugin or archiver that needs its own agreement, or an auto-forward rule that quietly copies messages somewhere else.",
        ],
      },
      {
        type: "p",
        runs: [
          "There is also a quieter gap in transit. These services protect mail with TLS, a method that encrypts the connection between two mail servers. It works only when the receiving server also supports it. When it does not, many systems fall back to sending in plain text, and the standard product does not encrypt the message itself on its own. For anything sensitive, you want encryption that travels with the message, not just protection on the link.",
        ],
      },

      { type: "h2", text: "Can I email an x-ray to a specialist or lab?" },
      {
        type: "p",
        runs: [
          "This is where most dental practices are exposed. Panoramic films, CBCT scans, intraoral photos, and the referral note that travels with them are all protected health information. Emailing them to a specialist, a lab, or another office is provider-to-provider communication, and the rules here are stricter than they are for a message to a patient.",
        ],
      },
      {
        type: "p",
        runs: [
          "When you email a patient, you can rely on their consent after a warning. With another provider or a lab, that fallback does not exist, and warning the recipient is not enough. Unless the message is encrypted, or it moves through a service that has signed a BAA with you, that routine email of an x-ray is the exact transmission the Security Rule expects you to protect.",
        ],
      },

      { type: "h2", text: "What if a patient asks me to email their own records?" },
      {
        type: "p",
        runs: [
          "A patient has the right to receive their own records by ordinary, unencrypted email if they ask for it. You give them a brief warning that an unencrypted message could be read in transit, confirm they still want it that way, and then you have to honor the request. ",
          { text: "HHS has been explicit about this", href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access/index.html" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "Once you have warned them and complied, you are not responsible for breach notification if that message is intercepted on the way to them. The duty that remains is small and practical: enter the address correctly. This exception is narrow. It covers a patient receiving their own information, and never the lab-and-specialist email above.",
        ],
      },

      { type: "h2", text: "What does OCR fine dental practices for?" },
      {
        type: "p",
        runs: [
          "In 2020, a small clinic in rural North Carolina settled with federal regulators over a breach it had first reported in 2011. Metropolitan Community Health Services, which provides medical and dental care to an underserved community as Agape Health Services, had disclosed the protected health information of 1,263 patients to an unknown email account. The Office for Civil Rights investigated, and found the problem was bigger than one message.",
        ],
      },
      {
        type: "p",
        runs: [
          "The clinic had never completed a risk analysis, had no written security policies, and had not trained its staff on HIPAA until 2016, despite operating since the late 1990s. It paid $25,000 and accepted two years of federal monitoring, and OCR noted it had reduced the figure because of the clinic's size and mission. The lesson is not the dollar amount. It is that an email mistake opens the door, and the investigation then examines everything behind it.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-metro-agape-email-disclosure.webp",
        alt: "Exhibit from the HHS Office for Civil Rights settlement with Metropolitan Community Health Services, doing business as Agape Health Services: the small North Carolina clinic disclosed the protected health information of 1,263 patients to an unknown email account, had never conducted a HIPAA risk analysis or trained its staff, and paid a $25,000 settlement with a two-year corrective action plan.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          {
            text: "Settlement with Metropolitan Community Health Services / Agape Health Services (July 23, 2020)",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/metro/index.html",
          },
          ". Highlights added by Hipsana: the disclosure of 1,263 patients' records to an unknown email account, the missing risk analysis, and the $25,000 settlement.",
        ],
      },
      {
        type: "p",
        runs: [
          "Metro is one entry in a long pattern. We track the named dental settlements and the failures behind them in our ",
          { text: "dental HIPAA breach and enforcement report", href: "/articles/dental-hipaa-breach-and-enforcement-report" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "You do not have to guess which of these gaps is yours. The free ",
          { text: "HIPAA Scorecard", href: "/scorecard" },
          " checks your email and vendor coverage along with eight other core controls and names your top gap in about three minutes. It is a starting point, not an audit-ready program, but it tells you where you stand.",
        ],
      },

      { type: "h2", text: "Encryption and the breach safe harbor" },
      {
        type: "p",
        runs: [
          "Encryption does more than reduce risk. It can keep an accident from becoming a reportable breach at all. The Breach Notification Rule applies only to \"unsecured\" patient information. If a message was encrypted to the federal standard that ",
          { text: "HHS specifies", href: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/guidance/index.html" },
          ", which points to encryption methods tested by NIST, then a message that goes to the wrong place is generally not a breach you have to report. Send the same records unencrypted and a single wrong address can become a ",
          { text: "60-day notification clock and an OCR investigation", href: "/articles/dental-data-breach-response" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "There is one condition that is easy to miss. The safe harbor holds only if the decryption key was not exposed along with the data. If an intruder takes both the encrypted message and the key that unlocks it, or the encryption did not meet the standard, the safe harbor does not apply and you are back to reporting. Keep keys and passwords separate from the data they protect.",
        ],
      },

      { type: "h2", text: "What is changing under the proposed 2026 rule?" },
      {
        type: "p",
        runs: [
          "You have probably seen headlines that HIPAA now requires encryption. It does not, yet. A proposed overhaul of the Security Rule was ",
          { text: "published in the Federal Register on January 6, 2025", href: "https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information" },
          ". It would remove much of the \"addressable\" flexibility and make encryption mandatory at rest and in transit. As of mid-2026 it is still a proposal: the comment period closed in March 2025, the target date for a final rule passed with nothing published, and a coalition of industry groups has asked HHS to withdraw it. It could be finalized, changed, delayed, or dropped.",
        ],
      },
      {
        type: "p",
        runs: [
          "The practical answer does not wait on the outcome. The current rule already expects you to assess transmission security and to either encrypt or document why not, and OCR already fines unencrypted patient email today. Whatever happens to the proposal, the email safeguards below are what a current ",
          { text: "risk analysis", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" },
          " points to.",
        ],
      },

      { type: "h2", text: "How to make your dental practice's email HIPAA compliant" },
      {
        type: "p",
        runs: [
          "There is no single \"HIPAA email\" switch. You are choosing how patient information moves, and most practices end up combining a couple of the options below.",
        ],
      },
      {
        type: "table",
        headers: ["Option", "What it is", "Best for", "The catch"],
        rows: [
          [
            "Enforced TLS (Workspace or 365 + BAA)",
            "Encrypts the connection between mail servers",
            "Routine mail to providers whose servers also support it",
            "Falls back to plain text if the other side does not support TLS",
          ],
          [
            "Encrypted email or portal pickup",
            "Encrypts the message itself, or delivers it through a secure link",
            "Sending records to any recipient, inside or outside healthcare",
            "The recipient may have to open a portal or verify identity",
          ],
          [
            "Secure patient portal",
            "Patient data stays off email entirely",
            "Detailed clinical records and patient access requests",
            "The patient has to log in",
          ],
          [
            "Keep PHI out of the message",
            "Send only logistics, with no patient detail",
            "Appointment reminders and scheduling",
            "Hard to enforce, and the address itself can be patient information",
          ],
        ],
        caption:
          "Four ways to handle patient information in email. Most practices combine the first two for provider messages and a portal for full records.",
      },
      {
        type: "steps",
        items: [
          {
            label: "List where patient data leaves by email",
            detail:
              "Referrals to specialists, x-rays to labs, claims, and any message a patient asked for. That same list belongs in your risk analysis.",
          },
          {
            label: "Get a BAA with your email provider",
            detail:
              "Move off any consumer @gmail.com or @outlook.com account. On Google Workspace or Microsoft 365, sign the business associate agreement in the admin console.",
          },
          {
            label: "Turn on real encryption for outbound patient data",
            detail:
              "Enforce TLS, then add message-level encryption or a secure portal for anything sensitive, so the contents are protected even when the receiving server is not.",
          },
          {
            label: "Write the rule down and train the team",
            detail:
              "One page: no patient data from personal accounts, nothing sensitive in a subject line, and exactly how to send securely. Then document that the training happened.",
          },
          {
            label: "Record any alternative you choose",
            detail:
              "If you rely on something other than encryption anywhere, write down why it is reasonable. That documentation is what an addressable specification requires.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "None of this is expensive. A compliant email plan with encryption usually runs ",
          { text: "a few dollars per mailbox a month", href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice" },
          ", often bundled into a practice-management platform or your IT provider's fee. The costly version is the one Metro paid, after the fact.",
        ],
      },
      {
        type: "p",
        runs: [
          "This is general information about HIPAA and email, not legal advice. Your own risk analysis, and any stricter rules in your state, decide what is reasonable for your specific practice.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, Resolution Agreement and Corrective Action Plan, Metropolitan Community Health Services (doing business as Agape Health Services) (July 23, 2020)."],
          ["HHS Office for Civil Rights, FAQ 570, “Does HIPAA permit health care providers to use email to discuss health issues with patients?” (accessed June 2026)."],
          ["HHS Office for Civil Rights, guidance on rendering unsecured protected health information unusable, unreadable, or indecipherable (the breach-notification encryption safe harbor; accessed June 2026)."],
          ["HHS Office for Civil Rights, individuals’ right of access under HIPAA guidance (accessed June 2026)."],
          ["45 CFR \u00a7 164.312 (technical safeguards, including encryption); \u00a7 164.402 (breach definition and the unsecured-PHI safe harbor) (eCFR, current)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (RIN 0945-AA22)."],
        ],
      },
    ],
    faq: [
      {
        question: "Does a confidentiality notice at the bottom of an email make it HIPAA compliant?",
        answer:
          "No. A disclaimer does not secure the message or satisfy the Security Rule. If the email contains patient information and is not encrypted or sent through a service under a business associate agreement, the disclaimer changes nothing.",
      },
      {
        question: "Is a password-protected attachment the same as encryption?",
        answer:
          "Not necessarily. A password can control who opens a file, but it does not always scramble the contents in transit. HIPAA's breach safe harbor depends on encryption that meets the federal standard, not on a password alone.",
      },
      {
        question: "Is free Gmail ever acceptable for patient email?",
        answer:
          "No. Google does not sign a business associate agreement for consumer @gmail.com accounts, so they cannot be used for protected health information under any configuration. Paid Google Workspace, with a signed agreement and proper settings, can be.",
      },
      {
        question: "Do I need a business associate agreement with my email provider?",
        answer:
          "If the service stores or routes your patients' information through its systems, yes. Standard hosted email that holds your messages is a business associate. A pure conduit that only carries data without storing it is the narrow exception.",
      },
      {
        question: "Is a secure patient portal better than email?",
        answer:
          "For detailed clinical records, usually yes, because the data never travels through ordinary email. Many practices use a portal for records and reserve encrypted email for quick provider-to-provider messages.",
      },
      {
        question: "What does HIPAA-compliant email cost a small dental practice?",
        answer:
          "Often a few dollars per mailbox per month for a compliant plan with encryption, and it is frequently bundled into a practice-management platform or an IT provider's fee.",
      },
    ],
  },
  {
    slug: "how-to-handle-a-patient-records-request-dental-practice",
    status: "published",
    title:
      "How to Handle a Patient Records Request at a Dental Practice (2026)",
    metaTitle: "Patient Records Requests for Dentists (2026)",
    description:
      "A patient asks for their dental records. HIPAA gives you 30 days, strict limits on fees, and few ways to say no. Get it wrong and one practice paid $70,000.",
    author: "Dolev Arama",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    body: [
      {
        type: "p",
        runs: [
          "The HIPAA right of access is a patient's legal right to see and get a copy of their own health information, including their dental records, from the practice that holds it.",
        ],
      },
      {
        type: "p",
        runs: [
          "When a patient asks for their records, you generally have 30 calendar days to provide them, plus one 30-day extension if you send written notice first. You can charge a reasonable, cost-based fee for copies, but not when a bill is unpaid, and not for records sent through a patient portal.",
        ],
      },
      {
        type: "p",
        runs: [
          "Get the timing or the fee wrong, and it is the kind of mistake the government has been fining dental practices for. In October 2024, the HHS Office for Civil Rights fined a solo Maryland dental practice, Gums Dental Care, $70,000. The reason was not a data breach. A patient had asked, by email, for copies of her and her children's dental records. The practice replied the same day but never sent the records, and kept refusing for almost three years. When the dentist contested the penalty all the way to a federal appeals board, the board sided with the government. It was the 50th enforcement action OCR has brought over a records-access failure since 2019.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-gums-dental-right-of-access.webp",
        alt: "Exhibit from the HHS Office for Civil Rights enforcement action against Gums Dental Care: OCR found the solo Maryland dental practice failed to give a patient timely access to her own and her children's records and imposed a $70,000 civil monetary penalty, its 50th right-of-access enforcement action since 2019.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          {
            text: "Civil monetary penalty against Gums Dental Care (October 2024)",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html",
          },
          ". Highlights added by Hipsana: the $70,000 penalty, OCR's 50th right-of-access enforcement action, and the roughly three years the records were withheld.",
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains how to handle a patient's records request at a dental practice. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      {
        type: "h2",
        text: "Why a records request is the HIPAA gap most likely to cost you",
      },
      {
        type: "p",
        runs: [
          "The right of access has become OCR's most active enforcement priority under the Privacy Rule. Since the agency launched its Right of Access Initiative in 2019, it has brought more than 50 enforcement actions under it, reaching its 54th by the end of 2025. Dental practices keep showing up on that list. On a single day, ",
          {
            text: "in September 2022, OCR settled three separate cases against dental practices",
            href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/september-2022-right-of-access-initiative/index.html",
          },
          " for the same failure: not giving patients their records on time.",
        ],
      },
      {
        type: "p",
        runs: [
          "Reading through the dental cases OCR has published, the trigger is almost always mundane: an improper fee, or a request that sat unanswered for months. The expensive part was never the records. It was ignoring the request.",
        ],
      },
      {
        type: "p",
        runs: [
          "What makes this different from most HIPAA risks is who triggers it. A breach usually starts with an attacker. A right-of-access violation starts with your own patient, who only has to file a short complaint with OCR when they cannot get their records. That complaint is also one of the most common ways ",
          {
            text: "an OCR investigation into a practice",
            href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit",
          },
          " begins in the first place. And the penalties are not reserved for large groups. Gums Dental Care is a solo office. The 2022 settlements ran from $25,000 to $80,000 and hit practices in Illinois, Georgia, and Nevada.",
        ],
      },
      {
        type: "p",
        runs: [
          {
            strong:
              "Most independent practices carry gaps they can't see from the inside. The free HIPAA Risk Scorecard checks the 10 areas that come up most often in OCR investigations, including whether your records-request process would hold up, then sends you a short written review and an introduction to a specialist. It takes about three minutes. ",
          },
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What the right of access actually covers" },
      {
        type: "p",
        runs: [
          "Under ",
          {
            text: "45 CFR 164.524",
            href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.524",
          },
          ", a patient can inspect and get a copy of the protected health information you keep about them in what HIPAA calls the designated record set. For a dental practice, that is broader than most people assume. It includes the clinical chart and treatment notes, your imaging (panoramic, bitewing, CBCT), and the billing records you use to make decisions about that patient.",
        ],
      },
      {
        type: "p",
        runs: [
          "A few things sit outside the right of access. Psychotherapy notes kept separate from the rest of the record are excluded, as is information compiled in reasonable anticipation of a lawsuit. Almost nothing else in a typical dental file qualifies. If a patient asks for everything, the safe assumption is that you owe them their full chart, including images and billing.",
        ],
      },
      { type: "h2", text: "The 30-day clock, and the one extension you get" },
      {
        type: "p",
        runs: [
          "You must act on a records request within 30 calendar days of receiving it. That is an outer limit, not a target. ",
          {
            text: "OCR's own guidance",
            href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access/index.html",
          },
          " encourages practices to respond sooner, and a portal can make it near-instant. You may take one extension of up to 30 more days, but only if, inside the first 30 days, you give the patient a written statement explaining the delay and the date you will deliver. You get that extension once per request. There is no second one.",
        ],
      },
      {
        type: "table",
        headers: ["Stage", "What HIPAA requires"],
        rows: [
          [
            "Day 0",
            "Patient submits a request. The clock starts the day you receive it.",
          ],
          [
            "By Day 30",
            "Provide the records, or send a written denial on a permitted ground, or send written notice of a one-time extension.",
          ],
          [
            "Extension",
            "Up to 30 additional days. Only one. The written notice must go out within the first 30 days and name a completion date.",
          ],
          [
            "By Day 60",
            "If you took the extension, the records (or a written denial) are due.",
          ],
        ],
        caption:
          "The federal timeline under 45 CFR 164.524. Your state may require less time (see below).",
      },
      {
        type: "p",
        runs: [
          "One trap inside the clock: handing over part of the record on time does not count as meeting the deadline. In the 2022 cases, Chicago's Family Dental Care produced only portions of a patient's records and did not deliver the complete file until months later. That partial response was treated as a failure, and the practice paid $30,000.",
        ],
      },
      { type: "h2", text: "What you can charge, and what you can't" },
      {
        type: "p",
        runs: [
          "You are allowed to charge a reasonable, cost-based fee when a patient asks for copies. The fee can include only the labor to copy the records, the cost of supplies such as a CD or USB drive, and postage if the patient wants them mailed. You may also charge to prepare a summary, but only if the patient agrees to one in advance.",
        ],
      },
      {
        type: "table",
        headers: ["You CAN charge for", "You CANNOT charge for"],
        rows: [
          [
            "Labor to copy the records (paper or electronic)",
            "Searching for or retrieving the records",
          ],
          [
            "Supplies (CD, USB) if the patient wants portable media",
            "The cost of maintaining your records system or software",
          ],
          [
            "Postage, if the records are mailed",
            "A fee on records the patient receives through a portal",
          ],
          [
            "A summary, only if the patient agrees to one",
            "Anything, as a condition of an unpaid treatment bill",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This is where two of the dental cases turned. A Georgia practice, Great Expressions Dental Center of Georgia, told a patient she had to pay a $170 copying fee and would not release her records until she did. OCR concluded the fee went beyond what the Privacy Rule allows and that the delay denied the patient timely access, and the practice agreed to pay $80,000 to settle. Gums Dental Care charged a $25 fee for records the patient had asked to receive by email. Because there is no real copying or supply cost for an emailed record, OCR found even that small fee improper. And you cannot hold records hostage over an unpaid dental bill. A patient's right to their record does not depend on whether they have settled their account.",
        ],
      },
      { type: "h2", text: "The form and format the patient asks for" },
      {
        type: "p",
        runs: [
          "If a patient asks for their records in a specific form, you have to provide them that way when it is readily producible. If they want an electronic copy and you keep the chart electronically, you generally owe them an electronic copy. If you cannot produce the exact format requested, you provide a readable alternative you both can agree on.",
        ],
      },
      {
        type: "p",
        runs: [
          "Saying you have no secure way to send it is not a way out. Gums Dental Care argued it had no secure website and therefore could not email the records. OCR rejected that: the practice still had to provide the records in some other form and format, and offering nothing at all was the violation. If your ",
          {
            text: "email is not set up to carry patient information securely",
            href: "/articles/is-email-hipaa-compliant-dental-practice",
          },
          ", the answer is a different delivery method, not silence.",
        ],
      },
      { type: "h2", text: "Your state law can require more" },
      {
        type: "p",
        runs: [
          "Everything above is the federal floor. HIPAA sets a minimum, and a state law that gives patients more protection, including faster access or a lower fee, is not overridden by it. When both apply, you follow whichever rule is more protective of the patient. That is settled under HIPAA's preemption rule (45 CFR 160.203), and ",
          {
            text: "HHS has confirmed",
            href: "https://www.hhs.gov/guidance/document/faq-403-how-do-i-know-if-state-law-more-stringent-hipaa-privacy-rule",
          },
          " that a state law giving patients more timely access is the one that governs.",
        ],
      },
      {
        type: "p",
        runs: [
          "In practice this usually means a shorter clock or a tighter fee cap. The deadline alone can run well under the federal default:",
        ],
      },
      {
        type: "table",
        headers: ["Jurisdiction", "Deadline to provide records"],
        rows: [
          ["Federal (HIPAA floor)", "30 calendar days, plus one 30-day extension"],
          ["Texas", "30 days, no extension"],
          ["California", "15 days for copies; 5 business days to inspect"],
        ],
        caption:
          "Examples only. Many states set a shorter deadline or cap copying fees. Confirm your own state's medical-records law, because the stricter rule is the one OCR and your state dental board will hold you to. (Texas: 22 Tex. Admin. Code \u00a7 108.8. California: Cal. Health & Safety Code \u00a7 123110.)",
      },
      {
        type: "p",
        runs: [
          "So before you rely on the 30-day window or set a copying fee, check what your state requires.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h2", text: "When you can actually say no" },
      {
        type: "p",
        runs: [
          "The grounds for denying a records request are narrow and specific, and they are listed at 45 CFR 164.524(a)(2)-(3). A few denials are reviewable, meaning a licensed professional who was not involved in the original decision can be asked to look again, for example a determination that releasing the record is reasonably likely to endanger someone's life or safety. Most of the everyday reasons a practice might want to say no are not on the list at all.",
        ],
      },
      {
        type: "p",
        runs: [
          "Suspecting that a patient will misuse the records is not a permitted reason. In the Gums case, the dentist argued the patient might use the records to commit insurance fraud. OCR was explicit that this is not a lawful basis to deny access. Neither is an unpaid bill, a dispute with the patient, or simple inconvenience. When you do deny any part of a request, the denial has to be in writing, in plain language, sent within the same 30-day or 60-day window, and it must tell the patient how to seek a review if one applies and how to complain to you or to OCR. Any part of the record you do not have a ground to withhold still has to be released.",
        ],
      },
      { type: "h2", text: "Who else can ask for the records" },
      {
        type: "p",
        runs: [
          "The right of access belongs to the patient, but ",
          { text: "a personal representative", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502" },
          " steps into the patient's shoes. For an adult, that is usually someone with legal authority such as a healthcare power of attorney. For a child, a parent or guardian is generally the personal representative, though state law carves out exceptions that matter in practice. Requests involving minors and parents raise enough of their own questions that they deserve separate treatment, ",
          { text: "which we cover on its own", href: "/articles/parental-access-to-a-childs-dental-records" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "Patients can also direct you to send their records straight to a third party, such as a new dentist or an attorney. A 2020 federal court decision, ",
          {
            text: "Ciox Health v. Azar",
            href: "https://www.hhs.gov/hipaa/court-order-right-of-access/index.html",
          },
          ", narrowed this. In plain terms: when a patient gets their own copy, the cost-based fee limit still applies; when they direct records to a third party, that specific fee cap no longer governs. Verify a third-party request the same way you would any other, and make sure the instruction to send is clear and in writing.",
        ],
      },
      {
        type: "h2",
        text: "How to fulfill a records request, step by step",
      },
      {
        type: "steps",
        items: [
          {
            label: "Log the request the day it arrives",
            detail:
              "Write down who asked, what they asked for, the date, and how they want to receive it. The 30-day clock starts on that date, so the date is the single most important thing you record. You may require the request in writing or on your own form, as long as you have told patients that and it does not become a barrier or a delay.",
          },
          {
            label: "Verify identity, then stop",
            detail:
              "Confirm the requester is the patient or an authorized personal representative. Reasonable verification is required, but it cannot become a stalling tactic. Do not add hurdles beyond what you would use to confirm anyone's identity.",
          },
          {
            label: "Pull the complete record",
            detail:
              "Chart, treatment notes, all imaging, and billing. Partial is not compliant. If part of it is genuinely excluded, set only that part aside and prepare the rest.",
          },
          {
            label: "Match the format",
            detail:
              "If they asked for an electronic copy and you can produce one, send it electronically. If you cannot send it the requested way safely, offer a clear alternative rather than nothing.",
          },
          {
            label: "Calculate a lawful fee, or none",
            detail:
              "Charge only the permitted copying costs. Charge nothing for a portal copy. Never condition release on an unpaid bill. If you do charge, you can require prepayment of that permitted amount.",
          },
          {
            label: "Deliver within 30 days, or send the extension notice",
            detail:
              "If you need more time, the written extension notice has to go out before day 30 and name a completion date. You get one extension, not two.",
          },
          {
            label: "Keep proof",
            detail:
              "Save what you sent, when, and to whom. If a complaint ever lands, your dated log is the difference between a quick close and a penalty.",
          },
        ],
      },
      { type: "h2", text: "Where independent practices slip" },
      {
        type: "p",
        runs: [
          "The practices that get fined are rarely the ones acting in bad faith. They are the ones without a written procedure, where a records request lands on whoever happens to open the mail, gets set aside during a busy week, and quietly blows past day 30. By the time the patient is frustrated enough to file with OCR, the only documentation is a vague memory of we were getting to it. The gap is almost never knowledge of the rule. It is the absence of a simple, owned, dated process that survives a busy front desk.",
        ],
      },
      {
        type: "p",
        runs: [
          "One change worth watching: OCR has a ",
          {
            text: "proposed rule",
            href: "https://www.federalregister.gov/documents/2021/01/21/2020-27157/proposed-modifications-to-the-hipaa-privacy-rule-to-support-and-remove-barriers-to-coordinated-care",
          },
          ", still in proposed form as of 2026 with a federal consultation step held in February 2026, that would shorten the standard response time from 30 days to 15. It is not final, and the 30-day rule remains the federal law today. But the direction is toward less time, not more, and in several states the deadline is already shorter, which is one more reason to fix the process now rather than rely on the back half of a 30-day window.",
        ],
      },
      {
        type: "p",
        runs: [
          "A records request is one of the few HIPAA gaps a single patient can report with one click. The free HIPAA Risk Scorecard flags the ones OCR most commonly cites in about three minutes, then points you to the fix. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      {
        type: "p",
        runs: [
          "This is general information about HIPAA's right of access, not legal advice. Your own situation, and any stricter rules in your state, decide what applies to your specific practice.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, civil monetary penalty against Gums Dental Care, LLC (October 2024)."],
          ["HHS Office for Civil Rights, September 2022 Right of Access Initiative settlements, including Family Dental Care and Great Expressions Dental Center of Georgia (September 2022)."],
          ["HHS Office for Civil Rights, individuals’ right of access under HIPAA guidance (accessed June 2026)."],
          ["HHS Office for Civil Rights, FAQ 403, “How do I know if a state law is more stringent than the HIPAA Privacy Rule?” (accessed June 2026)."],
          ["Ciox Health, LLC v. Azar (D.D.C. 2020) (fee limits on patient-directed transmissions to third parties)."],
          ["45 CFR \u00a7 164.524 (right of access, including fees and the grounds for denial); \u00a7 160.203 (preemption) (eCFR, current)."],
          ["Federal Register, proposed modifications to the HIPAA Privacy Rule to support and remove barriers to coordinated care, January 21, 2021."],
        ],
      },
    ],
    faq: [
      {
        question: "How long does a dental practice have to provide records?",
        answer:
          "Thirty calendar days from receiving the request, under 45 CFR 164.524. You can take one extension of up to 30 more days, but only if you send the patient written notice of the delay and a completion date within the first 30 days. Some states require faster turnaround.",
      },
      {
        question: "Can I charge a patient for a copy of their dental records?",
        answer:
          "Yes, a reasonable, cost-based fee covering labor to copy, supplies, and postage. You cannot charge for searching or retrieving records, you cannot charge for a copy delivered through a patient portal, and you cannot condition release on an unpaid bill.",
      },
      {
        question: "Can I refuse to release records if the patient owes us money?",
        answer:
          "No. An unpaid bill is not a permitted reason to deny a patient access to their record. The two are separate matters.",
      },
      {
        question:
          "What if a patient asks for records by email and we don't have secure email?",
        answer:
          "You still have to provide the records. If you cannot send them by email safely, offer another form or format. Sending nothing is the violation, as OCR made clear in the Gums Dental Care case.",
      },
      {
        question:
          "Does a parent automatically get a copy of their child's dental records?",
        answer:
          "Usually, because a parent is generally the child's personal representative under HIPAA. State law creates exceptions, so this is one to handle carefully. We cover parental access to a minor's records on its own.",
      },
      {
        question: "Does my state have different rules than HIPAA?",
        answer:
          "It might, and if it does, the stricter rule wins. HIPAA is a federal floor. Some states are stricter than HIPAA. California, for example, requires copies within 15 days and caps the fee at 25 cents per page, and Texas requires dental records within 30 days, with no extension. Check your state's medical-records law alongside HIPAA and follow whichever is more protective of the patient.",
      },
    ],
  },
  {
    slug: "hipaa-social-media-rules-dental-practice",
    status: "published",
    title: "HIPAA Rules for Dental Social Media: Patient Photos and Review Responses (2026)",
    metaTitle: "HIPAA Social Media Rules for Dentists (2026)",
    description: "Patient photos need written HIPAA authorization, and review replies can break the law. The named OCR dental cases, two rules, and a safe review template.",
    author: "Dolev Arama",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    body: [
      {
        type: "p",
        runs: [
          "A North Carolina dentist replied to a negative Google review. Naming the patient in that reply cost the practice a $50,000 HIPAA penalty.",
        ],
      },
      {
        type: "p",
        runs: [
          "HIPAA does not ban dental practices from social media. It draws two lines: you need a patient's written authorization to post their photo or testimonial, and you cannot reveal that someone is your patient when you reply to a review. Get either wrong and a routine marketing task becomes a HIPAA disclosure. Here is what counts, and what OCR has enforced.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-penalty-igbinadolor-dental-review-disclosure.webp",
        alt: "Exhibit from the HHS Office for Civil Rights enforcement action against Igbinadolor D.M.D. and Associates: OCR found the North Carolina dental practice disclosed a patient's information in a public reply to an online review and imposed a $50,000 civil monetary penalty.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          { text: "Civil monetary penalty against Igbinadolor D.M.D. and Associates (2022)", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html" },
          ". Highlights added by Hipsana: the $50,000 penalty and the patient information disclosed in the practice's reply to the review.",
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains the HIPAA rules for a dental practice's social media, including patient photos and review replies. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "Why this is the gap most practices miss" },
      {
        type: "p",
        runs: [
          "Posting before-and-after photos and replying to Google reviews are ordinary marketing for a modern practice. They are also two of the few HIPAA mistakes OCR has taken action against dental offices for by name, in ",
          { text: "public enforcement records you can read on hhs.gov", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "The reason practices slip is that \"social media\" feels like one topic with one rule (\"get consent\"). It is actually two different rules from two different parts of the Privacy Rule, and the second one surprises people. Replying to a bad review at all, in a way that confirms the person was your patient, is a disclosure of protected health information. You can break HIPAA without sharing a single clinical detail.",
        ],
      },
      { type: "h2", text: "Social media's two HIPAA rules, not one" },
      {
        type: "p",
        runs: [
          { strong: "Rule 1: posting about a patient is marketing. " },
          "Under ",
          { text: "45 CFR 164.508", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.508" },
          ", a covered practice needs a signed authorization before it uses a patient's PHI for marketing. A before-and-after photo or a named patient testimonial is marketing, and each one needs written authorization first. The Privacy Rule's narrow exceptions to that requirement (a treatment communication or a face-to-face conversation) do not cover a promotional post built around a patient. Routine treatment and billing never need authorization, but promoting your practice with a patient's image or words does.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Rule 2: responding to a review is a disclosure. " },
          "Under ", { text: "45 CFR 164.502(a)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502" }, ", you may not disclose PHI except as the rule permits. The fact that a named individual is your patient is itself PHI. So when you reply \"Thanks for being a valued patient, please call the office,\" you have confirmed publicly that the reviewer is your patient. Add any detail about their visit and the disclosure gets worse. This is the rule that catches dentists who are only trying to be polite or to defend their reputation.",
        ],
      },
      { type: "h2", text: "What OCR has actually enforced against dental practices" },
      {
        type: "p",
        runs: [
          "These are not hypotheticals. Three dental practices have paid OCR over this exact behavior, and ",
          { text: "OCR has kept enforcing it", href: "/articles/dental-hipaa-breach-and-enforcement-report" },
          ":",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Igbinadolor D.M.D. and Associates (North Carolina): $50,000 (2022). " },
          "A patient posted a negative review on the practice's Google page under a pseudonym. The same day, the practice replied and named the patient three times, disclosing their symptoms and the recommended treatment. OCR imposed a ", { text: "$50,000 civil money penalty", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/upi/index.html" }, " for an impermissible disclosure under 164.502(a). The practice made its position worse by ignoring OCR's data request and subpoena and not contesting the findings.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "New Vision Dental (California): $23,000 (2022). " },
          "The owner responded to negative Yelp reviews by posting patients' information. OCR's settlement required a $23,000 payment, a corrective action plan, two years of monitoring, and a public substitute notice of the disclosure.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Elite Dental Associates (Texas): $10,000 (2019). " },
          "Responding to a patient's review, the practice posted her name, treatment plan details, and her insurance and cost information. OCR found the practice had done the same on other reviews and had no policy for releasing PHI on social media, with gaps in its Notice of Privacy Practices.",
        ],
      },
      {
        type: "p",
        runs: [
          "The pattern is identical across all three: a public reply meant to set the record straight that revealed a patient. OCR's actions here have run from a $10,000 settlement to a $50,000 penalty, and the statutory penalties run far higher.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Before your next one-star review tempts a detailed reply: most practices have never checked whether their review and social-media habits expose them this way. The free HIPAA Scorecard surfaces the gaps in a few minutes, then a short expert review walks you through what to fix first. " },
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "What can a dental practice post safely?" },
      {
        type: "p",
        runs: [
          "Almost anything that does not identify a patient is fine. General oral-health tips, procedure explainers in the abstract, team introductions, office tours, new-equipment news, community events, and promotions are all clear of HIPAA, because none of them reveal who your patients are. The same content tied to \"here's how we fixed Sarah's smile\" is not safe, unless Sarah signed an authorization.",
        ],
      },
      {
        type: "table",
        headers: ["Safe to post (no authorization)", "Needs written authorization first", "Never post (even with a casual \"ok\")"],
        rows: [
          ["Oral-health tips and general procedure explainers", "Before-and-after photos of a patient", "A reply that names or confirms a reviewer is your patient"],
          ["Team highlights, office tours, equipment news", "Patient testimonials (named or identifiable)", "Clinical details about a specific person, publicly"],
          ["Promotions, hours, community events", "\"Patient of the month\" or case stories", "Another patient's information to rebut a reviewer"],
          ["De-identified educational images (no identifiers)", "Reposting a patient's own public testimonial about you", "PHI in comments, DMs, or \"private\" groups"],
        ],
      },
      { type: "h2", text: "How to respond to a negative review without breaking HIPAA" },
      {
        type: "p",
        runs: [
          "You can respond. You just cannot confirm the person is your patient or reference their care. A safe reply stays generic and steers the conversation offline, without ever acknowledging treatment.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            label: "Do not confirm they are a patient",
            detail: "Write a statement that would read the same to any visitor, for example: \"We take all feedback seriously and follow strict patient-privacy laws that limit what we can discuss publicly.\"",
          },
          {
            label: "Move it offline",
            detail: "Invite the person to call the office or email a named contact so a manager can help. Offline, once you have confirmed who they are, you can speak freely.",
          },
          {
            label: "Never correct the record with PHI",
            detail: "Resist the urge to explain \"you actually missed two appointments\" or \"your insurance denied the claim.\" That is the exact move that cost Igbinadolor $50,000.",
          },
          {
            label: "Apply one policy to every review",
            detail: "Use the same template for good and bad reviews, so a generic reply never reads as an admission. Write the policy down so whoever manages the accounts follows it.",
          },
          {
            label: "Consider not replying at all",
            detail: "A no-reply approach is always HIPAA-safe. Offline outreach often resolves more than a public reply does.",
          },
        ],
      },
      { type: "h2", text: "What does a compliant photo authorization need?" },
      {
        type: "p",
        runs: [
          "A valid HIPAA authorization (164.508) is a signed document, not a verbal yes and not a line buried in your intake paperwork. At a minimum it names the patient, describes exactly what will be shared (for example, intraoral before-and-after photos), says where and how long it will be used (your Instagram and website) and who may see it, and tells the patient they can revoke it in writing. It is signed and dated. The ADA publishes sample authorization forms in its HIPAA compliance manual. Keep the signed form on file. If OCR ever asks, \"we had verbal permission\" is not a defense.",
        ],
      },
      {
        type: "p",
        runs: [
          "For a photo of a child patient, the authorization has to come from the parent or guardian who is the child's ", { text: "personal representative", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502#p-164.502(g)" }, " under HIPAA.",
        ],
      },
      {
        type: "p",
        runs: [
          "\"Anonymized\" is not a magic word. ",
          { text: "HHS's de-identification standard", href: "https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html" },
          " treats a full-face photograph as one of the 18 identifiers that must be removed. An image counts as de-identified only once every identifier is gone and you have no reason to think the person could still be recognized. Cropping a face helps, but a distinctive smile, a caption, your account, or the photo's hidden metadata can still point to one patient. The safe default for any patient-specific image is a signed authorization.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h2", text: "The catch: edge cases that trip practices up" },
      {
        type: "p",
        runs: [
          { strong: "A patient's chart in the background. " },
          "The most common slip is not a testimonial at all. It is a team photo or an office reel with a screen or a chart visible behind everyone. If a patient's information is readable in the frame, posting it is a disclosure, the same as naming them.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Staff personal accounts. " },
          "A hygienist posting \"crazy case today\" from their own phone is still your exposure if it reveals a patient. Your social-media policy has to cover personal accounts, not only the practice page.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Your social-media manager may be a business associate. " },
          "If you hand patient information to an outside marketing or social-media agency (to pull a testimonial, say), that vendor is ", { text: "handling PHI on your behalf", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-160/subpart-A/section-160.103" }, " and generally needs ",
          { text: "a signed business associate agreement", href: "/articles/does-my-dental-practice-need-a-baa" },
          ". Posting non-patient content does not trigger this; handling PHI does.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "The patient who shares first. " },
          "If a patient publicly posts their own before-and-after or tags your office, that is their disclosure, not yours. But the moment you repost or add your own detail, it becomes your disclosure. Resharing for marketing still needs authorization.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "Deleting is not undoing. " },
          "Removing a non-compliant post lowers ongoing exposure, but it does not undo a disclosure that already happened. Under ", { text: "45 CFR 164.402", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-D/section-164.402" }, ", any impermissible disclosure of unsecured PHI is presumed to be a reportable breach unless you document a risk assessment showing a low probability that the information was compromised, which is hard to show for something posted in public. A public slip can carry breach-notification duties even after the post is gone.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "State law can be stricter. " },
          "HIPAA is ", { text: "the federal floor", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-160/subpart-B/section-160.203" }, ". Several states add tighter rules on patient images and dental records. Where your state is stricter, follow the stricter rule.",
        ],
      },
      { type: "h2", text: "What to do this week" },
      {
        type: "p",
        runs: [
          "Two moves cover most of the risk. First, write or update a one-page social-media policy that names the two rules above and applies to personal accounts, the same way you would set ",
          { text: "a policy for staff handling patient data", href: "/articles/staff-free-ai-tools-patient-data-dental-policy" },
          ". Second, switch your review replies to a single generic template starting today, before the next one-star review tempts a detailed rebuttal.",
        ],
      },
      {
        type: "p",
        runs: [
          "If you are not sure where your current gaps are, the free HIPAA Scorecard checks your practice against the controls OCR actually enforces, including the marketing and disclosure points behind every case above. It takes a few minutes and ends with a short, no-pressure expert review. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      {
        type: "p",
        runs: [
          "This is general information about HIPAA and social media, not legal advice. Your own situation, and any stricter rules in your state, decide what applies to your specific practice.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, Notice of Proposed Determination, U. Phillip Igbinadolor, D.M.D. & Associates, P.A., OCR Transaction No. 16-225168 (October 2020; $50,000 civil monetary penalty announced 2022)."],
          ["HHS Office for Civil Rights, Resolution Agreement and Corrective Action Plan, New Vision Dental (2022)."],
          ["HHS Office for Civil Rights, Resolution Agreement and Corrective Action Plan, Elite Dental Associates (2019)."],
          ["HHS Office for Civil Rights, “Guidance Regarding Methods for De-identification of Protected Health Information” (the 18 identifiers and the de-identification standard; accessed June 2026)."],
          ["American Dental Association, sample HIPAA patient authorization forms (HIPAA compliance manual; accessed June 2026)."],
          ["45 CFR \u00a7 164.508 (uses and disclosures for which an authorization is required, including marketing); \u00a7 164.502(a) (general rules for uses and disclosures); \u00a7 164.502(g) (personal representatives); \u00a7 164.514(b) (de-identification); \u00a7 164.402 (breach definition and presumption); \u00a7 160.103 (definitions, including business associate); \u00a7 160.203 (preemption) (eCFR, current)."],
        ],
      },
    ],
    faq: [
      {
        question: "Can I respond to a Google or Yelp review as a dentist?",
        answer: "Yes, but only with a generic statement that does not confirm the reviewer is your patient or mention their care. Naming them or referencing treatment is an impermissible disclosure, which is what led to OCR's $50,000 penalty against a North Carolina practice.",
      },
      {
        question: "Do I need consent to post before-and-after photos?",
        answer: "Yes. Patient photos used to promote your practice are marketing under HIPAA, so you need a signed authorization (45 CFR 164.508) before posting. A verbal yes is not sufficient.",
      },
      {
        question: "Can I ask a patient to take down a negative review?",
        answer: "You can ask, and you can reply, but two limits apply. You cannot reveal any of their health information while doing it, and you cannot make their care conditional on removing the review or retaliate if they keep it. The safe path is a generic public reply plus a private, offline invitation to make it right. Pressuring a patient by airing details of their treatment is exactly what OCR penalizes.",
      },
      {
        question: "Can I repost a testimonial the patient wrote themselves?",
        answer: "A patient sharing their own experience is their choice. But the moment you republish it on your channels to attract patients, you are using their PHI for marketing and need a signed authorization.",
      },
      {
        question: "Is it okay if the photo does not show the patient's face?",
        answer: "Lower risk, but not automatically safe. A full-face image is a HIPAA identifier, and even a cropped one can still identify a patient through its caption or your account. For any patient-specific image, get written authorization.",
      },
      {
        question: "Can my staff post about patients from their personal accounts?",
        answer: "No. The same rules apply, and it is still your practice's liability. Your staff data-handling policy should explicitly cover personal devices and accounts.",
      },
      {
        question: "What if we already posted something we should not have?",
        answer: "Take it down and document what happened. Then run the breach risk assessment to see whether notification is required. Then fix the policy so it does not happen again.",
      },
    ],
  },
  {
    slug: "dental-hipaa-breach-and-enforcement-report",
    status: "published",
    kind: "report",
    title: "Dental HIPAA Breach and Enforcement Report (2026)",
    metaTitle: "Dental HIPAA Breaches & Fines: 2026 Data",
    description: "We read the public HHS data so you don't have to: how dental practices actually get breached, and the one failure OCR keeps fining them for in 2026.",
    author: "Dolev Arama",
    datePublished: "2026-06-17",
    dateModified: "2026-06-18",
    body: [
      {
        type: "p",
        runs: [
          "The largest known exposure of dental patients' data, an estimated 15 million records, never appeared on the public breach list at all. It surfaced only in 2026, when federal regulators settled with the dental-software vendor that lost the data in 2020 and never reported the loss. The largest breach a dental provider actually reported is smaller and better known: the 2023 ransomware attack on MCNA Dental, which exposed 8.9 million people. Both numbers point the same way. Dental data rarely leaks because a master hacker beat a hardened wall. It leaks through an ordinary failure, a compromised login, a compromised vendor, or ransomware behind one of them, and the failure regulators punish afterward is rarely the breach itself. It is the one document underneath it that most independent practices begin and never finish. We read the public HHS data so you can see both patterns plainly, and what they mean for a practice your size."
        ]
      },
      {
        type: "h2",
        text: "The short version"
      },
      {
        type: "ul",
        items: [
          [
            {
              strong: "The public data is clear, and we did the reading. "
            },
            "Every figure here comes from HHS's own breach portal, its annual reports to Congress, and its published settlements. We do not sell compliance services, so this is a read of the record, not a sales pitch."
          ],
          [
            {
              strong: "Dental breaches almost never start with a sophisticated hack. "
            },
            "The most common reported cause is ransomware, and the entry point behind it is usually a compromised login or a vendor with access to your systems. A direct break-in is rare."
          ],
          [
            {
              strong: "OCR changed what it punishes. "
            },
            "Since late 2024, its Risk Analysis Initiative has treated the missing risk analysis, not the breach, as the violation. The attacker is the trigger; the unaddressed gap is the finding."
          ],
          [
            {
              strong: "The fines are not reserved for the giants. "
            },
            "A dental software vendor settled for $10,000. A treatment center with fewer than 2,000 patients paid $103,000 and rebuilt its program under two years of federal monitoring."
          ],
          [
            {
              strong: "The control OCR cites most is the one the Scorecard checks first. "
            },
            "See where your practice stands in about three minutes. ",
            {
              text: "Check my practice →",
              href: "/scorecard"
            }
          ]
        ]
      },
      {
        type: "p",
        runs: [
          {
            strong: "The short answer: "
          },
          "the public record tells two stories at once. Dental practices get breached through ransomware, compromised email, and compromised vendors, ordinary failures rather than exotic attacks. And when OCR investigates, it increasingly fines the practice for never having run an accurate, thorough risk analysis, the foundation the entire Security Rule sits on at ", { text: "45 CFR § 164.308(a)(1)(ii)(A)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308" }, ". The breach gets the headlines. The missing risk analysis gets the penalty."
        ]
      },
      {
        type: "p",
        runs: [
          "This report explains how dental practices actually get breached and the one failure OCR keeps fining them for. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      {
        type: "image",
        src: "/ocr-risk-analysis-initiative-settlements.webp",
        alt: "Bar chart of four 2024 to 2026 HIPAA settlements under OCR's Risk Analysis Initiative: Health Fitness Corporation $227,816 for a misconfigured server, Top of the World Ranch $103,000 for a phishing email, Bryan County Ambulance Authority $90,000 for ransomware, and MMG Fusion $10,000 for dental software that posted patient data online. The breaches and amounts differ, but OCR's finding in every case was the same: failure to conduct a risk analysis under 45 CFR 164.308(a)(1)(ii)(A).",
        width: 1500,
        height: 760,
        caption: [
          "Selected settlements under OCR's Risk Analysis Initiative, 2024 to 2026: four different triggers, one recurring finding. Source: HHS / OCR settlement announcements.",
        ],
      },
      {
        type: "h2",
        text: "What this report covers"
      },
      {
        type: "p",
        runs: [
          "This is a plain reading of two public datasets that rarely get read together: the breaches healthcare practices report to the federal government, and the settlements the government reaches with them afterward. One shows how patient data actually leaks. The other shows what it costs when regulators get involved, and why. We pointed the lens at dental and small independent practices, because the published numbers say something specific about practices your size, and most summaries miss it."
        ]
      },
      {
        type: "h2",
        text: "How dental practices actually get breached"
      },
      {
        type: "p",
        runs: [
          "Start with the scale. In 2024, the most recent full year HHS has ", { text: "reported to Congress", href: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/reports-congress/index.html" }, ", it received 742 reports of large breaches, those affecting 500 or more people, with 663 of them for breaches that occurred that year. Across those, the records of more than 242 million individuals were exposed or impermissibly disclosed, an annual record. One incident drove most of it: the ransomware attack on the billing clearinghouse Change Healthcare alone accounted for an estimated 192 million. Hacking and IT incidents were the leading cause by far, 81% of the large breaches that year, and the trend has not reversed: 2025 set a new record, with 772 large breaches reported."
        ]
      },
      {
        type: "p",
        runs: [
          "That large-breach list is the part of the iceberg above the water. The same year, HHS received 74,299 reports of breaches affecting fewer than 500 people. Those smaller incidents, the kind a solo practice is far likelier to have, are not posted by name; federal law only requires public listing of the breaches affecting 500 or more. So when you read the named cases below, remember they are the visible minority. Most small-practice breaches never appear with a name attached."
        ]
      },
      {
        type: "h3",
        text: "The dental cases, by the numbers"
      },
      {
        type: "p",
        runs: [
          "Filter ", { text: "the public breach portal", href: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf" }, " to dental and oral-health organizations and a clear shape appears. The headline numbers come from large dental insurers and software vendors, the entities that hold millions of records at once. The cause, almost every time, is mundane."
        ]
      },
      {
        type: "table",
        headers: [
          "Dental organization",
          "Year",
          "People affected",
          "Reported cause"
        ],
        rows: [
          [
            "MCNA Dental",
            "2023",
            "~8.9 million",
            "Ransomware (LockBit)"
          ],
          [
            "Delta Dental of California",
            "2023",
            "~6.9 million",
            "Vendor / supply chain (MOVEit)"
          ],
          [
            "Absolute Dental (NV)",
            "2025",
            "~1.2 million",
            "Compromised IT-vendor account"
          ],
          [
            "First Choice Dental (WI)",
            "2023",
            "228,287",
            "Ransomware"
          ],
          [
            "Chord Specialty Dental Partners (DSO)",
            "2024",
            "173,430",
            "Compromised employee email"
          ],
          [
            "Delta Dental of Virginia",
            "2025",
            "145,918",
            "Compromised employee email"
          ],
          [
            "32 Pearls (WA)",
            "2025",
            "23,517",
            "Ransomware"
          ],
          [
            "Olde Towne Medical & Dental (VA)",
            "2025",
            "2,567",
            "Ransomware"
          ]
        ],
        caption: "Selected dental-sector breaches, with the cause as reported to regulators or in public breach notices, as of June 2026. The MMG Fusion exposure is discussed below; it never appeared on the public portal. Each figure is the count the organization reported as affected or notified; where the HHS portal shows a different number, the note below the table explains why."
      },
      {
        type: "p",
        runs: [
          "The portal figure is only as current as the last form an organization filed. HHS tells an entity that is unsure of the total at filing to ",
          { text: "report an estimate and update it later through an addendum", href: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/breach-reporting/index.html" },
          ". So a portal entry and a later notification letter can disagree. First Choice Dental's entry still shows 1,000, the interim count filed in 2023, while its own notification letters put the figure far higher. Delta Dental of Virginia went the other way, its entry revised down to 126,953, below the 145,918 in its own notices. The figures above are the count each organization reported as affected or notified."
        ]
      },
      {
        type: "p",
        runs: [
          "Read down the last column. The biggest dental breach on record, MCNA Dental in 2023, was ransomware. The next largest came in through trusted access rather than a forced entry: Delta Dental of California through the MOVEit flaw in a file-transfer vendor, Absolute Dental through a single compromised account belonging to its outside IT vendor, and both Chord Specialty Dental Partners and Delta Dental of Virginia through a staff email account an attacker had quietly taken over. The smaller cases follow the same script, ransomware that locked the files at a Washington practice and a Virginia clinic. What they share is not sophistication. Security researchers who track dental breaches keep finding the same thing underneath the ransomware, a trusted login or a trusted vendor rather than a direct break-in of a hardened system. The door tends to be unlocked before the attacker arrives. Which vendors hold a key is the question behind every ",
          {
            text: "business associate agreement",
            href: "/articles/does-my-dental-practice-need-a-baa"
          },
          ", and ",
          {
            text: "a breach is a clock that starts the moment you find it",
            href: "/articles/dental-data-breach-response"
          },
          "."
        ]
      },
      {
        type: "h2",
        text: "What OCR actually fines you for"
      },
      {
        type: "p",
        runs: [
          "Here is where the second dataset matters more than the first. OCR's Risk Analysis Initiative, whose first settlement landed in October 2024, was a deliberate decision to concentrate enforcement on a single failure the agency kept finding behind breach after breach: regulated entities that never performed a complete, accurate risk analysis of where their patient data lives and what threatens it. OCR's position, stated more plainly with each settlement, is that this failure is itself the violation. The attacker who encrypted the files did not create the legal exposure. The gap an honest risk analysis should have caught, and a real plan should have closed, did."
        ]
      },
      {
        type: "p",
        runs: [
          "The settlements that have come out of the initiative make the point better than any summary. The breach that drew OCR's attention is different every time. The finding is the same every time."
        ]
      },
      {
        type: "table",
        headers: [
          "Entity",
          "Announced",
          "Settlement",
          "What triggered it",
          "What OCR found"
        ],
        rows: [
          [
            "Bryan County Ambulance Authority (OK)",
            "2024",
            "$90,000",
            "Ransomware",
            "No risk analysis"
          ],
          [
            "MMG Fusion (dental software)",
            "2026",
            "$10,000",
            "PHI exposed and posted online",
            "No risk analysis; failed to notify clients"
          ],
          [
            "Health Fitness Corporation",
            "2025",
            "$227,816",
            "Server left misconfigured",
            "No risk analysis"
          ],
          [
            "Top of the World Ranch",
            "2026",
            "$103,000",
            "Phishing email",
            "No risk analysis"
          ]
        ],
        caption: "Selected settlements under OCR's Risk Analysis Initiative: different triggers, one recurring finding. Source: HHS Office for Civil Rights settlement announcements."
      },
      {
        type: "p",
        runs: [
          "Primary sources: ",
          { text: "Bryan County", href: "https://www.hhs.gov/about/news/2024/10/31/hhs-office-for-civil-rights-settles-hipaa-ransomware-cybersecurity-investigation-for-90000-dollars.html" },
          ", ",
          { text: "MMG Fusion", href: "https://www.hhs.gov/press-room/ocr-mmg-fusion-hipaa-agreement.html" },
          ", ",
          { text: "Health Fitness Corporation", href: "https://www.hhs.gov/press-room/ocr-settles-hipaa-security-rule-investigation-health-fitness-corporation.html" },
          ", ",
          { text: "Top of the World Ranch", href: "https://www.hhs.gov/press-room/ocr-settles-hipaa-security-rule-investigation-twrtc.html" },
          ", ",
          { text: "PIH Health", href: "https://www.hhs.gov/press-room/ocr-hipaa-racap-pih.html" },
          ", and the ",
          { text: "four April 2026 ransomware settlements", href: "https://www.hhs.gov/press-room/ocr-settles-four-ransomware-investigations.html" },
          "."
        ]
      },
      {
        type: "p",
        runs: [
          "The dollar figures range widely, from the $10,000 paid by the dental software vendor MMG Fusion to the $227,816 paid by a wellness company for a server left exposed for nearly three years, with settlements like Behavioral Health Solution of Deer Oaks at $225,000 and a Syracuse surgery center at $250,000 in between. Across the settlements we reviewed, the breach that triggered the investigation was almost always ransomware, with a few phishing emails, a misconfigured server, and a vendor breach making up the rest, but the violation OCR cited was the same missing risk analysis in every one. The full list is in the appendix below. The check is never the real cost. Every settlement carries a corrective action plan, often monitored for two to three years, that orders the practice to build the program it skipped. By the middle of 2026, OCR had collected more than $1.2 million across ",
          { text: "six enforcement actions", href: "https://www.hhs.gov/press-room/ocr-settles-four-ransomware-investigations.html" },
          " in that year alone. ",
          {
            text: "An OCR investigation",
            href: "/articles/what-happens-if-dental-practice-fails-hipaa-audit"
          },
          " is an expensive and public way to be told to do the paperwork."
        ]
      },
      {
        type: "p",
        runs: [
          "Note who turns up on that list. MMG Fusion is a dental software vendor, and OCR fined it not only for failing to run a risk analysis but for failing to tell the dental practices it served that their patients' data had been exposed. The initiative is not aimed at dentistry. Dentistry is not exempt from it."
        ]
      },
      {
        type: "h2",
        text: "What this means for an independent practice"
      },
      {
        type: "p",
        runs: [
          "Put the two datasets side by side and the instruction for a small practice writes itself. Breaches arrive through ordinary doors: ransomware, a compromised inbox, a vendor with access. Fines arrive through one document: the risk analysis that was never finished. In its 2024 report, OCR named the failures it keeps finding underneath these cases, incomplete risk analyses, user accounts with more access than they need, and weak authentication like default passwords and single-factor remote logins. None of that is exotic. It is the same handful of safeguards a small practice can put in place on purpose, for a fraction of what a settlement costs. ",
          {
            text: "What that program runs per year",
            href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice"
          },
          " is its own question, and ",
          {
            text: "the risk analysis is the line item everything else depends on",
            href: "/articles/do-dental-practices-need-hipaa-risk-assessment"
          },
          "."
        ]
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          {
            strong: "The cheapest version of this is the one you build before OCR builds it for you. "
          },
          "The Scorecard checks the areas OCR most commonly cites and sends you a short written read of where your practice stands. About three minutes, no cost. ",
          {
            text: "Check my practice →",
            href: "/scorecard"
          }
        ]
      },
      {
        type: "h2",
        text: "How we compiled this report"
      },
      {
        type: "p",
        runs: [
          "This report reads two public datasets together, as of June 2026. The aggregate figures, the annual breach counts and the share by cause, come from the HHS annual Reports to Congress on breaches of unsecured protected health information, the agency's own tally. The named breach cases come from the HHS Office for Civil Rights breach portal, which by law lists only breaches affecting 500 or more people, supplemented where a case was not yet posted by company and state breach notices and by the reporting of the HIPAA Journal and Becker's Dental Review. Settlement details come from OCR's own enforcement announcements, linked above and listed in the appendix."
        ]
      },
      {
        type: "p",
        runs: [
          "To build the dental breach table, we filtered the breach record to dental insurers, dental service organizations, and dental practices, and kept the largest cases alongside a few smaller ones that show what a typical practice faces. To build the enforcement table and the appendix, we read every settlement OCR has publicly tied to its Risk Analysis Initiative since the first one in October 2024, the agency's own count placed the March 2026 MMG Fusion settlement at its twelfth, and recorded for each the breach that triggered it and the violation OCR found. In every settlement we reviewed, that violation was a failure to conduct an accurate and thorough risk analysis under ", { text: "45 CFR § 164.308(a)(1)(ii)(A)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C/section-164.308" }, "."
        ]
      },
      {
        type: "p",
        runs: [
          "Two limits are worth stating plainly. Counts move: where a breach total was still being finalized we have marked it approximate, and where a vendor never reported a breach, as with MMG Fusion, the figure is OCR's later estimate rather than a portal entry. And this is a read of the public record, not legal advice; we are not a law firm. We update these figures as the record changes and we date every version, most recently in June 2026. Verify any specific number against the primary source before relying on it."
        ]
      },
      {
        type: "h2",
        text: "Appendix: the settlements we reviewed"
      },
      {
        type: "p",
        runs: [
          "These are the settlements under OCR's Risk Analysis Initiative for which we could confirm the breach that triggered the investigation, listed by announcement date. In each, OCR's cited violation was the same: a failure to conduct an accurate, thorough risk analysis under 45 CFR 164.308(a)(1)(ii)(A). OCR has announced others we have not detailed here, including Behavioral Health Solution of Deer Oaks ($225,000) and Concentra ($112,500)."
        ]
      },
      {
        type: "table",
        headers: [
          "Entity",
          "Announced",
          "Settlement",
          "Triggering breach"
        ],
        rows: [
          ["Bryan County Ambulance Authority (OK)", "Oct 2024", "$90,000", "Ransomware"],
          ["Elgon Information Systems (MA)", "Jan 2025", "$80,000", "Ransomware"],
          ["Northeast Surgical Group (MI)", "Jan 2025", "$10,000", "Ransomware"],
          ["Health Fitness Corporation (IL)", "Mar 2025", "$227,816", "Misconfigured server"],
          ["Guam Memorial Hospital (GU)", "Apr 2025", "$25,000", "Ransomware"],
          ["Comstar (MA)", "May 2025", "$75,000", "Ransomware"],
          ["PIH Health (CA)", "Apr 2025", "$600,000", "Phishing"],
          ["Syracuse surgery center (NY)", "Jul 2025", "$250,000", "Ransomware"],
          ["Top of the World Ranch (IL)", "Feb 2026", "$103,000", "Phishing"],
          ["MMG Fusion (MD)", "Mar 2026", "$10,000", "Vendor breach (unreported)"],
          ["Assured Imaging (AZ/CA)", "Apr 2026", "$375,000", "Ransomware"],
          ["Regional Women's Health Group (Axia) (NJ/PA)", "Apr 2026", "$320,000", "Ransomware"],
          ["Consociate Health (IL)", "Apr 2026", "$225,000", "Ransomware"],
          ["Star Group Health Benefits Plan (CT)", "Apr 2026", "$245,000", "Ransomware"]
        ],
        caption: "Selected settlements under OCR's Risk Analysis Initiative, by announcement date. Source: HHS Office for Civil Rights enforcement announcements. The financial penalty is rarely the largest cost; each settlement also carries a corrective action plan, typically monitored for two to three years."
      },
      {
        type: "h2",
        text: "How to cite this report"
      },
      {
        type: "p",
        runs: [
          "Journalists, researchers, and writers are welcome to cite this report. A suggested citation:"
        ]
      },
      {
        type: "quote",
        runs: [
          "Hipsana, Dental HIPAA Breach and Enforcement Report (2026), https://hipsana.com/articles/dental-hipaa-breach-and-enforcement-report"
        ]
      }
    ],
    faq: [
      {
        question: "How many healthcare data breaches happen each year?",
        answer: "In 2024, the most recent year HHS has reported to Congress, it received 742 reports of breaches affecting 500 or more people, and across the breaches that occurred that year, more than 242 million individuals' records were exposed, plus another 74,299 smaller breaches affecting fewer than 500 people each. The smaller breaches, the kind a solo practice is likeliest to have, are reported to HHS but not posted publicly by name."
      },
      {
        question: "What is the largest dental data breach?",
        answer: "The largest a dental provider has reported is the 2023 ransomware attack on MCNA Dental, which exposed the records of roughly 8.9 million people after the LockBit group copied hundreds of gigabytes of data and published it when MCNA refused to pay. The second largest reported was Delta Dental of California, with about 6.9 million people affected through the MOVEit supply-chain attack the same year. A larger exposure, an estimated 15 million records held by the dental-software vendor MMG Fusion, never appeared on the public breach list; it surfaced only when OCR settled with the vendor in 2026 over a 2020 breach it had never reported."
      },
      {
        question: "What does OCR actually fine dental and medical practices for?",
        answer: "Increasingly, for failing to conduct an accurate and thorough risk analysis, the foundational requirement of the HIPAA Security Rule at 45 CFR 164.308(a)(1)(ii)(A). Since late 2024, OCR's Risk Analysis Initiative has treated the missing risk analysis, rather than the breach that exposed it, as the central violation in case after case."
      },
      {
        question: "How large are HIPAA fines for small practices?",
        answer: "They vary widely. Recent settlements range from $10,000 paid by a dental software vendor to six-figure amounts in ransomware cases, with a small Illinois treatment center paying $103,000 and a wellness company paying $227,816. The financial penalty is rarely the largest cost; nearly every settlement also includes a corrective action plan monitored for two to three years."
      },
      {
        question: "What is the OCR Risk Analysis Initiative?",
        answer: "An enforcement focus the HHS Office for Civil Rights launched in 2024 to concentrate its resources on a single recurring failure: organizations that never performed a complete risk analysis of their electronic patient data. Its first settlement, with an Oklahoma ambulance service, came in October 2024, and OCR has resolved more than a dozen cases under it since, with the agency signaling it will extend the same scrutiny to risk management, acting on what the analysis finds, next."
      },
      {
        question: "How do most dental data breaches start?",
        answer: "Across the public cases, the most common reported cause is ransomware, and the entry point behind it is almost always a compromised login or a vendor with access to the practice's systems, not a direct break-in. The common thread is a trusted login or a trusted third party, not a sophisticated attack."
      },
      {
        question: "Do small dental practices really get investigated?",
        answer: "Yes. Federal regulators have settled with single-location providers and practices with fewer than 2,000 patients specifically to show that size is not a defense. A breach is what draws OCR's attention; the state of your compliance program is what determines the outcome."
      }
    ]
  },
  {
    slug: "parental-access-to-a-childs-dental-records",
    status: "published",
    title: "Parental Access to a Child's Dental Records: What HIPAA Requires (2026)",
    metaTitle: "Parental Access to a Child's Dental Records",
    description: "Under HIPAA, a parent is usually a child's personal representative and can get the dental records, with exceptions. OCR made it an enforcement priority in 2025.",
    author: "Dolev Arama",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    body: [
      {
        type: "p",
        runs: [
          "In 2022, a Las Vegas dental practice paid $25,000 to settle a federal HIPAA case. The trigger was not a breach or a hacker. A mother had asked for copies of her own and her child's dental records, and the practice spent more than eight months not handing them over.",
        ],
      },
      {
        type: "p",
        runs: [
          "Under HIPAA, a parent is usually their child's personal representative, which generally gives them the right to see and get a copy of the child's dental records, the same right the patient would have. A handful of situations change that, and state law sets some of the edges. But for routine dental care, the parent of an unemancipated minor can access the child's record, and the mistake that gets practices penalized is almost always the opposite of what you would expect: not handing records to the wrong person, but wrongly refusing a parent who had every right to them.",
        ],
      },
      {
        type: "p",
        runs: [
          "This is now a federal enforcement priority. On December 3, 2025, the HHS Office for Civil Rights (OCR) sent ",
          { text: "a letter to HIPAA-covered providers", href: "https://www.hhs.gov/sites/default/files/ocr-letter-hipaa-privacy-rule-and-parental-access-to-minor-childrens-medical-records.pdf" },
          " warning that parents are being denied access to their children's records, and stating that OCR will use all civil remedies available, including civil money penalties, to enforce the rule. That Las Vegas case, ",
          { text: "Paradise Family Dental", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/paradise/index.html" },
          ", is exactly the kind it has in mind.",
        ],
      },
      {
        type: "image",
        src: "/ocr-hipaa-settlement-paradise-dental-parental-access.webp",
        alt: "Exhibit from the HHS Office for Civil Rights enforcement action against Paradise Family Dental: OCR found the Las Vegas dental practice failed to give a mother timely access to her own and her minor child's records, and the practice agreed to a $25,000 settlement, one of three dental right-of-access settlements OCR announced that day in September 2022.",
        width: 1500,
        height: 760,
        caption: [
          "Source: U.S. Department of Health and Human Services, Office for Civil Rights. ",
          { text: "Resolution agreement with Paradise Family Dental (September 2022)", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/paradise/index.html" },
          ". Highlights added by Hipsana: the $25,000 settlement, the eight-plus months the records were delayed, and that it was one of three dental practices OCR settled with the same day.",
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains what HIPAA requires for a parent's access to a child's dental records. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "Does a parent have the right to their child's dental records?" },
      {
        type: "p",
        runs: [
          "In most cases, yes. Under ",
          { text: "45 CFR 164.502(g)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502" },
          ", a covered entity must treat a person who has authority under applicable law to make health care decisions for an unemancipated minor as that child's personal representative. A personal representative stands in the patient's shoes, exercising the patient's rights, including the ",
          { text: "right of access", href: "/articles/how-to-handle-a-patient-records-request-dental-practice" },
          " to the record. Because a parent usually has the authority to make health decisions for their child, the parent is usually the child's personal representative, and the practice owes them the same access the patient would get.",
        ],
      },
      {
        type: "p",
        runs: [
          "OCR stated it plainly in its December 2025 letter: in most cases a parent is the personal representative of an unemancipated minor child, and the Privacy Rule generally gives the parent the right to access the child's records, unless one of the limited exceptions applies. For a dental office, the records at issue are the same designated record set any patient can request: the clinical chart, treatment notes, imaging, and the billing used to make decisions about that child. What the parent has a right to is a copy of that information, not the original chart, which the practice keeps. OCR's own fact sheet for parents, ",
          { text: "Am I My Child's \"Personal Representative\" Under HIPAA?", href: "https://www.hhs.gov/sites/default/files/am-i-my-childs.pdf" },
          ", confirms a parent who is the personal representative can get the child's complete record.",
        ],
      },
      { type: "h2", text: "Two different questions: who consents, and who gets the records" },
      {
        type: "p",
        runs: [
          "A lot of confusion at the front desk comes from blending two separate questions. The first is who may consent to the child's treatment. The second is who may get a copy of the child's records. They are not the same, and they can have different answers.",
        ],
      },
      {
        type: "p",
        runs: [
          "Consent to treatment is largely a matter of state law, and the American Dental Association's practice guidance notes that, as a practical matter, the parent who brings the child in is generally the one who authorizes that visit's care. Access to records is governed by HIPAA, plus any stricter state rule, and here the custody label does most of the damage. A parent who is the child's personal representative generally has access regardless of who brought the child in or who pays the bill. Treating \"the parent who pays\" or \"the parent with primary custody\" as the only one entitled to records is a common, avoidable error.",
        ],
      },
      { type: "h2", text: "The three times a parent is not the personal representative" },
      {
        type: "p",
        runs: [
          "HIPAA carves out three narrow situations where a parent is not the child's personal representative for some or all of the record. As OCR's December 2025 letter lists them:",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "The child consented to the care alone. " }, "When the child lawfully consents to a health care service and no parental consent is required under state law, the parent is not the personal representative for the records related to that care."],
          [{ strong: "A court directed the care. " }, "When the child gets care at the direction of a court, or a person the court appointed, the parent is not the representative for that care."],
          [{ strong: "The parent agreed to confidentiality. " }, "When the parent agrees that the child and the provider may have a confidential relationship, the parent's representative status is limited to the scope of that agreement."],
        ],
      },
      {
        type: "p",
        runs: [
          "OCR is explicit that these exceptions are generally limited to certain types of health care services, such as mental health care. Routine dental treatment rarely falls into one of these minor-consent categories, so for most dental visits the parent remains the personal representative. The caution is that state law decides the edges, and a dental record can occasionally touch a protected area, so confirm your state's minor-consent law rather than assuming.",
        ],
      },
      { type: "h2", text: "Can a non-custodial or divorced parent get the records?" },
      {
        type: "p",
        runs: [
          "Usually, yes. HIPAA does not distinguish between a custodial and a non-custodial parent. What matters is whether the parent still has the legal authority to make health decisions for the child, and that authority survives a divorce unless a court order or state law removes it.",
        ],
      },
      {
        type: "p",
        runs: [
          "State law often says this directly, and several states name dental records specifically. ",
          { text: "Texas Family Code 153.073", href: "https://statutes.capitol.texas.gov/Docs/FA/htm/FA.153.htm" },
          " gives a parent who is a conservator the right of access to the child's \"medical, dental, psychological, and educational records\" at all times, \"unless limited by court order.\" ",
          { text: "Louisiana law", href: "https://legis.la.gov/Legis/Law.aspx?d=107593" },
          " states that access to a minor child's medical, dental, and school records \"shall not be denied to a parent solely because he is not the child's custodial or domiciliary parent.\" The practical rule for the front desk: do not deny a parent based on custody alone. If a court order limits a parent's access, that is different, and staff may reasonably ask to see the relevant order or decree.",
        ],
      },
      {
        type: "p",
        runs: [
          "When parents are divorced or separated, three moves keep staff out of trouble:",
        ],
      },
      {
        type: "steps",
        items: [
          { label: "Don't deny based on custody alone", detail: "A parent who is the personal representative gets the records, and a parent usually stays the personal representative after a divorce, whether or not they have primary custody." },
          { label: "Ask for the court order only if access is supposedly limited", detail: "If a parent claims a custody or protective order restricts the other parent's access, ask to see that order and follow what it actually says, rather than guessing." },
          { label: "Don't require the other parent's sign-off", detail: "One parent who is the personal representative is enough. You do not need both parents to approve, and adding that step is the kind of extra barrier OCR's December 2025 letter warns against." },
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      { type: "h2", text: "When can a dental practice refuse a parent?" },
      {
        type: "p",
        runs: [
          "There are a few situations where you can, or must, say no. Each needs a specific basis, not a blanket policy.",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "An emancipated minor. " }, "Under ", { text: "164.502(g)(2)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502" }, ", an emancipated minor is generally treated like an adult, so a parent is not automatically the personal representative. Emancipation is defined by state law."],
          [{ strong: "Suspected abuse, neglect, or endangerment. " }, "A provider may decide not to treat a parent as the personal representative when, in the provider's professional judgment, the child has been or may be subjected to domestic violence, abuse, or neglect by that parent, or treating the parent as representative could endanger the child. OCR notes this requires an individualized, patient-specific determination."],
          [{ strong: "A specific minor-consent record. " }, "Where the minor lawfully consented to particular care alone, the parent may not get the records tied to that care, though OCR is clear the parent still gets the rest of the child's record."],
          [{ strong: "A court order. " }, "If a court order specifically limits a parent's access, follow it."],
        ],
      },
      {
        type: "p",
        runs: [
          "What you cannot do is invent a reason. OCR's December letter warns covered entities not to place additional limitations on a parent's access beyond any limits that already exist in applicable law, and not to require a child to authorize parental access where no law requires it.",
        ],
      },
      { type: "h2", text: "Who controls a child's dental records" },
      {
        type: "table",
        headers: ["Situation", "Who controls access to the records", "Where the rule comes from"],
        rows: [
          ["Routine dental care, unemancipated minor", "The parent, as personal representative", "45 CFR 164.502(g) (HHS)"],
          ["Care the minor lawfully consented to alone (e.g., certain mental-health or STI care), where state law allows", "The minor, for that care only", "Dec. 3, 2025 OCR letter; 164.502(g)(3)(i)(A)"],
          ["Care ordered by a court", "The minor / the court", "164.502(g)(3)(i)(B)"],
          ["Parent agreed to a confidential relationship for some care", "Limited to the scope of that agreement", "164.502(g)(3)(i)(C)"],
          ["Non-custodial parent, no court order limiting access", "Same access as the custodial parent", "State law, e.g., Tex. Fam. Code 153.073; La. R.S. 9:351"],
          ["Emancipated minor", "The minor (a parent is not automatically the representative)", "164.502(g)(2); state emancipation law"],
          ["Suspected abuse, neglect, or endangerment by the parent", "The practice may decline to treat the parent as representative", "164.502(g)(5)"],
          ["State law is stricter than HIPAA", "The stricter state rule applies", "45 CFR 160.203 (preemption)"],
        ],
        caption: "How parental access changes by situation. HIPAA is a federal floor; always confirm your state's law, which can be stricter.",
      },
      { type: "h2", text: "Patient portals and the \"flip the switch\" problem" },
      {
        type: "p",
        runs: [
          "One trap is technical, not legal. Many practices use a patient portal or an electronic record run by an outside vendor, and some systems automatically restrict or hand over a child's account at a set age, such as 13. If those default settings block a parent who is the personal representative from records they are entitled to, that is a problem the practice owns, not the vendor's.",
        ],
      },
      {
        type: "p",
        runs: [
          "OCR flagged this in December 2025: practices should work with the business associates that run their portals to ensure a parent who is the personal representative gets full electronic access, and should fix default settings that wrongly deny it. If your portal vendor touches PHI, that is a ",
          { text: "business associate", href: "/articles/does-my-dental-practice-need-a-baa" },
          " relationship, and parental access is one more setting to confirm with them.",
        ],
      },
      { type: "h2", text: "What OCR is enforcing now" },
      {
        type: "p",
        runs: [
          "The December 2025 letter did two things. It reminded providers of a rule that has existed for years, and it announced that OCR is making parental access to children's medical records an enforcement priority and will use all civil remedies available, including civil money penalties. OCR said it issued the letter after learning that parents were being denied access, in some cases because a system required the child to authorize it first.",
        ],
      },
      {
        type: "p",
        runs: [
          "The track record is already there. Paradise Family Dental's $25,000 settlement came out of a single complaint: a mother asked for her and her child's records in April 2020 and did not receive them until the end of that December. It was one of three dental practices OCR settled with on the same day in 2022, part of a broader ",
          { text: "right-of-access enforcement effort", href: "/articles/how-to-handle-a-patient-records-request-dental-practice" },
          " that has produced dozens of cases since 2019. None of those cases involved a breach. They involved a request that went unanswered.",
        ],
      },
      {
        type: "p",
        runs: [
          "Most solo practices carry two or three HIPAA gaps they can't see, and a written policy for parent and minor record requests is a common one. The free HIPAA Risk Scorecard checks the 10 areas OCR investigates most, then sends a short written review and an introduction to a specialist. It takes about three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      { type: "h2", text: "A simple policy for a parent's request" },
      {
        type: "steps",
        items: [
          { label: "Confirm who is asking", detail: "Verify the requester is a parent or guardian who is the child's personal representative. Reasonable verification is required, but it cannot become a stalling tactic or an extra hurdle beyond what you would use for any patient." },
          { label: "Check for a court order or a minor-consent issue", detail: "Ask whether any custody order limits a parent's access, and whether the records involve care the minor consented to alone under state law. For routine dental care, usually neither applies." },
          { label: "Default to access for both parents", detail: "Absent a specific legal limit, a parent who is the personal representative gets the record, regardless of custody or who pays the bill." },
          { label: "Pull the complete record", detail: "Chart, treatment notes, imaging, and billing. If a narrow part is genuinely excluded, set only that part aside and prepare the rest." },
          { label: "Meet the deadline", detail: "The federal clock is 30 days, and several states are shorter. Do not rely on the back half of the window." },
          { label: "Don't add money barriers", detail: "You may charge a reasonable, cost-based copy fee, but not for a portal copy, and never condition release on an unpaid bill." },
          { label: "Write it down and keep proof", detail: "A short, dated log of who asked, what you sent, and when is the difference between a quick close and a penalty if a complaint is ever filed." },
        ],
      },
      { type: "h2", text: "Where practices slip" },
      {
        type: "p",
        runs: [
          "The practices that get penalized are rarely acting in bad faith. Paradise, the Las Vegas practice, did send the records in the end; it just took more than eight months, and by then a complaint was already with OCR. The pattern is almost always the same: no written rule, a request that lands on whoever opens the mail, a front-desk staffer who hesitates over a divorce situation, and a deadline that quietly slides past. The fix is not legal expertise. It is a short, owned procedure that tells your team the default answer, the few real exceptions, and the deadline.",
        ],
      },
      {
        type: "p",
        runs: [
          "Parental access is one of the gaps a single parent can report to OCR with one short complaint, and it is now an enforcement priority. The free HIPAA Risk Scorecard flags the policy and training gaps OCR most often cites, in about three minutes. ",
          { text: "Check my practice \u2192", href: "/scorecard" },
        ],
      },
      {
        type: "p",
        runs: [
          "This is general information about HIPAA and parental access, not legal advice. Your own situation, your patients' specific circumstances, and any stricter rules in your state decide what applies to your practice. When a custody order or a possible safety concern is involved, that is the moment to check the order and, if needed, your counsel.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, \"The HIPAA Privacy Rule and Parental Access to Minor Children's Medical Records,\" Dear Colleague letter (December 3, 2025)."],
          ["HHS Office for Civil Rights, resolution agreement with B. Steven L. Hardy, D.D.S., LTD, doing business as Paradise Family Dental (September 2022)."],
          ["HHS Office for Civil Rights, \"Does the HIPAA Privacy Rule allow parents the right to see their children's medical records?\" FAQ (accessed June 2026)."],
          ["HHS Office for Civil Rights, \"Am I My Child's 'Personal Representative' Under HIPAA?\" fact sheet (accessed June 2026)."],
          ["HHS Office for Civil Rights, \"Personal Representatives\" guidance (accessed June 2026)."],
          ["45 CFR § 164.502(g) (personal representatives, including unemancipated minors and the abuse, neglect, or endangerment provision); § 164.524 (right of access); § 160.203 (preemption) (eCFR, current)."],
          ["Texas Family Code § 153.073 (rights of a parent at all times, including access to a child's dental records) (Texas Legislature, current)."],
          ["Louisiana Revised Statutes § 9:351 (access to a child's records and a non-custodial parent) (Louisiana State Legislature, current)."],
          ["American Dental Association, \"Custody Arrangements\" (Managing Professional Risks: The Consent Process) (accessed June 2026). Cited only for the dental-practice norm on who consents to a child's treatment, not for any legal rule."],
        ],
      },
    ],
    faq: [
      { question: "Does a parent automatically get their child's dental records?", answer: "Usually. A parent is generally the child's personal representative under HIPAA, which gives them the same right of access the patient has. Limited exceptions apply, mostly tied to care a minor consented to alone under state law, and a court order can change the answer." },
      { question: "Can a non-custodial parent get their child's dental records?", answer: "Generally yes. HIPAA does not distinguish custodial from non-custodial parents. A non-custodial parent keeps the same access unless a court order or state law removes their authority. Several states name dental records specifically, and some, like Louisiana, bar denying a parent access solely because they are not the child's custodial parent." },
      { question: "Can a divorced parent be denied records because the other parent pays the bill?", answer: "No. Access to a child's records does not depend on who pays. A parent who is the child's personal representative is entitled to the record regardless of financial responsibility, absent a court order limiting access." },
      { question: "When can we refuse a parent access to a child's record?", answer: "In limited situations: an emancipated minor, a specific record tied to care the minor lawfully consented to alone, a court order limiting access, or a professional judgment that the parent's access could endanger the child due to abuse or neglect. Each needs a specific basis, not a blanket policy." },
      { question: "Our patient portal locks a child's account at 13. Is that a problem?", answer: "It can be. If the default setting blocks a parent who is the personal representative from records they are entitled to, you should work with your portal or records vendor to fix the configuration. OCR raised this exact issue in December 2025." },
      { question: "Can we require both parents to approve releasing a child's records?", answer: "No. A parent who is the child's personal representative can exercise the child's access right on their own, the same way the patient could. HIPAA does not require a second parent's signature, and OCR's December 2025 letter cautions practices not to add authorization steps that no law requires. The exception to watch for is a court order that specifically limits a parent's access." },
    ],
  },
  {
    slug: "dental-practice-cyber-insurance",
    status: "published",
    title: "Cyber Insurance for a Dental Practice: Cost, Coverage, and HIPAA (2026)",
    metaTitle: "Dental Cyber Insurance: Cost & Coverage (2026)",
    description:
      "What cyber insurance covers for a dental practice, what it costs, and whether it actually pays a HIPAA penalty. A plain, primary-sourced guide, no sales pitch.",
    author: "Dolev Arama",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    body: [
      {
        type: "p",
        runs: [
          "In early 2025, a Nevada dental group's network was broken into through an account that belonged to its outside IT vendor. The records of more than 1.2 million patients were exposed, and a proposed $3.3 million settlement was reached to resolve the lawsuits that followed. None of that money came from HIPAA. It was never supposed to.",
        ],
      },
      {
        type: "p",
        runs: [
          "Cyber insurance is the thing that pays when a breach turns into a bill. This page explains what it covers, what it leaves out, what it tends to cost a small practice, and the one question owners get wrong more than any other: does it actually cover a HIPAA penalty? We do not sell insurance, so nothing here is a pitch. It is what the primary sources and the policies themselves say.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            "Cyber insurance pays for breach response: the forensic investigation, notifying patients, credit monitoring, rebuilding systems, lost income, and a ransom payment where paying one is lawful. HIPAA pays for none of it.",
          ],
          [
            "It also pays to defend you when patients sue and when OCR opens an investigation. Whether it pays a HIPAA penalty itself is the uncertain part, and that turns on your state and your exact policy.",
          ],
          [
            "HIPAA does not require you to carry it. A contract can: your IT vendor's business associate agreement, a lender, or a dental support organization may each require a policy.",
          ],
          [
            "Your regular business owner's policy almost certainly excludes data breaches. Cyber is sold as its own coverage.",
          ],
          [
            "Insurers increasingly require the security controls HIPAA already expects before they will issue a policy: multi-factor authentication, encryption, tested backups, and a documented risk analysis.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains what cyber insurance covers for a dental practice and whether it pays a HIPAA penalty. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },
      { type: "h2", text: "What cyber insurance actually covers, and what it doesn't" },
      {
        type: "p",
        runs: [
          "A cyber policy is built in three layers, and it helps to know which layer pays for what.",
        ],
      },
      {
        type: "image",
        src: "/dental-cyber-insurance-absolute-dental-breach.webp",
        alt: "Summary card for the 2025 Absolute Dental Group data breach: a 3.3 million dollar class-action settlement, more than 1.2 million patients affected, and a breach traced to a third-party IT vendor account. Labeled as a class-action settlement, not an OCR penalty.",
        width: 1500,
        height: 760,
        caption: [
          "Source: the breach is recorded on the ",
          { text: "HHS OCR breach portal", href: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf" },
          "; a proposed $3.3 million class-action settlement (Jordan v. Absolute Dental Group, LLC) in the U.S. District Court for the District of Nevada, with a final approval hearing set for 2026. This is a civil settlement, not an OCR penalty. Highlights added by Hipsana.",
        ],
      },
      {
        type: "p",
        runs: [
          "First-party coverage pays your own out-of-pocket costs after an incident: hiring forensic investigators to find what happened, notifying affected patients, providing credit monitoring, restoring lost data, covering income you lose while the practice is down, and, where it is lawful, a ransomware payment. The U.S. Government Accountability Office describes these as the core losses cyber insurance was created to offset.",
        ],
      },
      {
        type: "p",
        runs: [
          "Third-party coverage pays when someone else comes after you: patients filing a class action, or a business partner claiming you failed to protect their data. This is the layer that would respond to a lawsuit like the one that produced the $3.3 million Absolute Dental settlement.",
        ],
      },
      {
        type: "p",
        runs: [
          "Regulatory coverage is the layer people misread. Almost every policy with a regulatory-proceedings clause will pay to defend you during an OCR investigation. The penalty itself is a separate question, and the next section is about exactly that.",
        ],
      },
      {
        type: "p",
        runs: [
          "What a cyber policy generally will not pay is worth knowing too. GAO notes that policies commonly exclude losses from systemic or catastrophic events such as acts of war, and that carriers increasingly add ",
          { strong: "widespread-event" },
          " exclusions and sublimits that cap how much is available for a specific loss like ransomware. Read those clauses before you assume a number is covered.",
        ],
      },
      {
        type: "p",
        runs: [
          "The table below maps the real costs of the Absolute Dental breach to what a cyber policy typically covers.",
        ],
      },
      {
        type: "table",
        headers: ["Breach cost", "Cyber insurance usually pays?", "Seen at Absolute Dental (2025)"],
        rows: [
          ["Forensics to find what happened", "Yes, first-party", "Outside cyber experts engaged"],
          ["Notifying patients (1.2M+)", "Yes, first-party", "Breach notices sent"],
          ["Credit monitoring for patients", "Yes, first-party", "Reimbursed to patients via the settlement"],
          ["Rebuilding and securing systems", "Yes, first-party", "Done at the practice's own cost"],
          ["Patient lawsuits and settlement", "Yes, third-party", "$3.3M class-action settlement"],
          ["Defending an OCR investigation", "Usually, under the regulatory clause", "Not publicly disclosed"],
          ["The HIPAA penalty itself", "Depends on state and policy", "Not publicly disclosed"],
        ],
        caption:
          "A real dental breach mapped to what a cyber policy typically covers. \u201cUsually\u201d is a general pattern, not a promise: coverage varies by carrier, state, and policy. A dash means the item was not publicly disclosed.",
      },
      { type: "h2", text: "Does cyber insurance cover a HIPAA fine?" },
      {
        type: "p",
        runs: [
          "The honest answer is that it depends, and the difference between defense and the penalty is where it depends.",
        ],
      },
      {
        type: "p",
        runs: [
          "Defending an OCR investigation, the legal and response costs of dealing with the government, is usually covered under a policy's regulatory clause. The penalty itself is far less certain. Coverage turns on your state's law and your policy's exact wording. As a general legal principle, penalties that are punitive in nature are often not insurable as a matter of public policy, and some states limit insuring civil penalties at all. Other policies carry a specific sublimit for regulatory fines that is much smaller than the headline coverage amount. Two practices with the same loss can get two different answers.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "The penalties themselves are set in tiers. Under ",
          { text: "45 CFR 160.404", href: "https://www.ecfr.gov/current/title-45/part-160/section-160.404" },
          ", HIPAA civil money penalties run across four tiers based on culpability, from a violation you did not know about up to willful neglect left uncorrected. As of the amounts that took effect on January 28, 2026, the top of that range reaches $2,190,294 for identical violations in a year. In practice, settlements with small practices land far below the ceiling, usually in the tens to hundreds of thousands of dollars, because OCR weighs your size, your intent, and your cooperation. The ceiling is real. It is not the number a solo office should plan around.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            label: "Get the regulatory clause in writing",
            detail:
              "Ask your broker to confirm, in writing, whether the policy covers OCR investigation defense, whether it covers a penalty, and the sublimit on each.",
          },
          {
            label: "Check your own state",
            detail:
              "Ask whether penalties are insurable where you practice. The answer is not the same in every state, and it can decide whether the fine is yours to pay.",
          },
          {
            label: "Only attest to controls you have",
            detail:
              "Insurers can deny a claim if a forensic review shows the security controls you listed on the application were not actually in place when the breach occurred.",
          },
          {
            label: "Read the exclusions",
            detail:
              "War, widespread-event, and prior-known-incident exclusions are common, and any of them can quietly remove coverage you assumed you had.",
          },
        ],
      },
      { type: "h2", text: "Does HIPAA require a dental practice to carry cyber insurance?" },
      {
        type: "p",
        runs: [
          "No. There is no provision in HIPAA, the Privacy Rule, the Security Rule, or the Breach Notification Rule that requires a covered entity to buy cyber insurance. Anyone who tells you the law mandates it is mistaken.",
        ],
      },
      {
        type: "p",
        runs: [
          "What can require it is a contract. Your IT vendor's business associate agreement may oblige one side to carry cyber-liability coverage at a set limit. A lender financing your equipment, or a dental support organization you affiliate with, can require it as well. Those obligations are real, but they come from the contract, not from HIPAA. If a vendor's agreement is where you first ran into this, our guide on ",
          { text: "which vendors need a BAA", href: "/articles/does-my-dental-practice-need-a-baa" },
          " covers the rest.",
        ],
      },
      {
        type: "p",
        runs: [
          "There is also a rule change worth watching, and worth describing accurately, because most write-ups get it wrong. In January 2025, OCR proposed a major update to the HIPAA Security Rule. As of mid-2026 it is still a proposed rule. It was published as a notice of proposed rulemaking in the Federal Register on January 6, 2025, the comment period has closed, and OCR has not issued a final rule. If it is finalized as written, it would remove the long-standing \u201caddressable versus required\u201d distinction in 45 CFR 164.306(d) and make multi-factor authentication and encryption mandatory. It would not require insurance. It would require the same controls insurers already demand.",
        ],
      },
      { type: "h2", text: "How much does cyber insurance cost for a dental practice?" },
      {
        type: "p",
        runs: [
          "There is no single price, and any source that gives you one without caveats is guessing. The premium depends on how many patient records you hold, the security controls you can prove, your claims history, and the state you practice in. Industry sources put a small practice's standalone cyber premium in the low thousands of dollars a year for a $1 million limit, but treat that as a starting range, not a quote. Get an actual quote before you budget around it.",
        ],
      },
      {
        type: "p",
        runs: [
          "Two facts from primary sources put that premium in perspective. GAO has documented that healthcare faces lower coverage limits, rising premiums, and more exclusions than most other sectors, so a dental practice should expect a tighter market than a retail shop would. And IBM's 2025 Cost of a Data Breach Report puts the average healthcare breach at $7.42 million, the highest of any sector. That average is pulled up by large hospital systems, and a solo practice will not see anything close to it. But the response costs that drive it, forensics, patient notification, credit monitoring, and legal fees, still run into the tens or hundreds of thousands for a small practice, and you pay them whether or not OCR ever issues a penalty.",
        ],
      },
      {
        type: "p",
        runs: [
          "This is also where cyber insurance and compliance spending sit next to each other without overlapping. The cost of getting compliant, the risk assessment and the fixes, is a different line item from the cost of transferring what is left over to an insurer. We break the compliance side down in two other pieces: ",
          { text: "what a risk assessment costs", href: "/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice" },
          " and ",
          { text: "what full HIPAA compliance costs per year", href: "/articles/how-much-does-hipaa-compliance-cost-for-a-dental-practice" },
          ".",
        ],
      },
      { type: "h2", text: "What insurers require before they will cover you (and how it overlaps with HIPAA)" },
      {
        type: "p",
        runs: [
          "Cyber underwriting has quietly turned into a security audit. Insurers no longer take your word for it. Major brokers report that carriers can decline coverage outright when the basics are missing, and many now run an external scan of your network before they quote. On the application, they ask, in writing, for your security risk analysis.",
        ],
      },
      {
        type: "p",
        runs: [
          "The same short list of controls shows up on nearly every application: multi-factor authentication, endpoint protection, backups that are tested and cannot be silently deleted, a written incident response plan, and a documented risk analysis. None of that is unfamiliar. CISA names the same controls as essential defenses against ransomware, and HIPAA's Security Rule already requires most of them. The work that makes you insurable is, almost line for line, the work that makes you pass an OCR audit.",
        ],
      },
      {
        type: "p",
        runs: [
          "There is a sting in the tail. If you attest to a control you do not actually have, and a breach happens, a forensic review can surface the gap and the claim can be denied. The controls have to be real, and you have to be able to show the documentation. That is the same standard OCR applies.",
        ],
      },
      {
        type: "p",
        runs: ["Here is how the application questions line up with the rule."],
      },
      {
        type: "table",
        headers: ["What the cyber insurer asks", "The matching HIPAA Security Rule control"],
        rows: [
          ["Do you enforce MFA on email, remote access, and admin accounts?", "Access control and authentication, 45 CFR 164.312(a)(1) and 164.312(d)"],
          ["Do you encrypt ePHI at rest and in transit?", "Encryption, 45 CFR 164.312(a)(2)(iv) and 164.312(e)(2)(ii)"],
          ["Have you done a security risk analysis?", "Risk analysis, 45 CFR 164.308(a)(1)(ii)(A)"],
          ["Do you keep tested, offline backups?", "Contingency plan and data backup, 45 CFR 164.308(a)(7)"],
          ["Do you have a written incident response plan?", "Security incident procedures, 45 CFR 164.308(a)(6)"],
          ["Do you train staff to spot phishing?", "Security awareness and training, 45 CFR 164.308(a)(5)"],
        ],
        caption:
          "The same controls decide whether you are insurable and whether you pass an OCR audit. One set of work covers both.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        runs: [
          "Compliance and insurance answer two different questions. HIPAA tells you what you are required to do to protect patient data. Doing it is what makes you both audit-ready and insurable. Cyber insurance is what pays when something gets through anyway. You need both, and neither one is a substitute for the other.",
        ],
      },
      {
        type: "p",
        runs: [
          "The fastest way to see where you stand is to check the controls an insurer and OCR both ask about: multi-factor authentication, encryption, backups, and a risk analysis. Our free ",
          { text: "HIPAA Risk Scorecard", href: "/scorecard" },
          " does exactly that. It takes a few minutes, it names your specific gaps, and it shows you what an underwriter or an auditor would find before they find it. From there, a short review walks you through closing them, which is also what tends to bring an insurer's premium down.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["U.S. District Court for the District of Nevada, Jordan v. Absolute Dental Group, LLC (proposed class-action settlement, final approval hearing 2026)."],
          ["HHS Office for Civil Rights, Breach Portal report, Absolute Dental Group (2025)."],
          ["45 CFR \u00a7 160.404, civil money penalty amounts (eCFR, current)."],
          ["Federal Register, HHS civil monetary penalty inflation adjustment, effective January 28, 2026 (2026-01688)."],
          ["Federal Register, HIPAA Security Rule NPRM, January 6, 2025 (90 FR 800)."],
          ["45 CFR \u00a7\u00a7 164.306, 164.308, 164.312, Security Rule standards (eCFR, current)."],
          ["U.S. Government Accountability Office, Cyber Insurance: Insurers and Policyholders Face Challenges in an Evolving Market (GAO-21-477, 2021)."],
          ["U.S. Government Accountability Office, Cyber Insurance: Action Needed to Assess Potential Federal Response to Catastrophic Attacks (GAO-22-104256, 2022)."],
          ["Cybersecurity and Infrastructure Security Agency (CISA), #StopRansomware Guide."],
          ["Federal Trade Commission, Data Breach Response: A Guide for Business."],
          ["IBM, Cost of a Data Breach Report 2025 (healthcare figures)."],
        ],
      },
    ],
    faq: [
      {
        question: "Does cyber insurance cover HIPAA fines?",
        answer:
          "Sometimes, and not in the way most owners assume. The cost of defending an OCR investigation is usually covered under a policy's regulatory clause. The penalty itself is far less certain: coverage depends on your state's law and your policy wording, some policies cap regulatory fines at a low sublimit, and penalties that are punitive in nature are often not insurable as a matter of public policy. Ask your broker to confirm, in writing, exactly what is covered and at what limit before you rely on it.",
      },
      {
        question: "Is cyber insurance required for HIPAA compliance?",
        answer:
          "No. HIPAA does not require a covered entity to carry cyber insurance. What can require it is a contract, such as your IT vendor's business associate agreement, a lender, or a dental support organization. Separately, insurers increasingly expect controls like multi-factor authentication, encryption, and tested backups before they will issue a policy, which HIPAA's Security Rule calls for anyway.",
      },
      {
        question: "How much is cyber insurance for a small dental practice?",
        answer:
          "It varies widely. Industry sources put a small practice's standalone cyber premium in the low thousands of dollars a year for a $1 million limit, but the real number depends on your patient-record count, the security controls you can prove, your claims history, and your state. Get a quote rather than budgeting from a published range. For perspective, GAO reports that healthcare faces tighter terms and higher premiums than most sectors.",
      },
      {
        question: "What is the difference between cyber insurance and HIPAA compliance?",
        answer:
          "HIPAA compliance is the set of safeguards you are legally required to put in place to protect patient data. Cyber insurance is a financial product that pays for the response and the liability after a breach happens anyway: forensics, patient notification, lawsuits, and regulatory defense. Compliance is the prevention and the legal duty; insurance is the backstop. Neither replaces the other.",
      },
      {
        question: "Will my business owner's policy cover a data breach?",
        answer:
          "Almost certainly not. A standard business owner's policy typically excludes losses from electronic data breaches, which is why cyber is sold as its own coverage. GAO has documented that traditional property and casualty policies increasingly carve cyber out and offer it separately. If you are unsure, ask your broker to point to the exact clause in your policy.",
      },
      {
        question: "Can a cyber insurance claim be denied even if I have a policy?",
        answer:
          "Yes. The two most common reasons are an excluded event, such as a war or widespread-event exclusion, and a mismatch between the controls you listed on your application and what was actually running when the breach occurred. Carriers have denied claims after a forensic review found that an attested control, like enforced multi-factor authentication, was not in place. Document your controls and keep the documentation current.",
      },
    ],
  },
  {
    slug: "hipaa-text-messaging-dental-practice",
    status: "published",
    title: "Is Texting Patients HIPAA Compliant? A Dentist's Guide (2026)",
    metaTitle: "Texting Patients: HIPAA + TCPA Rules (Dental)",
    description:
      "Is texting patients HIPAA compliant for a dental practice? Yes, but a second law, the TCPA, controls consent and opt-outs. Here is the full 2026 picture.",
    author: "Dolev Arama",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    body: [
      {
        type: "p",
        runs: [
          "Yes, and that is only half of the answer. HIPAA lets a dental practice text appointment reminders without special permission, as long as the message stays minimal. But a second federal law decides whether you were allowed to text in the first place, and whether you stopped when a patient asked you to. That law is the TCPA, and a different agency enforces it. In 2024, a Texas dental group agreed to pay about $1 million to settle a class-action texting lawsuit that covered thousands of people over several years. Here is what each law actually requires, what changed in 2026, and how to satisfy both.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "HIPAA allows the reminder. " },
            "Appointment reminders count as treatment, so the Privacy Rule lets you send them without a signed authorization. The catch is content: keep the text to logistics.",
          ],
          [
            { strong: "A HIPAA yes is not a TCPA yes. " },
            "The TCPA is a separate law, run by the FCC, not HHS. It governs consent to text and the right to opt out. The same reminder can satisfy HIPAA and still break the TCPA.",
          ],
          [
            { strong: "Giving you a number is usually the consent. " },
            "When a patient hands you their cell number, that is generally treated as permission to text them about their care, absent instructions otherwise. Marketing is different, and it needs written consent.",
          ],
          [
            { strong: "STOP has to work. " },
            "Since April 2025, a patient can opt out using any reasonable wording, and you have to honor it. The penalty for ignoring an opt-out is charged for every message.",
          ],
          [
            { strong: "Your texting vendor usually needs a BAA. " },
            "Most texting platforms store and handle patient information for you, which makes them a business associate. A pure phone carrier that only passes the message along is the narrow exception. No agreement, no compliant texting.",
          ],
          [
            { strong: "The math is per message. " },
            "TCPA damages run $500 to $1,500 for each text. Across a patient list that adds up fast, which is how a Texas dental group ended up settling for about $1 million.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains the HIPAA and TCPA rules for texting dental patients. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },

      { type: "h2", text: "Does HIPAA let a dental practice text patients?" },
      {
        type: "p",
        runs: [
          "Yes. The HIPAA Privacy Rule treats an appointment reminder as part of treatment, so you do not need a separate authorization to send one. ",
          { text: "HHS says this plainly", href: "https://www.hhs.gov/hipaa/for-professionals/faq/286/are-appointment-reminders-allowed-under-hipaa-without-authorization/index.html" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "The limit is on what the message says. The ",
          { text: "minimum necessary standard does not apply to a message you send to the patient about their own care", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502" },
          ", but that is not a license to put clinical detail in a text. A reminder can be read on a lock screen or seen by someone holding the phone, so the safe content is the logistics of the visit and nothing about why the patient is coming in.",
        ],
      },
      {
        type: "p",
        runs: [
          "Patients also get a say in how you reach them. Under ",
          { text: "45 CFR 164.522(b)", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.522" },
          ", a patient can ask you to use a specific number or channel, and you have to accommodate a reasonable request. If someone asks you not to text them, that preference belongs in their record.",
        ],
      },
      {
        type: "p",
        runs: [
          "One more HIPAA point sits behind the scenes: the service that sends the texts. Most reminder and texting platforms store your patient list and the messages, so they ",
          { text: "create, receive, or maintain protected health information on your behalf", href: "https://www.hhs.gov/hipaa/for-professionals/special-topics/cloud-computing/index.html" },
          ", which makes them a business associate that needs a signed agreement. A pure phone carrier that only passes a message along, without storing it, is the narrow conduit exception. If you are not sure which one your vendor is, treat it as a business associate and get the agreement.",
        ],
      },

      { type: "h2", text: "What can you put in a text reminder, and what you can't?" },
      {
        type: "p",
        runs: [
          "Treat the text like a postcard a stranger could glance at. The date, the time, where to go, and who to call are fine. The reason for the visit is safer left out, because a text can be read by whoever is holding the phone.",
        ],
      },
      {
        type: "table",
        headers: ["Safe to include", "Use with care", "Keep out of a plain text"],
        rows: [
          [
            "Appointment date, time, and location",
            "The provider's name, when the specialty itself reveals a condition",
            "The procedure, diagnosis, or treatment planned",
          ],
          [
            "Practice name and a callback number",
            "A balance due, which falls outside the FCC's health care message exemption",
            "Any clinical note, test result, or image",
          ],
          [
            "Generic prep and a \"reply STOP to opt out\" line",
            "A department name that hints at why the patient is coming",
            "Anything a patient would not want a stranger to read",
          ],
        ],
        caption:
          "What belongs in a standard appointment text. When you need to send anything in the right-hand column, move it to a secure portal or a phone call.",
      },

      { type: "h2", text: "Is texting patients a TCPA violation?" },
      {
        type: "p",
        runs: [
          "Not by itself. The TCPA, the Telephone Consumer Protection Act, treats a text as a phone call, and it runs on the FCC's rulebook, not HIPAA's. The question it asks is narrow: did you have the patient's consent to send an automated text to that number, and is the message about their care rather than a promotion?",
        ],
      },
      {
        type: "p",
        runs: [
          "For a dental practice, that consent usually already exists. There is no blanket exemption for health care texts, but the ",
          { text: "FCC has long treated a patient who gives a health care provider their cell number", href: "https://www.fcc.gov/document/tcpa-omnibus-declaratory-ruling-and-order" },
          " as having consented to care-related messages at that number, within the scope of the relationship and absent instructions otherwise. The ",
          { text: "American Dental Association describes the same rule", href: "https://www.ada.org/resources/practice/legal-and-regulatory/follow-the-rules-when-phoning-patients" },
          ". Courts have been re-examining how far that rule reaches, so treat it as the usual starting point rather than a guarantee: a reminder sent to a patient who gave you their number, with no marketing in it, generally clears the consent bar.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "Marketing changes everything. A text promoting whitening or a membership plan is not a care message, and it needs the patient's prior express written consent before it goes out. Folding a promotion into an otherwise routine reminder is the fastest way to lose the protection the reminder had.",
        ],
      },
      {
        type: "table",
        headers: ["", "HIPAA (HHS)", "TCPA (FCC)"],
        rows: [
          [
            "What it asks",
            "Is the patient's information protected?",
            "Were you allowed to send this text?",
          ],
          [
            "Who enforces it",
            "HHS Office for Civil Rights",
            "The FCC, plus private lawsuits and state attorneys general",
          ],
          [
            "Consent for a reminder",
            "None needed, because it is treatment",
            "The patient giving you their number counts as consent",
          ],
          [
            "Marketing texts",
            "Need the patient's authorization",
            "Need prior express written consent",
          ],
          [
            "Opt-out",
            "Honor confidential-communication requests",
            "Honor any reasonable STOP, since April 2025",
          ],
          [
            "The penalty",
            "OCR settlements and corrective action plans",
            "$500 to $1,500 for each text",
          ],
        ],
        caption:
          "Two laws, two separate yes-or-no questions. The same reminder can pass the HIPAA column and fail the TCPA column at the same time.",
      },

      { type: "h2", text: "What about consent and opt-outs?" },
      {
        type: "p",
        runs: [
          "The opt-out rules got stricter in 2025. Since April 11, 2025, a patient can revoke consent using any reasonable method, not just a keyword you chose for them. A reply of STOP counts, and so does any clear wording to the same effect. Once it arrives, you have to stop.",
        ],
      },
      {
        type: "p",
        runs: [
          "One newer wrinkle works in your favor, for now. The FCC has a \"revoke-all\" rule that would treat a STOP to one kind of message as a STOP to everything you send. ",
          { text: "In January 2026 the FCC pushed that requirement back to January 31, 2027", href: "https://www.fcc.gov/document/cgb-extends-effective-date-tcpas-consent-revocation-rule" },
          ", so for now an opt-out applies to the program the patient replied to. The simpler practice is to honor it broadly anyway.",
        ],
      },
      {
        type: "p",
        runs: [
          "There is also a Do Not Call angle. Texts to a number on the National Do Not Call Registry can draw a claim, and courts are still working out exactly how those rules apply to texts. The safe path does not depend on the outcome: text patients who gave you their number for care, keep marketing on a separate track, and honor every opt-out.",
        ],
      },

      { type: "h2", text: "What did Jefferson Dental do wrong?" },
      {
        type: "p",
        runs: [
          "In 2024, a Texas dental group showed how the opt-out rule bites. Jefferson Dental, a network of more than 60 clinics run by JDC Healthcare Management, faced a class-action lawsuit claiming it kept sending marketing texts to people who had already replied STOP, and to numbers listed on the National Do Not Call Registry, over a four-year stretch.",
        ],
      },
      {
        type: "p",
        runs: [
          "The company denied any wrongdoing, but agreed to pay about $1 million to settle. The deal covered roughly 10,000 people, which works out to a small check each. The lesson for a solo practice is not the headline number. It is that the texts were not exotic. They were ordinary marketing texts that ignored opt-outs, and the per-message math did the rest.",
        ],
      },
      {
        type: "image",
        src: "/tcpa-class-action-settlement-jefferson-dental-texting.webp",
        alt: "Summary card for the 2024 Jefferson Dental TCPA class-action settlement: a Texas dental group with more than 60 clinics agreed to pay about one million dollars to resolve claims it kept texting consumers after they replied STOP and after they registered on the National Do Not Call Registry. Labeled as a private class-action settlement, not an OCR penalty or government fine.",
        width: 1500,
        height: 760,
        caption: [
          "Source: Lee v. JDC Healthcare Management, LLC (doing business as Jefferson Dental), No. 3:23-cv-01134-E (N.D. Tex.), a TCPA class-action settlement of about $1 million covering roughly 10,000 people, over texts sent after a STOP request and to Do Not Call numbers. The company denied wrongdoing. This is a private civil settlement, not a government penalty.",
        ],
      },
      {
        type: "p",
        runs: [
          "You do not have to guess whether your texting setup has the same gap. The free ",
          { text: "HIPAA Scorecard", href: "/scorecard" },
          " checks your vendor coverage and your patient-communication practices along with eight other core controls, and names your top gap in about three minutes. It is a starting point, not a full audit, but it tells you where you stand.",
        ],
      },
      {
        type: "p",
        runs: [
          "A texting class action is also exactly the kind of liability that ",
          { text: "a dental practice's cyber and liability insurance", href: "/articles/dental-practice-cyber-insurance" },
          " is meant to absorb, though policies vary widely on what they actually cover.",
        ],
      },

      { type: "h2", text: "How to text patients the right way" },
      {
        type: "p",
        runs: [
          "None of this requires a lawyer. Five habits keep a dental practice on the right side of both laws.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            label: "Capture consent at intake, and write it down",
            detail:
              "When a patient gives you a cell number, note that they agreed to text reminders, with the date. That record is what proves consent if anyone ever asks.",
          },
          {
            label: "Keep the message to logistics",
            detail:
              "Date, time, location, and a callback number. No procedure, no diagnosis, no test name. Treat the text like a postcard a stranger could read.",
          },
          {
            label: "Sign a BAA with your texting service",
            detail:
              "Most texting platforms store your patient list and messages, which makes them a business associate. A pure carrier that only passes the message along is the exception. If in doubt, sign the agreement before the first message goes out.",
          },
          {
            label: "Put STOP in every message, and honor it fast",
            detail:
              "Add a simple opt-out line, make sure a STOP reply actually removes the patient from the list, and log the date it arrived. That record is what proves you honored it. Ignoring an opt-out is where the per-message penalties start.",
          },
          {
            label: "Keep marketing on a separate track",
            detail:
              "Promotions need written consent and their own opt-in. Never fold an offer into a care reminder, because it strips the reminder of the consent it had.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "A compliant texting setup is not expensive. Most practice-management platforms include reminders under a business associate agreement, and the secure version costs a fraction of what one ignored opt-out can. The costly path is the one Jefferson Dental took, after the fact. Email raises a parallel set of questions, which we cover in ",
          { text: "is your dental practice's email HIPAA compliant", href: "/articles/is-email-hipaa-compliant-dental-practice" },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "This is general information about HIPAA and the TCPA, not legal advice. The TCPA changes often and varies by state, and your own risk analysis decides what is reasonable for your specific practice. When a texting program grows large or starts to include any marketing, have it reviewed by counsel.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          ["HHS Office for Civil Rights, FAQ 286, “Are appointment reminders allowed under the HIPAA Privacy Rule without authorizations?” (accessed June 2026)."],
          ["45 CFR \u00a7 164.522(b) (confidential communications) and \u00a7 164.502(b) (minimum necessary, including uses and disclosures to the individual) (eCFR, current)."],
          ["45 CFR \u00a7 164.312(e) (transmission security, an addressable specification) (eCFR, current)."],
          ["45 CFR \u00a7 160.103 (definition of \u201cbusiness associate\u201d); HHS, Modifications to the HIPAA Rules (Omnibus Rule), 78 FR 5566 (Jan. 25, 2013); and HHS guidance on cloud computing and the conduit exception (hhs.gov, accessed June 2026)."],
          ["Federal Communications Commission, 2015 TCPA Omnibus Declaratory Ruling and Order, FCC 15-72, 30 FCC Rcd 7961 (July 10, 2015) (health care message exemption; prior express consent)."],
          ["Federal Communications Commission, 1992 TCPA Order, 7 FCC Rcd 8752 (1992) (providing a telephone number constitutes prior express consent to be called at that number, absent instructions to the contrary)."],
          ["47 CFR \u00a7 64.1200 (FCC rules implementing the TCPA: consent, revocation of consent, and the National Do Not Call Registry) (eCFR, current)."],
          ["Federal Communications Commission, Consumer and Governmental Affairs Bureau, Order DA-26-12A1 (Jan. 6, 2026) (extending the “revoke-all” provision of \u00a7 64.1200(a)(10) to January 31, 2027)."],
          ["47 U.S.C. \u00a7 227(b)(3), (c)(5) (TCPA private right of action; statutory damages of $500 per violation, up to $1,500 for willful or knowing violations)."],
          ["American Dental Association, “Follow the Rules When Phoning Patients” (TCPA health care message guidance; accessed June 2026)."],
          ["Lee v. JDC Healthcare Management, LLC (doing business as Jefferson Dental), TCPA class-action settlement (2024); the company denied wrongdoing."],
        ],
      },
    ],
    faq: [
      {
        question: "Do I need a patient's consent to send appointment reminder texts?",
        answer:
          "In practice, yes, and you usually already have it. When a patient gives you their cell number, the FCC treats that as consent to be contacted about their care. Keep the reminder free of marketing, include an opt-out, and note the consent in your records.",
      },
      {
        question: "Is sending an appointment reminder by text a HIPAA violation?",
        answer:
          "No, not on its own. HIPAA treats reminders as part of treatment. The risk comes from putting clinical detail in the message, using a texting vendor with no business associate agreement, or ignoring a patient's request to stop.",
      },
      {
        question: "Do I need a business associate agreement with my texting vendor?",
        answer:
          "Yes, if the service sends or stores messages that include patient information. A platform texting on your behalf is a business associate, and it needs a signed agreement before it handles any patient data.",
      },
      {
        question: "What happens if I keep texting after a patient replies STOP?",
        answer:
          "That is a TCPA problem, and the damages are charged per message, from $500 to $1,500 each. Spread across a patient list, the exposure climbs quickly. One Texas dental group settled a case like this for about $1 million.",
      },
      {
        question: "Can I text patients about promotions or special offers?",
        answer:
          "Only with separate, written consent. Marketing texts fall under stricter TCPA rules than care reminders, and mixing a promotion into a reminder removes the protection the reminder had.",
      },
      {
        question: "Does HIPAA require me to encrypt text messages?",
        answer:
          "Not outright. Encryption is an addressable safeguard, which means you either use it or document why it is not reasonable. The simpler answer for texts is to keep clinical detail out entirely and move anything sensitive to a secure portal or a call. Even with minimal texts, you should still evaluate the security of any method you use.",
      },
    ],
  },
  {
    slug: "are-tracking-pixels-hipaa-compliant-dental-practice",
    status: "published",
    title: "Are Tracking Pixels HIPAA Compliant? A Dentist's Guide (2026)",
    metaTitle: "Are Tracking Pixels HIPAA Compliant? (Dental)",
    description:
      "Are tracking pixels HIPAA compliant for a dental practice? It depends on the page. Here is what OCR, Google, the FTC, and the courts actually say in 2026.",
    author: "Dolev Arama",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    body: [
      {
        type: "p",
        runs: [
          "The honest answer is that it depends which page the pixel sits on. On a homepage that only shows information, a Facebook or Google tracking pixel is usually fine. On your online booking page, the same pixel can quietly hand a patient's information to a third party, and that is the version that has drawn regulatory attention and lawsuits. In 2025, the dental chain Aspen Dental agreed to a settlement fund of more than $18 million in a case built on that scenario. Here is where the line actually falls, what a 2024 court ruling did and did not change, and how to tell if your own site is on the wrong side of it.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            { strong: "It depends on the page. " },
            "A tracking pixel on a page with no patient information, like your homepage, hours, or directions, is generally outside HIPAA. On a page that touches patient data, it usually is not.",
          ],
          [
            { strong: "The booking page is where the risk concentrates. " },
            "When a patient requests an appointment online, a pixel can send their details to a third party. OCR treats that as a disclosure of protected health information.",
          ],
          [
            { strong: "No BAA is available for them. " },
            "Google does not offer a business associate agreement for Google Analytics, and as of 2026 none is available for the Meta Pixel either, so on a page that handles patient data there is no agreement that would make them compliant.",
          ],
          [
            { strong: "A cookie banner does not fix it. " },
            "Clicking \"accept cookies\" is not a HIPAA authorization, and neither is a line in your privacy policy. OCR says this directly.",
          ],
          [
            { strong: "A 2024 ruling narrowed one theory, not the rule. " },
            "A court struck down OCR's claim that an IP address plus a visit to a public health page is automatically protected information. The rest of the guidance still stands.",
          ],
          [
            { strong: "Two separate risks. " },
            "HIPAA is enforced by the government, not by patients. Patients sue under other laws, which is how a dental chain ended up settling for more than $18 million.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "This article explains when website tracking pixels are HIPAA compliant for a dental practice. It is general information, not legal advice for your specific situation. For that, consult a healthcare attorney or a qualified HIPAA compliance professional.",
        ],
      },

      { type: "h2", text: "When is a tracking pixel actually a HIPAA problem?" },
      {
        type: "p",
        runs: [
          "A tracking pixel is a small piece of third-party code, like the Meta Pixel or Google Analytics, that records what a visitor does and sends it back to the company that made it. The HIPAA question is not whether you run one. It is whether the page it sits on can send a patient's information to that company. ",
          {
            text: "HHS OCR drew the line around what the page can see",
            href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html",
          },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "On a page a patient has to log in to reach, like a patient portal, the pixel generally has access to protected health information, so HIPAA applies. On a general marketing page that anyone can read without logging in, like your hours or job postings, it usually does not. The surprise is in the middle: a page that lets someone book an appointment, fill in a contact form, or complete a new-patient intake form without logging in can still expose patient data, because the visitor types in a name and a reason for the visit. OCR treats that as a disclosure too.",
        ],
      },
      {
        type: "p",
        runs: [
          "Your practice's facts can change the answer, so for your specific situation, consult a healthcare attorney or qualified compliance professional.",
        ],
      },
      {
        type: "p",
        runs: [
          "Google says the same thing about its own product. Its official guidance tells HIPAA-regulated entities not to put Google Analytics on authenticated pages, and not to put it on unauthenticated pages that relate to the provision of health care. ",
          {
            text: "You can read Google's instruction in its own words",
            href: "https://support.google.com/analytics/answer/13297105",
          },
          ".",
        ],
      },
      {
        type: "table",
        headers: ["Usually fine", "Treat as risky", "Almost always a problem"],
        rows: [
          [
            "Homepage, hours, directions, parking",
            "A service page that names a specific treatment",
            "The online appointment-booking page",
          ],
          [
            "Job postings and general practice info",
            "A URL that reveals the service, like /dental-implants",
            "The patient portal or any logged-in page",
          ],
          [
            "A blog post with no form on it",
            "A plain contact form (name and email only)",
            "A new-patient or intake form, or any form asking the reason for a visit",
          ],
        ],
        caption:
          "The dividing line is whether the page can send patient information to a third party, and a service page mainly becomes risky when a URL, a form, or other data can tie a visitor to that treatment. Adapted from HHS OCR guidance and Google's own instructions for HIPAA-regulated sites.",
      },

      { type: "h2", text: "Why you can't just sign a BAA and move on" },
      {
        type: "p",
        runs: [
          "For most vendors that handle patient data, the fix is a business associate agreement, a contract that binds them to HIPAA's rules. OCR's guidance is built on it: if a tracking vendor receives protected health information, you may only share it ",
          {
            text: "with a permission under the Privacy Rule",
            href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502",
          },
          ", and that vendor has to sign an agreement.",
        ],
      },
      {
        type: "p",
        runs: [
          "Here is the catch for pixels. Google states plainly that it makes no representations that Analytics meets HIPAA and does not offer business associate agreements for the service. As of 2026, there is no such agreement on offer for the Meta Pixel either. So on a page that handles patient data, the contract that would make the pixel compliant does not exist. The only route the rules leave open is a signed HIPAA authorization from each visitor before any tracking happens, which is not practical for a marketing website.",
        ],
      },
      {
        type: "p",
        runs: [
          "And the shortcuts do not work. A cookie banner asking visitors to accept tracking is not a HIPAA authorization. Naming the pixel in your privacy policy does not create permission to share. Even a promise from the vendor to strip the data after it arrives is not enough, because the disclosure already happened when the page sent it. The agreement question that sits underneath all of this, which vendors count as business associates and what the contract has to say, is its own topic, covered in ",
          {
            text: "does my dental practice need a BAA",
            href: "/articles/does-my-dental-practice-need-a-baa",
          },
          ".",
        ],
      },

      { type: "h2", text: "Did the 2024 court ruling make this go away?" },
      {
        type: "p",
        runs: [
          "Partly, and a lot of online advice gets this wrong in both directions. In June 2024, a federal court in American Hospital Association v. Becerra struck down one specific piece of OCR's guidance: the claim that an IP address combined with a visit to a public, no-login page about a health condition is automatically protected information. That theory is gone, nationwide. ",
          {
            text: "OCR notes the ruling at the top of its own bulletin",
            href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html",
          },
          ".",
        ],
      },
      {
        type: "p",
        runs: [
          "But that is the only part that fell. The rest of the guidance still applies: patient portals and logged-in pages, booking pages and intake forms that collect patient data, the business associate requirement, the duty to address tracking in your risk analysis, and breach notification when patient data leaks. The ruling is about the limits of HIPAA, and it does not touch the other ways a pixel can create legal exposure for a practice, the FTC and private lawsuits, which run on different laws entirely. The accurate read is narrow: pixels are not banned, and the ruling did not make the issue disappear.",
        ],
      },

      { type: "h2", text: "It's not only HIPAA: the FTC and the courts" },
      {
        type: "p",
        runs: [
          "Even where HIPAA stops, two other doors stay open. The Federal Trade Commission has pursued health companies over data shared through pixels. In its first action under the Health Breach Notification Rule, it reached a $1.5 million civil penalty with the prescription-discount service GoodRx over allegations that it shared users' health information with Facebook and Google through tracking pixels and other tools. ",
          {
            text: "The FTC laid out the case in its own announcement",
            href: "https://www.ftc.gov/news-events/news/press-releases/2023/02/ftc-enforcement-action-bar-goodrx-sharing-consumers-sensitive-health-info-advertising",
          },
          ". GoodRx is a health app rather than a dental office, so that specific rule may not reach your practice, but it shows the direction regulators are moving, and the FTC's deception authority can reach any business that misstates how it handles data.",
        ],
      },
      {
        type: "p",
        runs: [
          "The more common consequence has been private litigation. Patients have no private right of action under HIPAA itself; it is enforced by the government, federal regulators and, in some cases, state attorneys general, not by individuals. Instead, patients sue under state wiretapping and privacy laws, arguing that a pixel intercepted their communications without consent. A 27-hospital system, Advocate Aurora Health, ",
          {
            text: "agreed to a settlement of more than $12 million",
            href: "https://www.advocateaurorasettlement.com/home/faqs2/",
          },
          " over tracking pixels on its website and patient portal, while denying any wrongdoing. Those cases have produced multimillion-dollar settlements against healthcare providers, and dental practices are not exempt.",
        ],
      },
      {
        type: "table",
        headers: ["", "Who can act", "Over what"],
        rows: [
          [
            "HIPAA",
            "HHS Office for Civil Rights",
            "Sending patient data to a vendor with no permission and no BAA",
          ],
          [
            "FTC",
            "Federal Trade Commission",
            "Misleading privacy claims; health apps under the Health Breach Notification Rule",
          ],
          [
            "Lawsuits",
            "Patients, by class action",
            "State wiretapping and privacy laws, since HIPAA has no private right of action",
          ],
          [
            "State AGs",
            "State attorneys general",
            "State consumer-protection and privacy laws, and in some cases HIPAA itself",
          ],
        ],
        caption:
          "Four separate doors. One tracking pixel on the wrong page can open more than one of them at the same time.",
      },

      { type: "h2", text: "What Aspen Dental's $18 million settlement shows" },
      {
        type: "p",
        runs: [
          "In 2025, Aspen Dental Management agreed to a settlement fund of more than $18 million in a class action, ",
          {
            text: "Donnelly v. Aspen Dental Management",
            href: "https://www.aspendentalpixelsettlement.com/",
          },
          ". The patients claimed the dental chain's website used the Meta Pixel and Google tools that allegedly sent information about people who booked appointments online to Facebook and Google, without their consent. Aspen denied any wrongdoing, and a settlement is not a court finding that a company broke the law.",
        ],
      },
      {
        type: "p",
        runs: [
          "The lesson for a small practice is not the headline number. This was not a hospital with a vast data operation. It was an ordinary booking page. The payout per patient was small; the total came from the sheer number of people who had booked. The same setup, a Facebook or Google pixel firing on your \"request an appointment\" page, is the same kind of tracking the case was built on.",
        ],
      },
      {
        type: "image",
        src: "/pixel-class-action-settlement-aspen-dental-tracking.webp",
        alt:
          "Summary card for the 2025 Aspen Dental tracking-pixel class-action settlement: Aspen Dental Management agreed to a settlement fund of more than 18 million dollars to resolve claims that tracking pixels on its appointment-booking website sent patient information to Meta (Facebook) and Google without consent. The company denied wrongdoing. Labeled as a private class-action settlement, not an OCR penalty or government fine.",
        width: 1500,
        height: 760,
        caption: [
          "Source: Donnelly v. Aspen Dental Management, Inc., No. 2025LA000036 (Circuit Court of Sangamon County, Illinois), a settlement fund of more than $18 million over tracking pixels that allegedly sent online-booking data to Meta and Google. Aspen Dental denied wrongdoing. This is a private class-action settlement, not a government penalty.",
        ],
      },
      {
        type: "p",
        runs: [
          "You do not have to guess whether your own booking page has the same gap. The free ",
          { text: "HIPAA Scorecard", href: "/scorecard" },
          " checks your website tracking and vendor setup along with eight other core controls, and names your top gap in about three minutes. It is a starting point, not a full audit, but it tells you where you stand.",
        ],
      },

      { type: "h2", text: "How to check your dental website for tracking pixels" },
      {
        type: "p",
        runs: [
          "You do not need a developer for the first pass. Five steps tell you most of what you need to know, and the result feeds straight into the ",
          {
            text: "dental HIPAA risk assessment",
            href: "/articles/do-dental-practices-need-hipaa-risk-assessment",
          },
          " every practice has to keep.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            label: "Inventory every tag on your site",
            detail:
              "List the trackers you run: the Meta Pixel, Google Analytics, Google Tag Manager, ad pixels, chat widgets, and form tools. Pay special attention to Google Tag Manager, since it is a container that can load many other trackers at once and most practices don't know what is firing through it. A free privacy scanner or your browser's developer tools will show what actually fires on each page.",
          },
          {
            label: "Sort your pages into two piles",
            detail:
              "Marketing pages with no patient data on one side: homepage, services, blog. Pages that touch patient data on the other: the booking page, the patient portal, intake and contact forms.",
          },
          {
            label: "Pull pixels off any page that touches patient data",
            detail:
              "Remove or block the Meta Pixel, Google Analytics, and ad tags on the booking page, the portal, and any form that collects a name plus a reason for the visit. This is the single highest-value fix.",
          },
          {
            label: "Check your URLs and page titles",
            detail:
              "A link like /book?service=root-canal puts the treatment name into the data the page sends to any pixel loaded on it. Strip health detail out of the URLs and page titles on any page you still track.",
          },
          {
            label: "Write it into your risk analysis",
            detail:
              "OCR's stated enforcement priority for tracking is the Security Rule. Record what tracks what, and your decision to keep pixels off patient-data pages, in your risk analysis.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "Going dark is not the only option. You can still measure your traffic without the HIPAA exposure: keep marketing pixels only on pages with no patient data, and for everything else use analytics that never send visitor data to a third party, like server-side logging or privacy-first tools that do not rely on cookies. For the record, this site is built to sidestep the problem: privacy-first, cookieless analytics and no third-party advertising or social pixels at all. The expensive path is sorting it out after a dispute has already begun.",
        ],
      },
      {
        type: "p",
        runs: [
          "This is general information about HIPAA, the FTC Act, and state privacy law, not legal advice. This is an unsettled and fast-moving area, and the right answer depends on your specific site and your state. Before you rely on any tracking setup on a page that could touch patient data, have it reviewed by counsel.",
        ],
      },
      { type: "h2", text: "About the author" },
      {
        type: "p",
        runs: [
          "Dolev Arama is Hipsana's founder. He's the one behind the Scorecard and the short risk reviews it produces. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. The writing here starts where the rules actually live, at HHS, OCR, and NIST, and gets checked against their current text before it goes up. Regulatory claims trace back to those sources, and figures name where they come from; anything that can't be verified is labeled rather than asserted. ",
          { text: "More about Hipsana \u2192", href: "/about" },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          [
            "HHS Office for Civil Rights, \u201cUse of Online Tracking Technologies by HIPAA Covered Entities and Business Associates\u201d (hhs.gov, accessed June 2026), including the June 20, 2024 vacatur note for Am. Hosp. Ass\u2019n v. Becerra, No. 4:23-cv-1110 (N.D. Tex.).",
          ],
          [
            "45 CFR \u00a7 164.502(a) (permitted uses and disclosures of PHI) and \u00a7 164.508(a)(3) (authorization required for marketing) (eCFR, current).",
          ],
          [
            "45 CFR \u00a7 164.308(a) (security risk analysis and risk management) and \u00a7 164.312(e) (transmission security) (eCFR, current).",
          ],
          [
            "45 CFR \u00a7 160.103 (definitions of \u201cbusiness associate\u201d and \u201cprotected health information\u201d) (eCFR, current).",
          ],
          [
            "Google, \u201cHIPAA and Google Analytics,\u201d Analytics Help (support.google.com, accessed June 2026): Google does not offer a business associate agreement for Google Analytics, and HIPAA-regulated entities should not set Analytics tags on HIPAA-covered pages.",
          ],
          [
            "Federal Trade Commission, \u201cFTC Enforcement Action to Bar GoodRx from Sharing Consumers\u2019 Sensitive Health Info for Advertising\u201d (ftc.gov, Feb. 1, 2023): first action under the Health Breach Notification Rule; $1.5 million civil penalty.",
          ],
          [
            "Donnelly, et al. v. Aspen Dental Management, Inc., No. 2025LA000036 (Cir. Ct. Sangamon County, Ill.): settlement fund of more than $18 million over tracking-pixel disclosures; the company denied wrongdoing (official settlement website, accessed June 2026).",
          ],
          [
            "In re Advocate Aurora Health Pixel Litigation, No. 2:22-cv-1253 (E.D. Wis.): a $12,225,000 settlement fund over tracking pixels on the system's website and patient portal; the company denied wrongdoing (official settlement website, accessed June 2026).",
          ],
        ],
      },
    ],
    faq: [
      {
        question: "Is Google Analytics HIPAA compliant?",
        answer:
          "No, not as a HIPAA-compliant tool: Google does not offer a business associate agreement for Google Analytics, so it does not belong on any page that handles patient data, like your booking page or patient portal. On a marketing page with no patient information, such as your homepage, it is generally fine.",
      },
      {
        question: "Is the Facebook (Meta) pixel allowed on a dental website?",
        answer:
          "In practice, keep it off any page that handles patient data. There is no business associate agreement available for the Meta Pixel, so on a booking page, a patient portal, or an intake form it can create an impermissible disclosure of protected health information. On a marketing page with no patient data, it is generally fine.",
      },
      {
        question: "Didn't a 2024 court ruling say tracking pixels are fine now?",
        answer:
          "No. The 2024 ruling in AHA v. Becerra struck down one narrow theory, that an IP address plus a visit to a public health page is automatically protected. The rules for booking pages, patient portals, and business associate agreements still apply, and the ruling does not affect the FTC or private lawsuits.",
      },
      {
        question: "Does a cookie consent banner make tracking HIPAA compliant?",
        answer:
          "No. Clicking accept on a cookie banner is not a HIPAA authorization, and neither is a disclosure in your privacy policy. HIPAA requires a permission under the Privacy Rule and a signed agreement with any vendor that receives patient data.",
      },
      {
        question: "Can a patient sue my dental practice over a tracking pixel?",
        answer:
          "Not under HIPAA itself, which has no private right of action and is enforced by the government, not by individuals. But patients have sued healthcare providers under state wiretapping and privacy laws over website pixels, and those cases have produced large settlements, including ones involving a national dental chain and a major hospital system.",
      },
      {
        question: "What can I use instead of Google Analytics or the Meta Pixel?",
        answer:
          "Keep marketing pixels only on pages with no patient data. For everything else, use analytics that never send visitor data to a third party, such as server-side logging or privacy-first, cookieless tools. Document the choice in your risk analysis.",
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
