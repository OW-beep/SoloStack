// Central affiliate link registry.
//
// HOW THIS WORKS
// Every outbound vendor link in an article's `body` markdown is written
// as the vendor's plain URL (e.g. https://www.trados.com). At render
// time (app/reviews/[slug]/page.js), any URL that matches a key below
// gets swapped for its affiliate/referral URL before the page is sent
// to the browser. This means signing up for a new affiliate program
// never requires touching data/articles.js — add or update one line
// here and every article that links to that vendor picks it up
// automatically.
//
// HOW TO ADD A PROGRAM
// 1. Apply for the vendor's affiliate/referral/partner program (see
//    the STATUS notes below — some are self-serve, some require
//    approval, some run through a network like PartnerStack or
//    Impact rather than the vendor directly).
// 2. Once approved, replace the value for that vendor below with your
//    real tracking URL.
// 3. Leave vendors with no program (or ones you haven't applied to
//    yet) pointing at their plain URL — that's the safe default and
//    is what every entry below does out of the box.
//
// Keys are the exact plain URLs used in data/articles.js. Match must
// be exact (including trailing slash) — check the source article if
// a swap doesn't seem to take effect.

export const affiliateLinks = {
  // -- Getting Paid --
  "https://www.freetaxusa.com": "https://www.freetaxusa.com", // no public affiliate program as of last check
  "https://www.getharvest.com": "https://www.getharvest.com", // STATUS: check — Harvest has run referral credits in the past, not always a cash affiliate program
  "https://www.xero.com": "https://www.xero.com", // Xero runs a partner/referral program aimed at accountants, not typical content affiliates — confirm fit before applying
  "https://wise.com": "https://wise.com", // Wise has a public affiliate program (self-serve via their own portal)
  "https://found.com": "https://found.com", // STATUS: check current referral program terms
  "https://www.zoho.com/invoice/": "https://www.zoho.com/invoice/", // Zoho runs an affiliate program via its own portal, shared across Zoho products
  "https://betterproposals.io": "https://betterproposals.io", // Better Proposals has a self-serve affiliate program
  "https://www.signwell.com": "https://www.signwell.com", // STATUS: check — smaller vendor, may need to email to ask
  "https://www.northwestregisteredagent.com": "https://www.northwestregisteredagent.com", // Northwest Registered Agent runs a public affiliate program
  "https://www.xe.com": "https://www.xe.com",
  "https://use.expensify.com": "https://use.expensify.com",
  "https://financial-cents.com": "https://financial-cents.com",

  // -- Staying Organized --
  "https://www.notion.com": "https://www.notion.com", // Notion has a public affiliate program (self-serve)
  "https://clickup.com": "https://clickup.com", // ClickUp has a public affiliate program (Impact network)
  "https://bitwarden.com": "https://bitwarden.com", // Bitwarden has a public affiliate program
  "https://www.hubspot.com/products/crm": "https://www.hubspot.com/products/crm", // HubSpot has a large public affiliate program (Impact network)
  "https://tidycal.com": "https://tidycal.com", // TidyCal (AppSumo-linked) — check current program status
  "https://www.dropbox.com": "https://www.dropbox.com", // Dropbox has a public referral/affiliate program
  "https://www.backblaze.com": "https://www.backblaze.com", // Backblaze has a public affiliate program
  "https://www.worldtimebuddy.com": "https://www.worldtimebuddy.com",
  "https://sparkmailapp.com": "https://sparkmailapp.com",

  // -- Winning Clients --
  "https://webflow.com": "https://webflow.com", // Webflow has a public affiliate program
  "https://www.honeybook.com": "https://www.honeybook.com", // HoneyBook has a public affiliate program
  "https://glossgenius.com": "https://glossgenius.com", // STATUS: check — mostly runs referral credits for existing users
  "https://pixieset.com": "https://pixieset.com", // Pixieset has a public affiliate program
  "https://frame.io": "https://frame.io",
  "https://buffer.com": "https://buffer.com", // Buffer has a public affiliate program
  "https://www.zoho.com/mail/": "https://www.zoho.com/mail/", // same Zoho affiliate program as Zoho Invoice above

  // -- AI Stack --
  "https://claude.com": "https://claude.com", // no consumer content-affiliate program
  "https://www.grammarly.com": "https://www.grammarly.com", // Grammarly has a public affiliate program (Impact network)
  "https://chatgpt.com": "https://chatgpt.com",
  "https://www.frase.io": "https://www.frase.io", // Frase has a public affiliate program
  "https://elevenlabs.io": "https://elevenlabs.io", // ElevenLabs has a public affiliate program
  "https://www.adobe.com/products/firefly.html": "https://www.adobe.com/products/firefly.html",
  "https://fathom.video": "https://fathom.video", // Fathom has a public referral program

  // -- Insurance / Banking --
  "https://www.nextinsurance.com": "https://www.nextinsurance.com", // NEXT Insurance runs a partner program, application-based
  "https://protonvpn.com": "https://protonvpn.com", // Proton has a public affiliate program

  // -- Niche tool comparisons --
  "https://www.trados.com": "https://www.trados.com", // STATUS: check — RWS/Trados reseller vs affiliate terms differ
  "https://www.thinkific.com": "https://www.thinkific.com", // Thinkific has a public affiliate program
};

// Looks up a plain vendor URL and returns its affiliate URL if one is
// configured, otherwise returns the original URL unchanged. Safe to
// call on every external href — internal/relative links never match.
export function toAffiliateUrl(url) {
  return affiliateLinks[url] || url;
}
