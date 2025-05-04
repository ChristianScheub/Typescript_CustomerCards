# CardMaster
Last Edit: 05.2025 <br>
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

Apple App Store: https://apps.apple.com/de/app/card-master-loyalty-cards/id6743057728

| App Store Screen 1                                                      | App Store Screen 2                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="images/CardMasterIntro.png" alt="App Screen 1" height="300"> | <img src="images/CardMaster_4Screens.png" alt="App Screen2 " height="300"> |

| App Store Screen 3                                                      | App Store Screen 4                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="images/screen3.png" alt="App Screen 4" height="300"> | <img src="images/screen4.png" alt="App Screen4 " height="300"> |


## Architecture 
![Card Master Architecture](images/CardMaster__Architecture.png)

This layered architecture diagram of the Card Master app illustrates a clean separation of concerns across four tiers: Service Layer, Container Components, View Components, and UI Elements. Key development utilities like the Logger, the main App.tsx entry point, feature flags, and the core CustomerCard data model are intentionally omitted for clarity, as they are deeply nested or widely referenced throughout the codebase. 


The architecture of the Customer Cards App is designed to ensure modularity, maintainability, and scalability. It is divided into four main layers: **UI-Elements**, **View-Components**, **Container-Components**, and the **Service Layer**. Each layer has a specific role in the application, and the implementation reflects the actual codebase.


## **UI-Elements**
**UI-Elements** are the smallest building blocks of the user interface. These components are atomic, reusable, and styled to maintain consistency across the app. Examples include:

- **Buttons**: For actions like saving or deleting a card.
- **Input Fields**: For entering customer card details.
- **Card Display**: A visual representation of customer cards.
- **QR Code Scanner**: A UI component for scanning QR codes.

These elements are designed to be generic and reusable, ensuring that they can be used across multiple screens and features.

### **Barcode Scanning with `@capacitor-mlkit/barcode-scanning`**
The `@capacitor-mlkit/barcode-scanning` plugin is used within the **UI-Elements** layer to provide barcode and QR code scanning functionality. It is integrated into components like the **ScannerComponent** and **FileUploadScanner**. These components handle user interactions for scanning barcodes either directly from the camera or from uploaded images.

#### Usage in UI Components:
1. **Camera-Based Scanning**:
   - The `ScannerComponent` uses the `BarcodeScanner.scan()` method to initiate a live scan session.
   - Permissions for camera access are requested using `BarcodeScanner.requestPermissions()`.
   - The scanned barcode data is processed and passed to higher layers for further handling.

2. **Image-Based Scanning**:
   - The `FileUploadScanner` component allows users to upload an image file.
   - The image is processed using the `BarcodeScanner.readBarcodesFromImage()` method to extract barcode data.

These functionalities ensure that the app can handle both live scanning and static image processing, providing flexibility for users.


## **View-Components**
**View-Components** are composed of multiple UI-Elements and represent specific parts of the application's screens. They are responsible for rendering data and handling user interactions. Examples include:

- **Home Screen**: Displays a list of saved customer cards.
- **Card Details Screen**: Shows detailed information about a selected card.
- **QR Scanner Screen**: Allows users to scan and add new cards.

These components interact with Container-Components to fetch or update data dynamically.


## **Container-Components**
**Container-Components** act as the intermediary between the View-Components and the Service Layer. They handle state management, data fetching, and complex user interactions. Examples include:

- **Card Manager**: Manages the state of customer cards, including fetching, saving, and deleting cards.
- **QR Scanner Controller**: Handles the logic for scanning QR codes and validating the data.

These components ensure that the application logic is separated from the UI, making the app easier to maintain and test.



## **Service Layer**
The **Service Layer** is the backbone of the application, responsible for handling business logic, data storage, and external integrations. Below are the key services used in the app:

### **SQLite Service**
The SQLite Service is responsible for managing the local IndexedDB database. It provides methods for saving, retrieving, and deleting customer cards. For example, the `saveCard` method generates a unique ID for each card using `crypto.randomUUID()`, adds timestamps (`createdAt` and `updatedAt`), and saves the card to the `customer_cards` object store in IndexedDB. Errors are handled gracefully using the `handleIndexedDBError` function.

### **Logger Service**
The Logger Service provides a centralized way to log application events. It is used extensively throughout the app to track actions, such as saving a card or handling errors. This ensures better debugging and monitoring during development.
This service also makes it possible to export logs locally, among other things, as they are saved locally depending on the feature flags. (The option is only visible in the settings screen with the appropriate feature flag)
The entire service is controlled by feature flags from the config file and in the release candidates the logging is always completely off as there is no transfer of the user's data. (Except what Google AdMob is doing)

### **Ads Service**
The Ads Service manages the integration of advertisements in the app. It uses the `@capacitor-community/admob` plugin to display ads, ensuring compliance with platform guidelines. This service is responsible for loading, displaying, and tracking ads and the ad dialog.


## **Configuration Files**
The app uses configuration files to manage static content and settings. For example:
- **`app_texts`**: Contains the app imprint
- **`featureFlags`**: Contains FeatureFlags which control the logger or which setting options are visible. (i.e. classic developer options which make it easier to further develop the app)
And for the localized texts we use i18next.



## **Key Architectural Features**
- **Modular Design**: Each layer is designed to be independent, making it easier to update or replace components.
- **Scalability**: The architecture supports the addition of new features, such as integrating new ad providers or expanding the database schema.
- **Separation of Concerns**: By dividing the app into distinct layers, the architecture ensures that UI, logic, and data management are handled separately.

## **Summary of the Four Categories**
1. **UI-Elements**: Atomic, reusable components like buttons, input fields, and QR scanners.
2. **View-Components**: Screens composed of UI-Elements, such as the Home Screen or QR Scanner Screen.
3. **Container-Components**: Manage state and data flow between the UI and the Service Layer.
4. **Service Layer**: Handles business logic, database operations, logging, and external integrations like ads.


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


# Used NPM Modules
According to the command npm list You can see the deeper NPM modules used and which of these are used in the licenses.json.
<br />├── @capacitor-community/admob@7.0.1
<br />├── @capacitor-mlkit/barcode-scanning@7.0.0
<br />├── @capacitor/android@6.2.0
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