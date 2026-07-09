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
          <strong>
            This is placeholder text. Replace it with a real privacy policy
            before launching — see the notes below.
          </strong>
        </p>

        <h2>What this page needs to cover</h2>
        <p>Before applying for AdSense or collecting any data, this page should explain, in plain language:</p>
        <ul>
          <li>That third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this or other websites.</li>
          <li>That users can opt out of personalized advertising through Google's Ads Settings, or via aboutads.info if they're outside the EEA.</li>
          <li>What analytics tools the site uses (e.g. Google Analytics), and what data they collect.</li>
          <li>Whether the site uses affiliate links, and that those links may use tracking cookies.</li>
          <li>How users can contact the site owner with privacy questions.</li>
          <li>GDPR/CCPA-relevant details if the site expects EU or California visitors — consider a consent banner if serving personalized ads there.</li>
        </ul>
        <p>
          Google's own free{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy &amp; Terms guidance for publishers
          </a>{" "}
          and a generator such as a dedicated privacy-policy tool are good
          starting points for turning this into a real, compliant policy.
        </p>
      </div>
    </main>
  );
}
