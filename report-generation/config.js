const path = require("path")

module.exports = function() {
  global.log = console.log

  return {
    combinedJsonFile: path.join(process.cwd(), 'data-retrieval', 'combined.json'),
    templateHtmlFile: path.join(process.cwd(), 'report-generation', 'template.html'),
    resultHtmlFile: path.join(process.cwd(), 'report', 'result.html'),
    resultPdfFile: path.join(process.cwd(), 'report', 'result.pdf'),
  }
}