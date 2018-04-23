const pupeeteer = require("puppeteer");
let browser, page;
const couriers = require("../config/couriers");
const temp_path = require("../config/global_paths");
const GoogleVisionApi = require("../captacha_reader");

let india_post = couriers.INDIA_POST;

exports.fetchIndiaPost = async (consignmentNo) => {
    try {
        browser = await pupeeteer.launch({
            headless: false
        });

        page = await browser.newPage();
        page.setDefaultNavigationTimeout(300000);
        
        await page.goto(india_post.tracking_url);

        // got the image 
        console.log(temp_path);
        
        let res = await getCaptchaImage({
            selector: '.captchaimg > img',
            path: temp_path.captcha
        });

        let read_captcha = new GoogleVisionApi;
        let captchaText = await read_captcha.readCaptchaImage();

        
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
};

const getCaptchaImage = async (opts = {}) => {
    const padding = 'padding' in opts ? opts.padding : 0;
    const selector = opts.selector;
    const path = opts.path ? opts.path : null;

    if (!selector) {
        throw Error('Please specify the selector.');
    }

    const rect = await page.evaluate(selector => {
        const element = document.querySelector(selector);

        if (!element) {
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