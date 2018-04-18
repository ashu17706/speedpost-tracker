const pupeeteer = require('puppeteer');
const vision = require('@google-cloud/vision');

const INDIA_POST_CONSIGNMENT_TRACKER_URL =
  "https://www.indiapost.gov.in/VAS/Pages/TrackConsignment.aspx";
const consignmentNo = "ED196345405IN";
let browser, page;

(async () => {
  try {
  browser = await pupeeteer.launch({
    headless: false
  });
  
  page = await browser.newPage();
  page.setDefaultNavigationTimeout(100000);

  await page.goto(INDIA_POST_CONSIGNMENT_TRACKER_URL);
  
  // got the image 
  await getCaptchaImage({
    selector: '.captchaimg > img',
    path: 'captcha.png'
  });

  // use the image with vision API
  const visionClient = new vision.ImageAnnotatorClient();

  const response = await visionClient.textDetection('captcha.png');
  const { description } = response[0].textAnnotations[0];
  const captchaText = description.replace(/\s/g, "");

  console.log(`Captcha Text is ${captchaText}`);

  // fill the value to the browser
  
  await page.evaluate((consignmentNo, captchaText) => {
          document.querySelector(".name_add_inp > input").value = consignmentNo;
          document.querySelector(".captchablk input").value = captchaText;
          document.querySelector(".button_block input[type='submit']").click();
  }, consignmentNo, captchaText);

  const status = await page.waitForSelector('.TrackConsignIntstatus');
  const statusText = await ((await status.getProperty('innerHTML')).jsonValue());
  console.log(statusText);
    
    // close the browser
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();

const getCaptchaImage = async (opts = {}) => {
  const padding = 'padding' in opts ? opts.padding : 0;
  const selector = opts.selector;
  const path = opts.path ? opts.path : null;

  if(!selector) {
    throw Error('Please specify the selector.');
  }

  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector);

    if(!element) {
      return null;
    }

    const { x, y, height, width } = element.getBoundingClientRect();

    return {
      left: x,
      top: y,
      height,
      width
    }
  }, selector)

  // return promise
  return await page.screenshot({
    path,
    clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2
    }
  });
}