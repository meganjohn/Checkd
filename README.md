# Checkd

A news fact-checking website giving users an indication of likely sentiment and bias of a news article followed up by moderator review for authenticity and reliability.

Created as an entry for Code First Girls: Hack From Home.

## Table of Contents

  * [User Stories](#user-stories)
  * [Technologies](#technologies)
  * [Getting started](#getting-started)
    + [Prerequisites](#prerequisites)
    + [Clone Project](#clone-project)
    + [Install dependencies](#install-dependencies)
    + [Create Environmemt Variables](#create-environmemt-variables)
    + [Generate Firebase Private Key](#generate-firebase-private-key)
    + [Build and Run Project](#build-and-run-project)
  * [Status](#status)
  * [Contributors](#contributors)
    + [Developers](#developers)
    + [UI and UX](#ui-and-ux)

## User Stories

1) As a user, I want to submit a url so that the newspaper article can be reviewed
2) As a user, I want to submit news article text, so that it can be reviewed
3) As a user, I want to recieve a confirmation, to ensure my submission has been sent
4) As a user, I want to recieve an intitial sentiment and bias of an article, so I can quickly self assess the likelihood of authenticity
5) As a user, I want to recieve confirmation that my submission has been assessed by moderators, so that I can know whether its fake and inform others
6) As a user, I want to see a news feed, so that I can keep updated on fake/confirmed news and share my findings with others

1) As a potential moderator, I want to register with the site, so that I can become a moderator
2) As a moderator, I want to submit my email and password, so that I can sign in
3) As a moderator, I want to see user submissions, so I can research the likelihood of authenticity
4) As a moderator, I want to confirm fake news, so that it can be published on the newsfeed

## Technologies

- Node (Express.js)
- React
- Python
- firebase
- IBM Carbon Design System
- SCSS

## Getting started

### Prerequisites

- Node
- Python 3.8
- pip

### Clone Project

1) get a local copy of the project

`git clone https://github.com/meganjohn/Checkd.git`

### Install dependencies

2) In the root directory, install the project dependencies by using the following commands. These commands should create a folder called node_modules and install the python modules.

`npm install`

`pip install -r requirements.txt`

### Create Environmemt Variables

3) In the root directory create a .env file to store the environment variables, and assign API_KEY_BI to your api key. Get the political bias API key from [bipartisian](https://www.thebipartisanpress.com/political-bias-api-and-integrations/).

```API_KEY_BI=your api key```

4) Create a new firebase project and enable email/password authentication. Next add new web application to your project. Go to your web application settings and find your apiKey, projectId, messagingSenderId and appId. Include those variables to your .env file.

```
REACT_APP_FIRE_API_KEY=apiKey
REACT_APP_FIRE_PROJECT_ID=projectId
REACT_APP_FIRE_MSG_SENDER_ID=messageSenderId
REACT_APP_FIRE_APP_ID=appId
```

5) For IBM Carbon Design system, add the path to your node modules to your .env file.

`SASS_PATH=./node_modules`

Note for IBM Carbon if you are not using the windows operating system then it should be

`SASS_PATH="node_modules"`

### Generate Firebase Private Key

6) Go to your firebase console and select 'Project settings'. Then go to the 'Service Accounts' tab. Then click 'Generate new private key', and store it in this project at `config/serviceAccountKey.json`. NOTE: Do not upload this to github, or share it publicly.

### Build and Run Project

7) Now you can build the react project and start the express development server. This command should create a folder called build.

`npm run dev`

8) The website will now be running on http://localhost:5000

## Status

This project is still in development.

## Contributors

### Developers

- Megan - [@meganjohn](https://github.com/meganjohn)
- Aly - [@alystroud](https://github.com/alystroud)
- Lawrencia - [@lawcia](https://github.com/lawcia)

### UI and UX

- Arka
- Imane