
# Transparency Dashboard for San Diego City elections

<!-- ### Introduction -->

<!-- Welcome to the San Diego Voter's Voice Initiative! We are a coalition of non-partisan organizations working together to create a website that will provide transparency for campaign contributions and expenditures with local San Diego candidates. -->

**Organizations Involved in the Project**

* [Open San Diego](https://opensandiego.org/)
* [Represent.us](https://represent.us/)
* [Common Cause](https://www.commoncause.org/)
* [League of Women's Voters](https://www.lwv.org/)

**Links**
* Production website: https://followthemoneysandiego.org/
* Development branch (dev) website: https://develop-san-diego-voters-voice.web.app/
* [UI Design Prototype](https://xd.adobe.com/view/2515850f-37db-4f50-5de2-93d5cec8d021-5324/)

#### Background Information

Currently, campaign finance information for candidates running for local offices as well as money spent by outside groups to support or defeat them is not readily accessible to the public.  When the amount of money being spent as well as the source is not known, voters feel disenfranchised by the election process.  Making campaign finance data easy to find and read will increase public trust and confidence in the election process.

For more information with Voter's Voice Initiative visit [https://sdvotersvoice.org/](https://sdvotersvoice.org/)

#### Data Source

The campaign finance data used in this site is sourced from publicly available campaign disclosure data provided by the [City of San Diego's Electronic Filing System](https://efile.sandiego.gov/).

### Prerequisites
* Angular CLI 16+
* npm 9.8+
* node 18+

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

5. Build the libraries at least once. This will build them into the /dist folder.
```
npm run build:lib
```
If you are modifying a component in a library then you can run either library in watch mode using:
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

The easiest way to run the site locally is to have it access the data using the remote development backend hosted on Heroku. This does not require the backend or database to be run locally. To do this use:
```
npm run start:db:remote
```

### Contributing

[Contributing](https://github.com/opensandiego/sdvv-frontend/blob/master/CONTRIBUTING.md)
