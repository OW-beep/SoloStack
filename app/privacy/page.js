export const metadata = {
  title: "Privacy Policy | SoloStack",
  description: "How SoloStack handles data, cookies, and advertising.",
};

export default function PrivacyPage() {
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>Privacy policy</h1>
        <p>
          <em>Last updated: [insert the date you publish this page].</em>
        </p>
        <p>
          This policy explains what information SoloStack ("we," "us," "the
          site") collects when you visit solostack.[yourdomain], and how
          that information is used.
        </p>

        <h2>Information we collect</h2>
        <p>
          SoloStack does not require account creation and does not directly
          collect personal information such as your name or email address
          unless you choose to contact us. When you browse the site, the
          following information may be collected automatically:
        </p>
        <ul>
          <li>
            Standard log data (browser type, pages visited, time spent,
            referring site) collected by our hosting provider and any
            analytics tools we use.
          </li>
          <li>
            Cookies and similar technologies used by advertising and
            analytics partners, described below.
          </li>
        </ul>

        <h2>Cookies and advertising</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads
          based on your prior visits to this website or other websites on
          the internet. Google's use of advertising cookies enables it and
          its partners to serve ads based on your visit to this site and/or
          other sites.
        </p>
        <p>
          You can opt out of personalized advertising by visiting Google's{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ads Settings
          </a>
          . If you're located in the European Economic Area, you can also
          manage participating vendors' use of cookies through{" "}
          <a
            href="https://www.youronlinechoices.eu"
            target="_blank"
            rel="noopener noreferrer"
          >
            youronlinechoices.eu
          </a>
          . Outside the EEA, you can visit{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>{" "}
          to opt out of participating vendors' interest-based ads.
        </p>

        <h2>Analytics</h2>
        <p>
          [If you add an analytics tool such as Google Analytics or Vercel
          Analytics, name it here and briefly describe what it tracks — for
          example: "We use [tool name] to understand how visitors use this
          site, including which pages are viewed and how long visitors
          stay. This data is aggregated and doesn't identify you
          individually."]
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some links on this site are affiliate links, meaning SoloStack
          may earn a commission if you sign up for a product through them,
          at no extra cost to you. Affiliate links may set a tracking
          cookie to record the referral. This doesn't affect our editorial
          comparisons — see our{" "}
          <a href="/about">About page</a> for details.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access,
          correct, or delete personal data we hold about you, and to object
          to certain processing (for example, personalized advertising).
          Since we don't collect account-level personal data directly, most
          of these rights are best exercised through the opt-out links
          above and your browser's cookie settings.
        </p>

        <h2>Children's privacy</h2>
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes will be
          posted on this page with an updated "last updated" date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          [insert a real contact email address here].
        </p>
      </div>
    </main>
  );
}
