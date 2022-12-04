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
    urls: {
      api: "${process.env['API_URL']}",
      images: "${process.env['IMAGES_URL']}",
      app: "${process.env['APP_URL']}",
    },
    apis: {
      stadiaMaps: "${process.env['API_STADIAMAPS']}",
    },
    firebase: {
      projectId: "${process.env['FIREBASE_PROJECT_ID']}",
      appId: "${process.env['FIREBASE_APP_ID']}",
      storageBucket: "${process.env['FIREBASE_STORAGE_BUCKET']}",
      apiKey: "${process.env['FIREBASE_API_KEY']}",
      authDomain: "${process.env['FIREBASE_AUTH_DOMAIN']}",
      messagingSenderId: "${process.env['FIREBASE_MESSAGING_SENDER_ID']}",
      measurementId: "${process.env['FIREBASE_MEASUREMENT_ID']}",
    }
  };
`;
writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.error(err);
  }
  console.log(`✅ ${targetPath}`);
});
/*eslint-disable */
