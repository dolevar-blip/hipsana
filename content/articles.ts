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
    };

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
  {
    slug: "what-happens-if-dental-practice-fails-hipaa-audit",
    status: "published",
    title: "What Happens If a Dental Practice Fails a HIPAA Audit? (2026)",
    description:
      "A random HIPAA audit rarely ends in a fine. The real risk is an OCR investigation after a breach or complaint, and what failing actually costs a small dental practice.",
    author: "Dolev Arama",
    datePublished: "2026-06-04",
    dateModified: "2026-06-04",
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
            "You report a breach of unsecured patient information, which the Breach Notification Rule requires (45 CFR §§164.400-414). Breaches affecting 500 or more people are also posted on OCR’s public portal, the “Wall of Shame.”",
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
          "The honest numbers are smaller than the headlines and larger than most owners assume. In October 2024, OCR launched a Risk Analysis Initiative to focus investigations on this one requirement, and in its first year it announced more than a dozen settlements, from small physician groups to hospital systems. Nearly all shared Bryan County's gap: no accurate, thorough risk analysis. A few published outcomes for that single failure:",
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
          "The costs that are not a dollar figure matter too. The corrective action plan means years of work under OCR supervision. If a breach crossed the 500-person line, your practice name sits on a public federal list. For a solo dentist whose reputation is the practice, that can outlast the check.",
        ],
      },
      {
        type: "p",
        runs: [
          "One dental-specific point is worth knowing, because it is the other common way a dentist ends up in front of OCR. In 2022, dental practices were a focus of OCR's Right of Access enforcement, the rule that requires giving patients a copy of their records, usually within 30 days. That September, OCR settled three dental cases at once, for $30,000, $80,000, and $25,000, each over a patient who waited months for records they were owed. So the two paths that most often end in a penalty for a dentist are a reported breach, where the risk analysis is the issue, and a records request the patient had to chase.",
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
          "This is also where most practices quietly fall short. The risk analysis is required of every covered practice, but it is not a twenty-minute form. HHS offers a free Security Risk Assessment Tool, a reasonable place to start, but not a finished assessment that would satisfy an investigator: it gives you the questions, not which answers are wrong in your office. If you have never run one, ",
          { text: "our guide to the dental HIPAA risk assessment", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" },
          " covers what it has to include.",
        ],
      },
      {
        type: "p",
        runs: [
          "That is the gap the ",
          { text: "HIPAA Risk Scorecard", href: "/scorecard" },
          " is built to surface. It checks the controls OCR looks at first, scores your practice, and follows with a short review and an intro to a vetted specialist if you want help. A few minutes, and you see where you stand before a breach or a complaint forces the question. ",
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
            "Every vendor that touches patient data, your practice-management software, IT company, billing service, needs one (45 CFR §164.504(e)). Missing BAAs are a recurring finding.",
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
            "Knowing how to report on time keeps a manageable incident from becoming a Breach Notification Rule violation on top of the breach.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "None of these is expensive alone. What makes them feel impossible is not knowing which you are missing, which is the whole reason the risk analysis comes first.",
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
          "Dolev Arama is the founder of Hipsana, where he runs the HIPAA Risk Scorecard and the short practice risk reviews behind it. He is not an attorney, and Hipsana is a publisher and referral service, not a law firm or a healthcare provider. Its compliance writing starts from primary regulators (HHS, OCR, NIST) and is checked against their current text before anything goes live. ",
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
          "It is a fair starting point for understanding what a risk analysis involves, but it is not a finished assessment on its own. It gives you the questions, not the answer to which gaps exist in your specific practice. The HIPAA Risk Scorecard checks the controls OCR looks at first and follows with a short review.",
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
    description:
      "A dental data breach starts a 60-day HIPAA clock. The exact steps to take, who to notify, and what OCR looks for first, anchored to a real OCR settlement.",
    author: "Dolev Arama",
    datePublished: "2026-06-05",
    dateModified: "2026-06-05",
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
          [{ strong: "Encrypted data may be off the hook." }, " The rules apply only to \"unsecured\" patient information. Data encrypted to the federal standard can fall under a safe harbor and may not trigger notice at all."],
          [{ strong: "The report you file is what opens the investigation." }, " When a small New York neurology practice reported a ransomware attack, the first thing OCR asked for was its risk analysis. There wasn't one. It paid $25,000."],
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
          [{ strong: "Call your cyber-insurer." }, " If you carry cyber coverage, notify them right away. Many policies require prompt notice and provide a breach coach who runs the response, and some deny claims if you act on your own first."],
          [{ strong: "Report it to the FBI." }, " Filing with the FBI's Internet Crime Complaint Center at ic3.gov is voluntary, but law enforcement may share intelligence on the attacker and occasionally help with recovery. It does not replace your duty to notify patients."],
          [{ strong: "Don't rush to pay a ransom." }, " Paying does not erase your notification obligations, and the FBI generally discourages it. Make that call with counsel and your insurer, not in a panic."],
        ],
      },
      { type: "h2", text: "Is this even a reportable breach?" },
      {
        type: "p",
        runs: [
          "Not every security scare is a reportable breach, but HIPAA puts the burden on you to prove it isn't. A breach can take many shapes: ransomware that locks your records, a lost or stolen laptop, an email sent to the wrong patient, a former employee who copied files on the way out, or a stolen server. Whatever the cause, the same test applies.",
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
          "Here is the part most practice owners miss. The breach report Comprehensive was legally required to file is the same document that opened a federal investigation. And the first thing investigators looked for was something every covered entity must already have: an accurate, thorough risk analysis of where its patient data lived and how it was protected (45 CFR 164.308(a)(1)). Comprehensive didn't have one. In April 2025 it agreed to pay $25,000 and to operate under a corrective action plan monitored by OCR for two years.",
        ],
      },
      {
        type: "p",
        runs: [
          "The dollar figure is small by enforcement standards. The lesson is not. OCR did not penalize the practice for being attacked; ransomware hits well-run organizations too. It acted because, when investigators asked the practice to show how it had assessed its own risks, there was nothing to show.",
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
          "The hard part of a breach isn't fixing the gaps. It's knowing which ones you have before OCR does. The HIPAA Risk Scorecard checks the 10 things OCR looks at first, then gives you a short risk review and an intro to a vetted specialist. It takes about 3 minutes. ",
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
          "Breach response is the expensive end of HIPAA. The cheap end is prevention, and it begins with the same document OCR asked Comprehensive for. If you are reading this before anything has gone wrong, this is where your attention pays off most. A handful of moves cover most of the risk for a small dental practice:",
        ],
      },
      {
        type: "ul",
        items: [
          [{ strong: "Run a real risk analysis, then fix what it finds." }, " This is the single most-cited failure in OCR settlements. We break down what one involves in ", { text: "our guide to HIPAA risk assessments for dental practices", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" }, "."],
          [{ strong: "Encrypt laptops, backups, and any device that touches patient data," }, " so a lost or stolen device falls under the safe harbor."],
          [{ strong: "Sign a business associate agreement with every vendor that handles patient data," }, " and require fast breach reporting inside it."],
          [{ strong: "Train your team on phishing and basic security," }, " since most breaches start with a click."],
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
