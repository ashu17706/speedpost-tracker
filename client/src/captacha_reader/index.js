const vision = require('@google-cloud/vision');
const temp_path =  require("../config/global_paths");
const fs = require('fs');

class GoogleVisionApi {;
    
    async readCaptchaImage(){
        let captcha = temp_path.captcha
        if (!fs.existsSync(captcha)) {
            throw Error('No captcha file exist');
        }

        try {
            // use the image with vision API
            const visionClient = new vision.ImageAnnotatorClient();

            const response = await visionClient.textDetection(captcha);
            const { description } = response[0].textAnnotations[0];
            const captchaText = description.replace(/\s/g, "");
            console.log(`Captcha Text is ${captchaText}`);
            return captchaText;
        }catch(e){
            console.error(e);            
        }
        
    }
}

module.exports = GoogleVisionApi;