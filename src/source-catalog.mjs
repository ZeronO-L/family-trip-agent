const EUROPE_CODES = new Set([
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT",
  "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK"
]);

const APAC_CODES = new Set(["AU", "ID", "JP", "KR", "MY", "NZ", "PH", "SG", "TH", "VN"]);

export const sourceCatalog = {
  "google-maps": { name: "Google Maps", roles: ["maps", "reviews", "traffic"], global: true, access: "browser_dynamic", url: "https://www.google.com/maps" },
  "apple-maps": { name: "Apple Maps", roles: ["maps", "traffic"], global: true, access: "browser_dynamic", url: "https://maps.apple.com" },
  openstreetmap: { name: "OpenStreetMap", roles: ["maps"], global: true, access: "open_web", url: "https://www.openstreetmap.org" },
  tripadvisor: { name: "Tripadvisor", roles: ["reviews", "community", "attractions"], global: true, access: "browser_dynamic", url: "https://www.tripadvisor.com" },
  yelp: { name: "Yelp", roles: ["reviews"], markets: ["US", "CA"], access: "may_block_automation", url: "https://www.yelp.com" },
  opentable: { name: "OpenTable", roles: ["reviews", "restaurant_booking"], markets: ["US", "CA", "GB", "AU"], access: "browser_dynamic", url: "https://www.opentable.com" },
  thefork: { name: "TheFork", roles: ["reviews", "restaurant_booking"], region: "europe", access: "browser_dynamic", url: "https://www.thefork.com" },
  reddit: { name: "Reddit travel communities", roles: ["community"], global: true, access: "open_web", url: "https://www.reddit.com" },
  "official-tourism-board": { name: "Official destination tourism board", roles: ["community", "official"], global: true, access: "official_web", url: null },
  "booking-com": { name: "Booking.com", roles: ["hotels", "inventory"], global: true, access: "browser_dynamic", url: "https://www.booking.com" },
  expedia: { name: "Expedia", roles: ["hotels", "inventory"], global: true, access: "browser_dynamic", url: "https://www.expedia.com" },
  agoda: { name: "Agoda", roles: ["hotels", "inventory"], region: "apac", access: "browser_dynamic", url: "https://www.agoda.com" },
  "direct-hotel": { name: "Direct hotel site or property contact", roles: ["hotels", "official"], global: true, access: "manual_confirmation", url: null },
  "official-venue": { name: "Official venue or park site", roles: ["attractions", "tickets", "official"], global: true, access: "official_web", url: null },
  getyourguide: { name: "GetYourGuide", roles: ["tickets", "inventory"], global: true, access: "browser_dynamic", url: "https://www.getyourguide.com" },
  viator: { name: "Viator", roles: ["tickets", "inventory"], global: true, access: "browser_dynamic", url: "https://www.viator.com" },
  tiqets: { name: "Tiqets", roles: ["tickets", "inventory"], region: "europe", access: "browser_dynamic", url: "https://www.tiqets.com" },
  "official-meteorological-service": { name: "National meteorological authority", roles: ["weather", "official"], global: true, access: "official_web", url: null },
  nws: { name: "US National Weather Service", roles: ["weather", "official"], markets: ["US"], access: "official_web", url: "https://www.weather.gov" },
  "met-office": { name: "UK Met Office", roles: ["weather", "official"], markets: ["GB"], access: "official_web", url: "https://www.metoffice.gov.uk" },
  "environment-canada": { name: "Environment and Climate Change Canada", roles: ["weather", "official"], markets: ["CA"], access: "official_web", url: "https://weather.gc.ca" },
  bom: { name: "Australian Bureau of Meteorology", roles: ["weather", "official"], markets: ["AU"], access: "official_web", url: "https://www.bom.gov.au" },
  meteoalarm: { name: "Meteoalarm", roles: ["weather", "official"], region: "europe", access: "official_web", url: "https://www.meteoalarm.org" },
  "open-meteo": { name: "Open-Meteo", roles: ["weather"], global: true, access: "open_api", url: "https://open-meteo.com" },
  "official-road-authority": { name: "Official road authority", roles: ["roads", "official"], global: true, access: "official_web", url: null },
  "regional-511": { name: "Regional 511 road service", roles: ["roads", "official"], markets: ["US", "CA"], access: "official_web", url: null },
  nps: { name: "US National Park Service", roles: ["attractions", "roads", "official"], markets: ["US"], access: "official_web", url: "https://www.nps.gov" },
  "recreation-gov": { name: "Recreation.gov", roles: ["tickets", "inventory", "official"], markets: ["US"], access: "official_web", url: "https://www.recreation.gov" }
};

const defaultNeeds = ["maps", "reviews", "community", "hotels", "tickets", "weather", "roads"];

function unique(ids) {
  return [...new Set(ids)];
}

export function buildSourcePlan({ country_code, destination_types = [], needs = defaultNeeds }) {
  const country = String(country_code || "").toUpperCase();
  const europe = EUROPE_CODES.has(country);
  const apac = APAC_CODES.has(country);
  const nationalPark = destination_types.includes("national_park");
  const byNeed = {};

  for (const need of needs) {
    let ids = [];
    if (need === "maps") ids = ["google-maps", "openstreetmap", "apple-maps"];
    if (need === "reviews") {
      ids = ["google-maps", "tripadvisor"];
      if (["US", "CA"].includes(country)) ids.push("yelp");
      if (["US", "CA", "GB", "AU"].includes(country)) ids.push("opentable");
      if (europe) ids.push("thefork");
    }
    if (need === "community") ids = ["official-tourism-board", "tripadvisor", "reddit"];
    if (need === "hotels") {
      ids = ["booking-com", "expedia", "direct-hotel"];
      if (apac) ids.splice(2, 0, "agoda");
    }
    if (need === "tickets") {
      ids = ["official-venue", "getyourguide", "viator"];
      if (europe) ids.push("tiqets");
      if (country === "US" && nationalPark) ids.push("recreation-gov");
    }
    if (need === "weather") {
      const regional = country === "US" ? "nws"
        : country === "GB" ? "met-office"
          : country === "CA" ? "environment-canada"
            : country === "AU" ? "bom"
              : "official-meteorological-service";
      ids = [regional];
      if (europe && country !== "GB") ids.push("meteoalarm");
      ids.push("open-meteo");
    }
    if (need === "roads") {
      ids = ["official-road-authority", "google-maps"];
      if (["US", "CA"].includes(country)) ids.push("regional-511");
      if (country === "US" && nationalPark) ids.push("nps");
    }
    byNeed[need] = unique(ids).map((id) => ({ id, ...sourceCatalog[id] }));
  }

  return {
    country_code: country || null,
    destination_types,
    by_need: byNeed,
    warnings: [
      "Provider coverage and browser accessibility vary by market.",
      "Use official sources for safety, closures, legal rules, and reservation policy.",
      "Record partial or blocked access instead of inferring missing facts."
    ]
  };
}
