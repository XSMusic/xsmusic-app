/*eslint-disable */
const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_URL: "${process.env['API_URL']}",
   IMAGES_URL: "${process.env['IMAGES_URL']}",
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.error(err);
  }
  console.log(`✅ ${targetPath}`);
});
/*eslint-disable */
