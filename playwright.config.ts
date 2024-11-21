import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./__tests__/e2e",
  timeout: 60000,
  reporter: [
    ["html", { outputFolder: "test-report/html-report", open: "never" }],
    ["json", { outputFile: "test-report/json-report" }],
  ],

  use: {
    baseURL: "http://localhost:3000",
    storageState: "./playwright/.auth/user.json",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: "setup",
      testMatch: /__tests__\/e2e\/.*\.setup\.ts/,
    },
    {
      name: "iPhone 12",
      use: { ...devices["iPhone 12"] },
    },
    // {
    //   name: "iPhone 12 Pro",
    //   use: { ...devices["iPhone 12 Pro"] },
    // },
    // {
    //   name: "iPhone SE (2nd generation)",
    //   use: { ...devices["iPhone SE (2nd generation)"] },
    // },
    // {
    //   name: "Pixel 5",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Pixel 4",
    //   use: { ...devices["Pixel 4"] },
    // },
    // {
    //   name: "Samsung Galaxy S20",
    //   use: { ...devices["Galaxy S20"] },
    // },
    // {
    //   name: "Samsung Galaxy S21",
    //   use: { ...devices["Galaxy S21"] },
    // },
    // {
    //   name: "iPhone 6/7/8",
    //   use: { ...devices["iPhone 6/7/8"] },
    // },
    // {
    //   name: "Galaxy S5",
    //   use: { ...devices["Galaxy S5"] },
    // },
    // {
    //   name: "Nexus 5X",
    //   use: { ...devices["Nexus 5X"] },
    // },
    // {
    //   name: "iPad",
    //   use: { ...devices["iPad"] },
    // },
    // {
    //   name: "iPad Pro 11",
    //   use: { ...devices["iPad Pro 11"] },
    // },
    // {
    //   name: "iPad Mini",
    //   use: { ...devices["iPad Mini"] },
    // },
    // {
    //   name: "Desktop Chrome",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    // {
    //   name: "Desktop Firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "Desktop WebKit",
    //   use: { ...devices["Desktop WebKit"] },
    // },
    // {
    //   name: "MacBook Pro 15",
    //   use: { ...devices["MacBook Pro 15"] },
    // },
    // {
    //   name: "MacBook Air",
    //   use: { ...devices["MacBook Air"] },
    // },
    // {
    //   name: "iMac",
    //   use: { ...devices["iMac"] },
    // },
  ],
});
