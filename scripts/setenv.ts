/*eslint-disable */
const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;
const environmentFileContent = `
  export const environment = {
    production: ${isProduction},
    API_URL: "${process.env['API_URL']}",
    IMAGES_URL: "${process.env['IMAGES_URL']}",
    APP_URL: "${process.env['APP_URL']}",
    API_STADIAMAPS: "${process.env['API_STADIAMAPS']}",
  };
`;
writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.error(err);
  }
  console.log(`✅ ${targetPath}`);
});
/*eslint-disable */
