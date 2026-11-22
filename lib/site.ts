// Single source of truth for the site's canonical URL.
// Update this if the club gets a custom domain (see README.md "Adding a custom domain").
export const SITE_URL = "https://westwoodai-website2.vercel.app";

// Every outside link the club uses, in one place, so a changed invite link
// or form only has to be updated here.
export const LINKS = {
  interestForm: "https://forms.gle/m1a5LrzEBHhacpbg6",
  discord: "https://tinyurl.com/aicord",
  instagram: "https://www.instagram.com/warriorai/",
  github: "https://github.com/westwoodai",
  email: "wwhs.aiexploration@gmail.com",
  linktree: "https://linktr.ee/westwoodhsaiclub",
  attendanceSheet:
    "https://docs.google.com/spreadsheets/d/1RXVatoIl_CxBa6WjB1pvbwS2YwPybACpOEDyROLSlUw",
  resourcesDoc:
    "https://docs.google.com/document/d/13KknH1p1VRqNiPmmYCN5eicoBd6kMWRiIr5DwW9wS-k",
  codecademyPython: "https://www.codecademy.com/learn/learn-python-3",
} as const;
