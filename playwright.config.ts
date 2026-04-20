import { defineConfig, devices } from "@playwright/test";

process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";

export default defineConfig({
  testDir: "./apps/docs/tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    launchOptions: {
      executablePath: "C:/Users/lx8nb/.cache/ms-playwright/chrome-win/chrome.exe",
    },
  },
  webServer: {
    command:
      "npm run dev --workspace @statekit/docs -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
