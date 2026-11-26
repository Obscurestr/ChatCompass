// App-level configuration. Values with NEXT_PUBLIC_ are safe to read in the browser.

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ChatCompass";

// Neutral site that QuickExit replaces the page with (FR-008).
export const EXIT_URL = process.env.NEXT_PUBLIC_EXIT_URL || "https://weather.com";

// Input limits (FR-001).
export const MIN_CHARS = 20;
export const MAX_CHARS = 6000;
// Show the live counter only past this length.
export const COUNTER_FROM = 5000;

// Screenshots read on the device per pick (FR-018).
export const MAX_SCREENSHOTS = 5;

// Response limits (FR-003).
export const MAX_SIGNS = 6;
export const MIN_NEXT_STEPS = 2;
export const MAX_NEXT_STEPS = 4;
