const { trackingUrl, captchaName } = require('./config.json');
const googleVisionAPI = new GoogleVisionAPI(captchaName);


(async () => {
  const response = await googleVisionAPI.getTextFromImage();
  console.log(response);
})();

// const consignmentNo = "ED196345405IN";
// let browser, page;

// (async () => {
//   try {
//   browser = await pupeeteer.launch({
//     headless: false
//   });
  
//   page = await browser.newPage();
//   page.setDefaultNavigationTimeout(100000);

//   await page.goto(INDIA_POST_CONSIGNMENT_TRACKER_URL);
  
//   // got the image 
//   await getCaptchaImage({
//     selector: '.captchaimg > img',
//     path: 'captcha.png'
//   });

//   // use the image with vision API
//   const captchaText = await getTextFromVisionAPI('captcha.png');
  
//   console.log(`Captcha Text is ${captchaText}`);

//   await inputValuesAndSubmitForm(consignmentNo, captchaText);

//   const status = await page.waitForSelector('.TrackConsignIntstatus');
  
//   const statusText = await ((await status.getProperty('innerHTML')).jsonValue());
  
//   console.log(statusText);
    
//     // close the browser
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await browser.close();
//   }
// })();

// const getCaptchaImage = async (opts = {}) => {
//   const padding = 'padding' in opts ? opts.padding : 0;
//   const selector = opts.selector;
//   const path = opts.path ? opts.path : null;

//   if(!selector) {
//     throw Error('Please specify the selector.');
//   }

//   const rect = await page.evaluate(selector => {
//     const element = document.querySelector(selector);

//     if(!element) {
//       return null;
//     }

//     const { x, y, height, width } = element.getBoundingClientRect();

//     return {
//       left: x,
//       top: y,
//       height,
//       width
//     }
//   }, selector)

//   // return promise
//   return await page.screenshot({
//     path,
//     clip: {
//       x: rect.left - padding,
//       y: rect.top - padding,
//       width: rect.width + padding * 2,
//       height: rect.height + padding * 2
//     }
//   });
// }

// const inputValuesAndSubmitForm = async (consignmentNo, captchaText) => {
//   return page.
//           evaluate((consignmentNo, captchaText) => {
//             document.querySelector(".name_add_inp > input").value = consignmentNo;
//             document.querySelector(".captchablk input").value = captchaText;
//             document.querySelector(".button_block input[type='submit']").click();
//           }, consignmentNo, captchaText);
// }

// const getTextFromVisionAPI = async (imagePath) => {

//   if(!imagePath) {
//     throw Error('No image is specified for API');
//   }

//   try {
//     const visionClient = new vision.ImageAnnotatorClient();

//     const response = visionClient.textDetection(imagePath);
//     const { description } = response[0].textAnnotations[0];
//     return description.replace(/\s/g, "");
//   } catch(error) {
//     console.error(error);
//   }
// }