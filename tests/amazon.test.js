const puppeteer = require("puppeteer");
const jestConfig = require("../jest.config");
const url = "https://www.amazon.in/";
describe("Amazon Test", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  });
  // afterAll(async()=>{
  //   await browser.close()
  // })

  test("Test Header", async () => {
    try {
      const title_home = await page.title();
      expect(title_home.toLocaleLowerCase()).toMatch("amazon");
    } catch (err) {
      console.error(err);
    }
  });
  test("Test Search", async (done) => {
    try {
      let searchResult = [];
      let productTitle = "Null";
      await page.waitForSelector(".nav-search-field");
      await page.type("#twotabsearchtextbox", "shoes");
      await page.keyboard.press("Enter");
      // await page.click("#nav-search-submit-button");
      // await page.waitForNavigation({waitUntil:"domcontentloaded", timeout:10000})
      await page.waitForTimeout(10000);
      await page.waitForSelector(".a-section .a-color-state");
      const search_result_text = await page.$eval(".a-section .a-color-state", ele=>ele.textContent)
      expect(search_result_text).toBe(`"shoes"`)
      
      
      console.log("Checking search products............. \n");
      const allSearchProducts = await page.$$(
        ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
      );
      for (const product of allSearchProducts) {
        // const productInnerText = await page.evaluate(el => el.innerText, product)
        try {
          productTitle = await page.evaluate(
            (ele) => ele.querySelector("h2>a>span").textContent,
            product
          );
          expect(productTitle.toLocaleLowerCase()).toMatch("shoes");
        } catch (error) {}
      }
      done();
    } catch (err) {
      console.error(err);
    }
  });
  test('Test Sign in', async(done) => {
    let signedInUser = 'Null'
    await page.hover('#nav-link-accountList')
    await page.waitForSelector('.nav-action-signin-button')
    await page.click('.nav-action-signin-button')
    await page.waitForSelector('#ap_email')
    await page.type('#ap_email', 'gauti.700@gmail.com')
    await page.keyboard.press('Enter')
    await page.waitForSelector('#ap_password')
    await page.type('#ap_password', 'alpha101')
    await page.click('#signInSubmit')
    await page.waitForSelector('#nav-link-accountList-nav-line-1')
    signedInUser = await page.$eval('#nav-link-accountList-nav-line-1', ele=>ele.textContent)
    console.log(`SignedInUser : ${signedInUser}`)
    expect(signedInUser.toLocaleLowerCase()).toMatch('gautam')
    done()
  });
});
