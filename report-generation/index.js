const fs = require('fs')
const path = require('path')
const generateHtml = require('./generate-html')
const generatePdf = require('./generate-pdf')
const config = require('./config')()


async function generate() {
  let dataJson = fs.readFileSync(config.combinedJsonFile);
  let rawData = JSON.parse(dataJson);

  for (let i = 0; i < rawData.length; i++) {
    const element = rawData[i];
    rawData[i].site = (new URL(element.requestedUrl)).host
  }

  let sites = groupBy(rawData, 'site')
  for (const site in sites) {
    if (sites.hasOwnProperty(site)) {
      const reports = sites[site];
      sites[site] = groupBy(reports, 'requestedUrl')
    }
  }
  
  let data = {
    sites: sites
  }
  // console.log(data);

  const htmlGenerator = new generateHtml(config.templateHtmlFile);

  htmlGenerator.render(data)
  htmlGenerator.saveResultToFile(config.resultHtmlFile)

  const pdfGenerator = await generatePdf();
  await pdfGenerator.generate(config.resultHtmlFile, config.resultPdfFile)
}

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

generate()