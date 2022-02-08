<!--
Template for contributing guide for all projects
-->

### Introduction

Welcome to the San Diego Voter's Voice Initiative! We are a coalition of non-partisan organizations working together to create a website that will provide transparency for campaign contributions and expenditures with local San Diego candidates.

**Organizations Involved in the Project**

* [Represent.us](https://represent.us/)
* [Common Cause](https://www.commoncause.org/)
* [League of Women's Voters](https://www.lwv.org/)
* [Open San Diego](https://opensandiego.org/)

**Links**
* Production website: https://followthemoneysandiego.org/
* Development branch (dev) website: https://dev-sdvotersvoice.web.app/
* [UI Design Prototype](https://xd.adobe.com/view/2515850f-37db-4f50-5de2-93d5cec8d021-5324/)

#### Background Information

Currently, campaign finance information for candidates running for local offices as well as money spent by outside groups to support or defeat them is not readily accessible to the public.  When the amount of money being spent as well as the source is not known, voters feel disenfranchised by the election process.  Making campaign finance data easy to find and read will increase public trust and confidence in the election process.

For more information with Voter's Voice Initiative visit [https://sdvotersvoice.org/](https://sdvotersvoice.org/)

### Prerequisites
* Angular CLI 13.1.2+
* npm 6.14.15+

### Setup
1. Clone directory from github

2. change to the sdvv-frontend directory
```
cd sdvv-frontend
```

3. Run npm install to install all the dependencies 
```
npm install
```

4. Install the Angular CLI
```
npm install -g @angular/cli
```

5. Build the libraries. This will build then into the /dist folder.
```
npm run build:lib
```
Or run the libraries in watch mode with.
```
npm run start:lib:ui:charts
npm run start:lib:ui:components
```

6. Start the Angular server then browse to http://localhost:4200/
```
npm run start
```

Or to start the server and open the application in the browser.
```
ng serve --open
```

To run the application and connect to backend database on Heroku use:
```
npm run start:db:remote
```

### Contributing

[Contributing](https://github.com/opensandiego/sdvv-frontend/blob/master/CONTRIBUTING.md)
