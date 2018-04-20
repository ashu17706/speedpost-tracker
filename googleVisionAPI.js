const vision = require("@google-cloud/vision");

class GoogleVisionAPI {
  constructor(imagePath) {
    this.imagePath = imagePath;
  }

  async getTextFromImage() {
    if(!this.imagePath) {
      throw Error('No image is specified for captch.');
    }
    try {
      const visionClient = new vision.ImageAnnotatorClient();
      const response = await visionClient.textDetection(this.imagePath);
      
      const { description } = response[0].textAnnotations[0];
      
      return description.replace(/\s/g, "");
    } catch(error) {
      console.error(error);
    }
  } 
}

module.exports = GoogleVisionAPI;