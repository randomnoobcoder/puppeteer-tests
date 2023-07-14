"use strict";
const puppeteer = require("puppeteer");
const jestConfig = require("../jest.config");
const screenshot = "play_video.png";
// const timeout = process.env.slowMo ? 30000 : 10000;
beforeAll(async () => {
  jest.setTimeout(30000);
  await page.goto("https://www.youtube.com/", {
    waitUntil: "domcontentloaded",
    timeout: 20000,
  });
  //   await page.waitForSelector(".VfPpkd-RLmnJb");
  //   await page.click("button.VfPpkd-LgbsSe > div:nth-child(1)");
  //   await page.waitForSelector(
  //     "yt-formatted-string.yt-button-renderer:nth-child(1)"
  //   );
  //   await page.click("yt-formatted-string.yt-button-renderer:nth-child(1)");
});

// afterAll(async () => await browser.close());

describe("Youtube Tests", () => {
  test("Test Header", async (done) => {
    try {
      const title_home = await page.title();
      expect(title_home).toBe("YouTube");
      done();
    } catch (err) {
      console.error(err);
    }
  });

  test("Test search", async (done) => {
    try {
      const search_text = "4k Videos of London";
      let search_list = [];
      await page.waitForSelector("#search-input");
      await page.click("#search-input");
      await page.type("#search-input", search_text);
      await page.keyboard.press("Enter");
      // await page.click("button#search-icon-legacy");
      // await page.waitForNavigation({
      //   waitUntil: "domcontentloaded",
      //   timeout: 20000,
      // });
      await page.waitForSelector("ytd-search[role='main']");

      const url = await page.url();
      console.log(`Search result url : ${url}`);
      const match_text = (str) => {
        return str.split(" ").join("+");
      };
      expect(url).toMatch(match_text(search_text));
      // const title_search = await page.title()
      // console.log(`title_search : ${title_search}`)
      // expect(title_search).toBe("4k videos of london - YouTube")
      // done()
      console.log("----------Taking screenshot---------------");
      await page.screenshot({
        path: "3.png",
      });
      const videos = await page.$$("ytd-video-renderer");
      const video_title = await page.$$("#video-title");
      for (var key in video_title) {
        var textContent = await video_title[key].getProperty("textContent");
        var text = textContent._remoteObject.value;
        search_list.push(text);
      }
      for (let i = 0; i < search_list.length; i++) {
        let a = search_list[i].trim().toLowerCase();
        () => {
          expect(a).toMatch("4k") || expect(a).toMatch("london");
        };
      }
      console.log("-------------Playing video-----------------------");
      await videos[2].click();
      await page.waitForSelector(".video-viewer--container--23VX7");
      //await page.waitForTimeout(5000)
      await page.screenshot({
        path: screenshot,
      });
      console.log("See screenshot: " + screenshot);
      done();
    } catch (err) {
      console.error(err);
    }
  });

  // test("Test Sign In", async () => {
  //   await page.waitForSelector("#guide-icon",{visible: true})
  //   await page.click("#guide-icon",{clickCount:2});
  //   await page.click("#guide-icon",{clickCount:2});
  //   await page.waitForSelector("#sign-in-button");
  //   await page.click("#sign-in-button");
  //   await page.waitForSelector("#logo");
  //   await page.type("#identifierId", "gauti.700@gmail.com");
  //   await page.keyboard.press('Enter')
  //   await page.waitForSelector(".whsOnd zHQkBf");
  //   await page.type(".whsOnd zHQkBf", "8618962654@Hm");
  //   await page.keyboard.press('Enter')
  //   await page.waitForSelector("#logo-icon");
  // });

  // test.skip("Test Music Page Load", async (done) => {
  //   try {
  //     // await page.click("#guide-icon") //click menu
  //     await page.waitForSelector(".ytd-guide-entry-renderer"); //wait for Explore
  //     const items = await page.$$(
  //       "ytd-guide-entry-renderer.ytd-guide-section-renderer"
  //     );
  //     await items[1].click(); // click on Explore
  //     await page.waitForSelector("#root"); // wait for Explore page to appear
  //     const content = await page.$$(
  //       "ytd-destination-button-renderer.ytd-destination-shelf-renderer"
  //     );
  //     await content[1].click(); //click Music section
  //     await page.waitForSelector(
  //       "yt-formatted-string.ytd-topic-channel-details-renderer"
  //     );
  //     const element_music = await page.$(
  //       "yt-formatted-string.ytd-topic-channel-details-renderer"
  //     );
  //     const text_music = await page.evaluate(
  //       (element) => element.textContent,
  //       element_music
  //     ); // fetch text
  //     console.log(text_music);
  //     expect(text_music).toBe("Music");
  //     done();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  // tests.skip("Test News Page Load", async (done) => {
  //   try {
  //     // await page.click("#guide-icon") //click menu
  //     await page.waitForSelector(".ytd-guide-entry-renderer"); //wait for Explore
  //     const items = await page.$$(
  //       "ytd-guide-entry-renderer.ytd-guide-section-renderer"
  //     );
  //     await items[1].click(); // click on Explore
  //     await page.waitForSelector("#root"); // wait for Explore page to appear
  //     const content = await page.$$(
  //       "ytd-destination-button-renderer.ytd-destination-shelf-renderer"
  //     );
  //     await content[3].click(); //click News section
  //     await page.waitForSelector(
  //       "ytd-channel-name.ytd-c4-tabbed-header-renderer > div:nth-child(1) > div:nth-child(1) > yt-formatted-string:nth-child(1)"
  //     );
  //     const element_news = await page.$(
  //       "ytd-channel-name.ytd-c4-tabbed-header-renderer > div:nth-child(1) > div:nth-child(1) > yt-formatted-string:nth-child(1)"
  //     );
  //     const text_news = await page.evaluate(
  //       (element) => element.textContent,
  //       element_news
  //     );
  //     console.log(text_news);
  //     expect(text_news).toBe("News");
  //     done();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
});

//------------------------------------------- junk-------------------------------------------------
// describe("Search Youtube", ()=>{
//     // beforeAll(async () =>{
//     //     jest.setTimeout(20000)
//     // })
//     // afterAll(async () =>{
//     //     await browser.close()
//     // })
//     test("test search",async ()=>{
//         try {
//             await page.goto("https://youtube.com")
//             await page.waitForSelector('.VfPpkd-RLmnJb')
//             await page.click('button.VfPpkd-LgbsSe > div:nth-child(1)')
//             await page.waitForSelector("yt-formatted-string.yt-button-renderer:nth-child(1)")
//             await page.click("yt-formatted-string.yt-button-renderer:nth-child(1)")
//             await page.waitForSelector("#search")
//             await page.type('#search', '4k videos')
//             await page.click('button#search-icon-legacy')
//             await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
//             await page.screenshot({
//                 path: 'youtube_fm_dreams_list.png'
//             })
//             const videos = await page.$$('ytd-thumbnail.ytd-video-renderer')
//             const video_title = await page.$$("#video-title")
//             const textContent = await video_title[2].getProperty('textContent')
//             const text = textContent._remoteObject.value;
//             console.log(text)
//             await videos[2].click()
//             await page.waitForSelector('.video-viewer--container--23VX7')
//             //await page.waitForTimeout(5000)
//             await page.screenshot({
//                 path: screenshot
//             })
//             console.log('See screenshot: ' + screenshot)

//         } catch (err) {
//             console.error(err)
//         }
//     })
// })
