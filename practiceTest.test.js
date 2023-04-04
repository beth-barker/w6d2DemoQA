const { By, Builder, Browser, until, Key} = require("selenium-webdriver");

let driver;

// Build a new driver for each test
beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

// Quit a driver after each test
afterEach(async () => {
  await driver.quit();
});

describe("Test the Google homepage", () => {
//   test("can search Google for 'Selenium'", async () => {
//     // Navigate to google.com
//     await driver.get("https://www.google.com/");

//     // Locate the search bar and send the search term to it
//     await driver.findElement(By.name("q")).sendKeys("selenium", Key.RETURN);
//     // Wait until the title of the page changes to include the search term
//     await driver.wait(until.titleIs("selenium - Google Search"), 1000);
//   });

  test("can search Google and go to images tab", async () => {
    //Navigate to google.com
    await driver.get("https://www.google.com/");

    //Locate the search bar and search for diamond beach in bali and hit return
    await driver.findElement(By.name("q")).sendKeys('diamond beach bali', Key.RETURN);

    // wait until the title of the page changes to the search term 
    await driver.wait(until.titleIs('diamond beach bali - Google Search'), 1000);

    // find the element where the text specifically says images and click on it
    await driver.findElement(By.linkText('Images')).click();

    // wait for 2 seconds
    await driver.sleep(2000);

    //variable that defines what we want to wait for and how long we want to wait 
    const currentPage = await driver.wait(until.elementLocated(By.css('span[aria-current="page"]')), 1000);

    // This test should get the text and it should be images
    expect(await currentPage.getText()).toBe("Images");
  })
});
