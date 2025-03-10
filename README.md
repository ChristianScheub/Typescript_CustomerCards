# CardMaster
Last Edit: 03.2025 <br>
Language: Typescript React Capacitor with Vite<br>
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards) 
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards)
 [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards) 
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ChristianScheub_Typescript_CustomerCards&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ChristianScheub_Typescript_CustomerCards)

CardMaster is a simple app that allows you to store customer cards locally on your phone. It supports both QR codes and barcode customer cards.

| App Store Screen 1                                                      | App Store Screen 2                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="images/CardMasterIntro.png" alt="App Screen 1" height="300"> | <img src="images/CardMaster_4Screens.png" alt="App Screen2 " height="300"> |

| App Store Screen 3                                                      | App Store Screen 4                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="images/screen3.png" alt="App Screen 4" height="300"> | <img src="images/screen4.png" alt="App Screen4 " height="300"> |


## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npx cap sync `
Sync the build app to the android and ios folder. Run it after `npm run build`. 

### `npx license-checker --json --production --out licenses.json`
Generate the JSON with the licenses of the NPM packages used. This can then replace the existing license json under /legal/usedLibs.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Used NPM Modules
According to the command npm list You can see the deeper NPM modules used and which of these are used in the licenses.json.
<br />├── @capacitor-community/admob@7.0.1
<br />├── @capacitor-mlkit/barcode-scanning@7.0.0
<br />├── @capacitor/android@6.2.0
<br />├── @capacitor/barcode-scanner@2.0.1
<br />├── @capacitor/cli@6.2.0
<br />├── @capacitor/core@6.2.0
<br />├── @capacitor/filesystem@6.0.3
<br />├── @capacitor/ios@6.2.0
<br />├── @capacitor/share@6.0.3
<br />├── @capacitor/status-bar@6.0.2
<br />├── @emotion/react@11.14.0
<br />├── @emotion/styled@11.14.0
<br />├── @eslint/js@9.21.0
<br />├── @mui/icons-material@6.4.5
<br />├── @mui/material@6.4.5
<br />├── @testing-library/react@16.2.0
<br />├── @types/qrcode@1.5.5
<br />├── @types/react-dom@19.0.4
<br />├── @types/react@19.0.10
<br />├── @vitejs/plugin-react@4.3.4
<br />├── @zxing/library@0.21.3
<br />├── bootstrap@5.3.3
<br />├── canvas@3.1.0
<br />├── eslint-plugin-react-hooks@5.1.0
<br />├── eslint-plugin-react-refresh@0.4.19
<br />├── eslint@9.21.0
<br />├── globals@15.15.0
<br />├── i18next-browser-languagedetector@8.0.4
<br />├── i18next@24.2.2
<br />├── qr-scanner@1.4.2
<br />├── react-barcode@1.5.3
<br />├── react-bootstrap@2.10.9
<br />├── react-dom@18.2.0
<br />├── react-i18next@15.4.1
<br />├── react-icons@5.5.0
<br />├── react-qr-code@2.0.15
<br />├── react-router-dom@7.2.0
<br />├── react@18.2.0
<br />├── styled-components@6.1.15
<br />├── typescript-eslint@8.24.1
<br />├── typescript@5.7.3
<br />└── vite@6.1.1