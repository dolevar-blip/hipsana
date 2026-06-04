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
          "When a dentist asks what happens if they fail a HIPAA audit, the honest answer changes the question. If OCR finds during an investigation that your practice missed a HIPAA requirement, the usual outcome is a written settlement, a payment that for a small practice tends to land in five or six figures, and a corrective action plan the government oversees for two to three years. A random audit by itself almost never produces a fine. What costs practices money is the investigation that follows a complaint or a reported breach.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          [
            "A surprise OCR audit is rare, and on its own it has almost never produced a fine. The 2016-2017 audit round found violations but imposed no penalties and opened no investigations.",
          ],
          [
            "The real financial risk is an OCR ",
            { strong: "investigation" },
            ", and nearly all of them start the same way: a patient complaint, or a breach you are legally required to report yourself.",
          ],
          [
            "“Failing” usually comes down to one finding. After a breach, the first document OCR asks for is your risk analysis, and most small practices either never did one or did a checkbox version.",
          ],
          [
            "The price for that single gap, in recent cases, has run from roughly $10,000 to $225,000, plus two to three years of corrective action the government monitors directly.",
          ],
          [
            "The way to get ahead of it is to know your gaps before OCR does. ",
            { text: "Check your practice with the HIPAA Risk Scorecard.", href: "/scorecard" },
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "In late 2021, an emergency medical provider in Oklahoma was hit by ransomware that locked files holding records for roughly 14,000 patients. The provider, Bryan County Ambulance Authority, reported the breach to federal regulators, as the law required. OCR opened an investigation and found one decisive thing: the organization had never conducted a risk analysis, the basic security review HIPAA requires of every covered practice. The matter settled for $90,000 plus three years of federal oversight (",
          {
            text: "HHS, October 2024",
            href: "https://www.hhs.gov/about/news/2024/10/31/hhs-office-for-civil-rights-settles-hipaa-ransomware-cybersecurity-investigation-for-90000-dollars.html",
          },
          "). It is an ambulance service, not a dental office. But the failure OCR cited has nothing to do with ambulances and everything to do with the most common gap it finds in small practices of every kind.",
        ],
      },

      { type: "h2", text: "First, what a “HIPAA audit” really is (and isn’t)" },
      {
        type: "p",
        runs: [
          "Most dentists picture a HIPAA audit as a government official appearing unannounced, clipboard in hand, ready to fine you for the box you forgot to check. That is not how the money usually changes hands.",
        ],
      },
      {
        type: "p",
        runs: [
          "OCR runs a formal HIPAA Audit Program under the HITECH Act, but it is small and periodic. The last full round, in 2016-2017, reviewed 166 covered entities and 41 business associates. The current round, which OCR restarted in late 2024 after an eight-year pause, covers just 50 organizations and focuses on the risk analysis and risk management requirements of the Security Rule (",
          { text: "HHS", href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/audit/index.html" },
          "). Across hundreds of thousands of HIPAA-regulated practices, the odds that yours is randomly selected in any given year are low.",
        ],
      },
      {
        type: "p",
        runs: [
          "Here is the part that surprises people. OCR itself frames the audit program as a way to improve compliance, not to punish. In 2024, the HHS Office of Inspector General reviewed the 2016-2017 round and concluded it had done little to improve cybersecurity, in part because OCR identified violations but imposed no penalties and the audits did not even trigger follow-up investigations. In other words, the thing most owners fear, failing a surprise audit, has historically carried no fine at all.",
        ],
      },
      {
        type: "p",
        runs: [
          "What actually puts a practice at financial risk is an OCR ",
          { strong: "investigation" },
          ", which is a different process with a different trigger. An investigation starts when:",
        ],
      },
      {
        type: "ul",
        items: [
          ["A patient or staff member files a complaint with OCR, or"],
          [
            "You report a breach of unsecured patient information, which the Breach Notification Rule requires you to do (45 CFR §§164.400-414). Breaches affecting 500 or more people are also posted on OCR’s public portal, the list many in the industry call the “Wall of Shame.”",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "The resumed audit program does add one wrinkle worth knowing: if an audit surfaces a serious problem, OCR can convert it into an investigation. So the program is not toothless going forward. But the dominant path to a penalty still runs through the breach you have to report or the complaint a patient files, not a random knock on the door.",
        ],
      },

      { type: "h2", text: "What an OCR investigation actually looks like" },
      {
        type: "p",
        runs: [
          "Walk through the Bryan County case, because it is a clean map of the process and the timeline.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            label: "The trigger",
            detail:
              "A ransomware attack encrypted the provider's files in November 2021. It reported the breach to OCR in May 2022.",
          },
          {
            label: "OCR opens an investigation",
            detail: "In June 2022, weeks after the breach report, OCR opened its review.",
          },
          {
            label: "OCR requests documents, and one comes first",
            detail:
              "After a breach, one of the first things OCR requests is your risk analysis and the date you last completed it. A risk analysis is the required, written exercise of finding where patient data lives and what could go wrong with it (45 CFR §164.308(a)(1)(ii)(A)). It is the foundation the rest of your security sits on.",
          },
          {
            label: "OCR makes findings",
            detail: "Here, the finding was blunt: no evidence the organization had ever done a risk analysis.",
          },
          {
            label: "Resolution",
            detail:
              "Most matters end in a Resolution Agreement: a monetary settlement plus a Corrective Action Plan, with no admission of wrongdoing. Bryan County settled for $90,000 and a plan OCR will monitor for three years. OCR reserves a formal Civil Money Penalty for the most serious cases.",
          },
        ],
      },
      {
        type: "p",
        runs: [
          "Two things about this process catch practices off guard. First, it is slow. Bryan County's breach happened in 2021 and did not settle until late 2024. In another 2024 settlement, a vendor's breaches from 2018 and 2019 took roughly six years to resolve. An investigation is not a bad afternoon; it can shadow a practice for years. Second, the corrective action plan is the part people underestimate. It is not a one-time fine you pay and forget. It is a multi-year commitment, supervised by the government, to fix what they found.",
        ],
      },

      { type: "h2", text: "What “failing” actually costs" },
      {
        type: "p",
        runs: [
          "This is where the fear needs calibrating in both directions, because the honest numbers are smaller than the headlines and larger than most owners assume.",
        ],
      },
      {
        type: "p",
        runs: [
          "OCR launched a Risk Analysis Initiative in October 2024 to focus investigations on this single requirement. In roughly the first year it announced more than a dozen settlements, spanning organizations from small physician groups to large hospital systems and IT vendors. The common thread in nearly all of them was the same gap Bryan County had: failing to conduct an accurate and thorough risk analysis. A few of the published outcomes for that one failure:",
        ],
      },
      {
        type: "ul",
        items: [
          ["A behavioral health provider settled for $225,000 plus a two-year corrective action plan after a ransomware attack."],
          ["Another small provider settled for $10,000."],
          ["Bryan County's emergency provider settled for $90,000."],
          ["A wellness-plan vendor settled for roughly $228,000."],
        ],
      },
      {
        type: "p",
        runs: [
          "For a solo or small dental practice, the realistic exposure for a serious HIPAA failure sits in the five-to-six-figure range, not the seven-figure range you may have seen quoted. The headline numbers, the multimillion-dollar figures, generally attach to large organizations or to the most serious tier of violation. The statutory ceiling does exist: the maximum annual penalty for the worst tier, willful neglect that is never corrected, is $2,190,294 for 2026 (",
          {
            text: "Federal Register, January 2026",
            href: "https://www.federalregister.gov/documents/2026/01/28/2026-01688/annual-civil-monetary-penalties-inflation-adjustment",
          },
          "). But under OCR's longstanding enforcement approach, that top cap applies in practice only to that worst category. A small practice that reports a breach and shows good-faith effort is not the profile that draws it.",
        ],
      },
      {
        type: "p",
        runs: [
          "The costs that do not show up as a single dollar figure are worth naming too. The corrective action plan means years of work under OCR supervision: redo the risk analysis, build a risk management plan, rewrite your policies, train your staff, and report your progress. If your breach crossed the 500-person threshold, your practice name sits on a public federal list. For a solo dentist whose reputation is the practice, that exposure can outlast the check you write.",
        ],
      },
      {
        type: "p",
        runs: [
          "One dental-specific point surprises people: the most common reason OCR has actually fined dental practices is not a breach at all. It is the Right of Access rule, the requirement to give patients a copy of their own records, usually within 30 days. In 2022, eight dental practices settled with OCR for a combined $305,500, most of them over access failures. So the two paths that most often end in a penalty for a dentist are a reported breach, where the risk analysis is the issue, and a patient who could not get their records and filed a complaint.",
        ],
      },

      { type: "h2", text: "The one document OCR checks first" },
      {
        type: "p",
        runs: [
          "Step back from the individual cases and a pattern is hard to miss. The expensive failure is almost never exotic. It is the risk analysis, missing or done as a checkbox.",
        ],
      },
      {
        type: "p",
        runs: [
          "That is not an accident of which cases get publicized. After a breach, the risk analysis is one of the first things OCR asks to see, because it reveals whether the practice was paying attention to its own vulnerabilities before something went wrong. A current, honest risk analysis does not make you breach-proof. It does change the conversation: it shows you took the required step, and the factors OCR weighs when setting a penalty include your history of compliance and your good-faith efforts to fix problems (45 CFR §160.408).",
        ],
      },
      {
        type: "p",
        runs: [
          "This is also where most practices quietly fall short, and it is worth being honest about why. The risk analysis is required of every covered practice, but it is not a form you fill out in twenty minutes. HHS offers a free Security Risk Assessment Tool, and it is a reasonable place to start learning what the exercise involves. It is not, by itself, a finished assessment that would satisfy an OCR investigator. A downloaded template tells you the questions; it does not tell you which answers are wrong in your practice. If you have never run one, ",
          { text: "our guide to the dental HIPAA risk assessment", href: "/articles/do-dental-practices-need-hipaa-risk-assessment" },
          " walks through what it has to cover.",
        ],
      },
      {
        type: "p",
        runs: [
          "That is the gap the ",
          { text: "HIPAA Risk Scorecard", href: "/scorecard" },
          " is built to surface. It checks the core controls OCR looks at first, gives you a clear score, and follows with a short risk review and an intro to a vetted specialist if you want help closing the gaps. It takes a few minutes, and it tells you where you stand before a breach or a complaint forces the question. ",
          { text: "Check your practice now.", href: "/scorecard" },
        ],
      },

      { type: "h2", text: "How to get ahead of an investigation" },
      {
        type: "p",
        runs: [
          "If you want to be the practice that comes through an investigation intact rather than the one that writes a six-figure check, the work is not mysterious. It mirrors what OCR puts in nearly every corrective action plan, which tells you exactly what “good” looks like in their eyes.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Do a real risk analysis. " },
            "Map where patient data lives, how it moves, and what could expose it. Write it down and date it. This is the single highest-value step, and the one OCR checks first.",
          ],
          [
            { strong: "Build a risk management plan. " },
            "A risk analysis that finds problems and fixes nothing is worse than none at all. List the gaps it surfaced and how you will close each one.",
          ],
          [
            { strong: "Put real business associate agreements in place. " },
            "Every vendor that touches patient data, your practice management software, your IT company, your billing service, needs a signed BAA (45 CFR §164.504(e)). Missing BAAs are a recurring finding.",
          ],
          [
            { strong: "Write your policies and procedures, and follow them. " },
            "“We know what to do” is not a policy. OCR expects documents you can produce.",
          ],
          [
            { strong: "Train your team, and keep the records. " },
            "A receptionist's mistake is the practice's liability. Annual training, documented, is both a requirement and a defense.",
          ],
          [
            { strong: "Have a breach response plan. " },
            "If something does happen, knowing how to investigate and report it on time keeps a manageable incident from becoming a Breach Notification Rule violation on top of the breach itself.",
          ],
        ],
      },
      {
        type: "p",
        runs: [
          "None of these is expensive on its own. What makes them feel impossible is not knowing which ones your practice is actually missing, which is the entire reason the risk analysis comes first.",
        ],
      },

      { type: "h2", text: "The catch: a few things that are easy to get wrong" },
      {
        type: "p",
        runs: [
          { strong: "“We’re too small to be on OCR’s radar.” " },
          "The Risk Analysis Initiative explicitly reached small physician groups, and one settlement for this failure was $10,000, a figure that only makes sense for a very small organization. OCR’s stated position is that no entity is too large or too small to be held to the risk analysis requirement.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "“If I report my own breach, I’m just inviting a fine.” " },
          "Not reporting is far worse. A failure to notify is its own violation, and trying to hide a breach is exactly the kind of conduct that pushes a case toward the willful-neglect category. The practices that fare best are the ones that report promptly and show they had taken the required steps beforehand.",
        ],
      },
      {
        type: "p",
        runs: [
          { strong: "“A clean audit means I’m fine.” " },
          "The audit program and an investigation test different things, and passing one says little about the other. The audit selects a handful of practices for a documentation review. The investigation is what happens after a real-world breach or complaint, and that is where the money is.",
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
