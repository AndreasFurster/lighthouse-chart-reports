'use strict';

const fs = require('fs');
var child_process = require('child_process');

child_process.exec('run.bat', function (error, stdout, stderr) {
  let files = fs.readdirSync('result');
  let result = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    if (!fileName.includes('.json')) continue;

    let reportJson = fs.readFileSync(`result/${fileName}`);
    let report = JSON.parse(reportJson);

    let data = {
      requestedUrl: report.requestedUrl,
      fetchTime: report.fetchTime,
      emulatedFormFactor: report.configSettings.emulatedFormFactor
    }

    for (const categoryKey in report.categories) {
      if (report.categories.hasOwnProperty(categoryKey)) {
        const category = report.categories[categoryKey];
        data[category.title] = category.score;
      }
    }

    result.push(data)
  }

  fs.writeFileSync('./combined.json', JSON.stringify(result))


});
