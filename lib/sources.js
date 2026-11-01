// Official sites (and, where the price sheet has one, official pricing
// pages) for the tools discussed in an article. Links go to the provider
// itself, not to affiliate or tracking URLs. `pricing: true` marks a
// pricing page rather than a home page.

const P = (name, url) => ({ name, url, pricing: true });
const S = (name, url) => ({ name, url, pricing: false });

const NOTION_PRICING = P("Notion", "https://www.notion.com/pricing");
const CANVA_PRICING = P("Canva", "https://www.canva.com/pricing/");
const FRESHBOOKS_PRICING = P("FreshBooks", "https://www.freshbooks.com/pricing");

export const SOURCES = {
  "best-professional-email-domain-freelancers": [
    S("Zoho Mail", "https://www.zoho.com/mail/"),
    S("Google Workspace", "https://workspace.google.com"),
    S("Microsoft 365", "https://www.microsoft.com/microsoft-365"),
    S("Proton Mail", "https://proton.me/mail"),
  ],
  "best-business-insurance-freelancers": [
    S("NEXT Insurance", "https://www.nextinsurance.com"),
    S("Thimble", "https://www.thimble.com"),
    S("Hiscox", "https://www.hiscox.com"),
  ],
  "international-payment-platforms-freelancers": [
    S("Wise", "https://wise.com"),
    S("Payoneer", "https://www.payoneer.com"),
    S("PayPal", "https://www.paypal.com"),
    S("Stripe", "https://stripe.com"),
  ],
  "free-esignature-tools-freelance-contracts": [
    S("SignWell", "https://www.signwell.com"),
    S("Signaturely", "https://www.signaturely.com"),
    S("OpenSign", "https://www.opensignlabs.com"),
    S("DocuSign", "https://www.docusign.com"),
    S("Dropbox Sign", "https://sign.dropbox.com"),
  ],
  "best-cat-tools-freelance-translators": [
    S("Trados Studio", "https://www.trados.com"),
    S("memoQ", "https://www.memoq.com"),
    S("Smartcat", "https://www.smartcat.com"),
  ],
  "best-website-builders-freelancer-portfolio": [
    S("Carrd", "https://carrd.co"),
    S("Squarespace", "https://www.squarespace.com"),
    S("Webflow", "https://webflow.com"),
    S("Framer", "https://www.framer.com"),
  ],
  "best-proposal-software-freelancers": [
    S("Better Proposals", "https://betterproposals.io"),
    S("PandaDoc", "https://www.pandadoc.com"),
    S("Proposify", "https://www.proposify.com"),
    S("Bonsai", "https://www.hellobonsai.com"),
    S("HoneyBook", "https://www.honeybook.com"),
  ],
  "voices-com-vs-voice123-freelance-voice-actors": [
    S("Voices.com", "https://www.voices.com"),
    S("Voice123", "https://voice123.com"),
    S("Fiverr", "https://www.fiverr.com"),
    S("Upwork", "https://www.upwork.com"),
  ],
  "best-tax-software-freelancers": [
    S("FreeTaxUSA", "https://www.freetaxusa.com"),
    S("TurboTax", "https://turbotax.intuit.com"),
    S("FlyFin", "https://flyfin.tax"),
    S("Hurdlr", "https://www.hurdlr.com"),
    S("QuickBooks", "https://quickbooks.intuit.com"),
  ],
  "glossgenius-vs-vagaro-vs-styleseat-freelance-beauty-professionals": [
    S("GlossGenius", "https://glossgenius.com"),
    S("Vagaro", "https://www.vagaro.com"),
    S("StyleSeat", "https://www.styleseat.com"),
  ],
  "best-business-banking-apps-freelancers": [
    S("Found", "https://found.com"),
    S("Lili", "https://lili.co"),
    S("Novo", "https://www.novo.co"),
  ],
  "upwork-vs-fiverr-freelancers": [
    S("Upwork", "https://www.upwork.com"),
    S("Fiverr", "https://www.fiverr.com"),
  ],
  "xero-vs-quickbooks-freelancers": [
    S("Xero", "https://www.xero.com"),
    S("QuickBooks", "https://quickbooks.intuit.com"),
    FRESHBOOKS_PRICING,
    S("Wave", "https://www.waveapps.com"),
  ],
  "multi-currency-accounting-software-freelancers": [
    S("Xero", "https://www.xero.com"),
    S("Zoho Books", "https://www.zoho.com/books/"),
    S("Wave", "https://www.waveapps.com"),
    FRESHBOOKS_PRICING,
  ],
  "best-practice-management-software-freelance-bookkeepers": [
    S("Financial Cents", "https://financial-cents.com"),
    S("Jetpack Workflow", "https://www.jetpackworkflow.com"),
    S("Karbon", "https://karbonhq.com"),
  ],
  "best-crm-tools-freelancers": [
    S("HubSpot CRM", "https://www.hubspot.com/products/crm"),
    S("Zoho CRM", "https://www.zoho.com/crm/"),
    S("Streak", "https://www.streak.com"),
    NOTION_PRICING,
  ],
  "invoicing-software-international-freelancers": [
    S("Zoho Invoice", "https://www.zoho.com/invoice/"),
    S("Xero", "https://www.xero.com"),
    S("Wave", "https://www.waveapps.com"),
    FRESHBOOKS_PRICING,
  ],
  "best-ai-presentation-tools-freelance-consultants": [
    S("Gamma", "https://gamma.app"),
    CANVA_PRICING,
    S("Beautiful.ai", "https://www.beautiful.ai"),
    S("Plus AI", "https://www.plusdocs.com"),
  ],
  "free-project-management-tools-solo-freelancers": [
    S("Trello", "https://trello.com"),
    S("ClickUp", "https://clickup.com"),
    NOTION_PRICING,
    S("Asana", "https://asana.com"),
    S("Paymo", "https://www.paymoapp.com"),
    S("Teamwork", "https://www.teamwork.com"),
  ],
  "squarespace-vs-wix-freelancer-portfolio": [
    S("Squarespace", "https://www.squarespace.com"),
    S("Wix", "https://www.wix.com"),
  ],
};
