
# Angular Pokedex 

Welcome to **Pokédex** — your sleek, modern Pokédex built with Angular!

> “Catch ’em all, one component at a time.”  

![App Screenshot](/public/pokedex-ui.png)
<!--- [![Build Status](https://img.shields.io/github/actions/workflow/status/Talha-Tahir2001/Pokedex/ci.yml)](https://github.com/your-username/angular-pokedex/actions) --->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)]([Pokedex](https://pokedex-six-steel.vercel.app/))

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Deployment](#deployment)
- [Directory Structure](#directory-structure)
- [Key Components and Services](#key-components-and-services)
- [Auth0 Integration Details](#auth0-integration-details)
- [PokeAPI Usage](#pokeapi-usage)
- [Tailwind CSS](#tailwind-css)
- [Additional Considerations](#additional-considerations)
- [Troubleshooting ](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Overview

This project is a web application built with Angular 19, utilizing standalone components, to display a Pokedex, fetching data from the PokeAPI. It integrates Auth0 for user authentication and uses Tailwind CSS for styling.

## Features
Pokedex Display: Browse through a list of Pokemon fetched from the PokeAPI.
* **Pokemon Details:** View detailed information about each Pokemon, such as their abilities, stats, and types.
* **Search Pokémon by name:** TO BE IMPLEMENTED  
* **Auth0 Authentication:** Secure user authentication with Auth0.
    * Login and logout functionality.
    * User profiles.
* **Responsive Design:** The application is styled with Tailwind CSS, providing a responsive and modern user interface.
* **Standalone Components:** The application is built using Angular's standalone components feature.

## Technologies Used

 * **[Angular](https://angular.dev/) :** A platform for building web applications.
 * **[PokeAPI](https://pokeapi.co/) :** A RESTful API that provides Pokemon data.
 * **[Auth0](https://auth0.com/) :** A platform for authentication and authorization.
 * **[Tailwind CSS](https://tailwindcss.com/) :** A utility-first CSS framework.
 * **[Angular CLI](https://angular.dev/tools/cli) :** A command-line interface tool for Angular.
 *  **[RxJS](https://rxjs.dev/) :** A reactive programming library for JavaScript/TypeScript 
 * **[Spartan-ng](https://material.angular.io/) :** A component library for angular based on shadcn-ui
 * **[Lucide-Icons](https://lucide.dev/) :** A collection of 1548 icons made by the community
 * **[TypeScript](https://www.typescriptlang.org/) :** A strongly typed programming language that builds on JavaScript
 * **[Vercel](https://vercel.com/) :** Developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web
## Prerequisites

* **Node.js:** Ensure Node.js is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
* **npm (Node Package Manager):** npm comes with Node.js, so it should be installed automatically.
* **Angular CLI:** Install the Angular CLI globally:

    ```bash
    npm install -g @angular/cli
    ```
* **Auth0 Account:** You'll need an Auth0 account to configure authentication. If you don't have one, sign up at [auth0.com](https://auth0.com/).

## Setup

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/Talha-Tahir2001/Pokedex
cd Pokedex

```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install

```

### 3. Configure Auth0

-   **Create an Auth0 Application:**
    
    -   Go to the Auth0 Dashboard and create a new application.
        
    -   Select "Single Page Application" as the application type.
        
-   **Configure Auth0 Settings:**
    
    -   In your Auth0 application settings, note the following:
        
        -   Domain
            
        -   Client ID
            
    -   Add `http://localhost:4200` to the "Allowed Callback URLs," "Allowed Web Origins," and "Allowed Logout URLs." If you plan to deploy to a different URL, add that URL as well.
        
-   **Create `auth_config.json`:** (Optional and not recommended for prod)
    
    -   In the `src/assets` directory of your Angular project, create a file named `auth_config.json`.
        
    -   Add the following configuration, replacing the placeholders with your Auth0 credentials:
        
    ```
    {
        "domain": "<YOUR_AUTH0_DOMAIN>",
        "clientId": "<YOUR_AUTH0_CLIENT_ID>",
        "audience": "<YOUR_AUTH0_API_IDENTIFIER>" // Optional, if you have an API
    }
    
    ```
    
    -   **Important:** If you don't have an API, you might not need the audience. If you do, make sure to configure the API in your Auth0 dashboard and include the identifier here.
        

### 4. Environment Configuration (The approach I went with)

-   For more robust configuration, you can set Auth0 information in your Angular environment files (`environment.ts` and `environment.prod.ts`). This is generally better than including it in `auth_config.json`, but the file works for simpler setups.
    
-   If you choose to use environment files, add the following to both `environment.ts` and `environment.prod.ts`:
    
    ```
    export const environment = {
        production: false,
        auth: {
            domain: '<YOUR_AUTH0_DOMAIN>',
            clientId: '<YOUR_AUTH0_CLIENT_ID>',
            audience: '<YOUR_AUTH0_API_IDENTIFIER>', // Optional
            redirectUri: 'http://localhost:4200', // Or your actual redirect URI
        },
    };
    
    ```
    
-   And remove the `auth_config.json` file.
    

### 5. Start the Application

Start the Angular development server:

```bash
npm start

```

This will run the application at `http://localhost:4200/`.

## Build for Production

To build the application for production:

```bash
npm run build

```

This will create an optimized build in the `dist/` directory. You can then deploy the contents of this directory to a web server.

## Deployment 
### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
ng build --configuration production
firebase deploy
```
### Github Pages
```bash
ng add angular-cli-ghpages
ng build --configuration production --base-href "/pokedex/"
npx angular-cli-ghpages --dir=dist/pokedex
```
### Netlify
```bash
Push your code to GitHub
Go to [Netlify](https://netlify.com) and import your repository
Set the build command: `ng build --configuration production`
Set the publish directory: `dist/angular-pokedex`
Click **Deploy**
```
## Directory Structure

```
├── src/
│   ├── app/
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── ... (other standalone components)
│   ├── assets/
│   │   ├── auth_config.json (Optional, for simpler setups)
│   ├── environments/ (the approach I went with)
│   │   ├── environment.prod.ts
│   │   ├── environment.ts
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── ...

```

## Key Components and Services

-   `main.ts`: The entry point of the application, which uses `bootstrapApplication` to bootstrap the root standalone component.
    
-   `app.component.ts`: The root standalone component of the application.
    
-   `AuthService`: (Often created) A service to handle authentication logic using the Auth0 SDK. This might include methods for login, logout, getting the user profile, and handling authentication state.
    
-   `Pokedex Components`: Standalone components to display lists of Pokémon and individual Pokémon details.
    

## Auth0 Integration Details

-   **Auth0 SDK:** The `@auth0/auth0-angular` package is used to integrate Auth0 into the Angular application.
    
-   **Authentication Flow:**
    
    -   The user clicks the login button.
        
    -   The application redirects the user to the Auth0 login page.
        
    -   The user authenticates with Auth0.
        
    -   Auth0 redirects the user back to the application with an authorization code.
        
    -   The application exchanges the code for an access token and ID token.
        
    -   The user is now authenticated.
        
-   **Route Guards:** You can use Angular route guards to protect certain routes and ensure that only authenticated users can access them.
    
-   **Token Handling:** The Auth0 SDK handles token storage and management. You typically don't need to manually deal with tokens.
    
-   **Important:** In a production application, ensure that you handle errors properly, such as login failures or network issues. The `@auth0/auth0-angular` library provides mechanisms for error handling.
    

## PokeAPI Usage

-   **HTTP Requests:** The application uses Angular's `HttpClient` to make requests to the PokeAPI.
    
-   **Data Models:** You'll likely have TypeScript interfaces to represent the data structures returned by the PokeAPI (e.g., Pokemon, Ability, etc.).
    
-   **Error Handling:** Implement error handling to gracefully handle cases where the PokeAPI is unavailable or returns an error.
    

## Tailwind CSS

-   **Styling:** Tailwind CSS is used to style the application. You can customize the appearance by modifying the `styles.css` file.
    
-   **Responsive Design:** Tailwind CSS makes it easy to create a responsive layout that works well on different screen sizes.
    
-   **Customization:** You can customize Tailwind's colors, fonts, and other settings to match your application's design.
    

## Additional Considerations

-   **State Management:** For more complex applications, consider using a state management library like NgRx or Ngxs. For this simple application, a service is sufficient.
    
-   **Testing:** Write unit tests and end-to-end tests to ensure the application's quality. Angular provides tools like Karma and Protractor for testing. Cypress is also a good choice for end-to-end testing.
    
-   **Deployment:** Consider how you will deploy the application. Options include Netlify, Vercel, AWS, and more. Each has its own setup process (mentioned above).
    
-   **Security:**
    
    -   **Protect your Auth0 credentials:** Do not expose your Auth0 client secret in your Angular code. It is generally safe to expose the client ID.
        
    -   **CORS:** Ensure that your backend API (if you have one) is configured to allow requests from your Angular application's origin. Auth0 generally handles this for you.
        
-   **Accessibility:** Make sure your application is accessible to users with disabilities by following accessibility best practices. Tailwind CSS provides some accessibility utilities.
    
-   **Performance:** Optimize your application's performance by using techniques like lazy loading, code splitting, and caching.
    

## Troubleshooting

-   **Auth0 Errors:** If you encounter errors during the authentication process, check your Auth0 configuration in the Auth0 Dashboard and ensure that your Angular application's settings are correct. Pay close attention to the callback URLs.
    
-   **PokeAPI Errors:** If you have trouble fetching data from the PokeAPI, check the API documentation and ensure that your requests are correctly formatted.
    
-   **Tailwind CSS Issues:** If your styles are not applying correctly, make sure that Tailwind CSS is properly installed and configured in your Angular project. Follow the instructions on [TailwindCSS4](https://tailwindcss.com/) docs and configure it for your angular project.
    
-   **CORS Errors:** If you have access to the backend service, you can configure the backend to handle CORS requests if they are allowed.

##  Contributing

Contributions are welcome! If you'd like to improve this Pokédex app, fix bugs, add features, or enhance the design — feel free to collaborate.

### How to Contribute

1. **Fork the repository**
   - Click the "Fork" button on the top right of this page.
2. **Clone your forked repo**
   ```bash
   git clone https://github.com/Talha-Tahir2001/Pokedex.git
   cd Pokedex
   ```
3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes and commit**
   ```bash
   git commit -m "Add your message"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a pull request**
   ```bash
   Go to the original repo and click "Compare & pull request".
   ```
## License

This project is open-source and available under the [MIT License](https://github.com/Talha-Tahir2001/Pokedex/blob/main/LICENSE).

##  Acknowledgements

-   [PokeAPI](https://pokeapi.co/) — for providing an amazing open Pokémon API
    
-   [Auth0](https://auth0.com/) — for secure authentication
    
-   [Lucide Icons](https://lucide.dev/) — beautifully simple icons
    
-   [Angular Team](https://angular.io/) — for a powerful frontend framework
    
-   [Tailwind CSS](https://tailwindcss.com/) — for modern utility-first styling
    
-   [Spartan-ng](https://github.com/only-ng/spartan-ng) — sleek Angular UI components
    
##  Contact

Feel free to connect with me if you have any questions, suggestions, or collaboration ideas.

-   GitHub: [@Talha-Tahir2001](https://github.com/Talha-Tahir2001)
    
-   LinkedIn: [Talha Tahir](https://www.linkedin.com/in/talha-tahir2001/)
   
