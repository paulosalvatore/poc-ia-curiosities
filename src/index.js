const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const font2base64 = require("node-font2base64");

function generateImage(inputPath, outputPath, title) {
  console.info("Generating image...");

  // Image
  const image = fs.readFileSync(inputPath);
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;

  // Font
  const font = font2base64.encodeToDataUrlSync("./src/fonts/Pacifico.woff2");

  const fontFace = `
<style>
  @font-face {
    font-family: 'Pacifico';
    src: url(${font}) format('woff2');
  }
</style>`;

  const html = fs.readFileSync("./src/image-template.html", "utf8");

  // Delete the output file if it exists
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  nodeHtmlToImage({
    output: outputPath,
    html: fontFace + html,
    content: { imageSource: dataURI, title },
  })
    .then(() => console.info("Image generated!"))
    .catch((error) => console.error("Error generating image:", error));
}

const inputPath = "./images/input.png";
const outputPath = "./images/output.png";
const title = "Sagu-Sss!";

generateImage(inputPath, outputPath, title);
