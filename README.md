# Vita

Vita is a multi-deployable, performant project designed for development and production environments. It aims to provide an easy-to-work-with setup for building web applications.

## Project Description

Vita is a project that leverages modern web development tools and frameworks to create high-performance web applications. It utilizes the following key technologies:

- **Preact**: A fast and lightweight JavaScript library for building user interfaces.
- **Vite**: A fast development server and build tool that provides an optimized development experience.
- **Vite Plugin SSR**: A plugin for Vite that enables server-side rendering (SSR) capabilities.

## Scripts

The project provides several scripts that can be executed using different package managers. Here is a description of each script:

- **dev**: Runs the development server using Vite. This script starts a local development server to serve the application in the development environment. It enables hot module replacement (HMR) and other development features.

- **build**: Builds the application using Vite. This script compiles the project's source code and generates optimized production-ready assets in the `dist` directory. The resulting bundle can be deployed to a production server.

- **build:cfw**: Builds the application for Cloudflare Workers deployment. This script executes the `build` script and then uses the Hattip Cloudflare Workers adapter to generate a Cloudflare Workers bundle.

- **build:netlify-functions**: Builds the application for Netlify Functions deployment. This script executes the `build` script and then uses the Hattip Netlify adapter to generate the necessary files for Netlify Functions.

- **build:netlify-edge**: Builds the application for Netlify Edge deployment. This script executes the `build` script and then uses the Hattip Netlify adapter to generate the necessary files for Netlify Edge.

- **build:vercel**: Builds the application for Vercel deployment (serverless mode). This script executes the `build` script and then uses the Hattip Vercel adapter to generate the necessary files for Vercel's serverless deployment.

- **build:vercel-edge**: Builds the application for Vercel deployment (edge mode). This script executes the `build` script and then uses the Hattip Vercel adapter to generate the necessary files for Vercel's edge deployment.

- **start**: Starts the production server. This script sets the `NODE_ENV` environment variable to `production` and runs the compiled server code located in the `dist/server` directory.

- **start:cfw**: Starts the Cloudflare Workers development server. This script uses the `wrangler` command-line tool to run the application locally, emulating the Cloudflare Workers environment.

- **start:netlify**: Starts the Netlify development server. This script uses the `netlify-cli` command-line tool to run the application locally, emulating the Netlify environment.

- **preview**: Builds and starts the application for previewing purposes. This script executes the `build` and `start` scripts in sequence, providing a convenient way to preview the production-ready application.

- **format**: Formats the code using Rome. This script uses the Rome formatter to ensure consistent code style across the project.

- **lint**: Runs static analysis on the code using Rome. This script checks the code for potential errors, style violations, and other issues.

- **test**: Runs the tests in watch mode. This script executes the Vitest test runner in watch mode, allowing you to continuously run and monitor the tests as you make changes to the code.

- **test:run**: Runs the tests located in the `test` folder. This script executes the Vitest test runner to run the defined tests and report the results.

## Package Managers

You can use one of the following package managers to manage the project's dependencies and execute the defined scripts:

- **pnpm**: If you prefer to use pnpm, make sure you have it installed globally. Then, you can run the scripts using the `pnpm` command instead of `npm` or `yarn`.

- **npm**: If you prefer to use npm, make sure you have it installed globally. Then, you can run the scripts using the `npm run <script>` command.

- **yarn**: If you prefer to use Yarn, make sure you have it installed globally. Then, you can run the scripts using the `yarn <script>` command.

Choose the package manager of your choice and run the desired scripts to develop, build, test, and deploy your Vita application.
