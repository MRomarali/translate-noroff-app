<div id="top"></div>

<div align="center">
  <img src="resources\logo.png" alt="Translate logo" height="250">
  <h3 align="center">Assignment 3</h3>
  <p align="center">
    Heroku App
    <br />
    <a href="https://translate-noroff-app.herokuapp.com/">Demo</a>
  </p>
</div>

# Table of Contents
1. [Instructions](#instructions)
2. [Appendix A](#appendix-a)
3. [Resources](#resources)
4. [Install](#install)
5. [Usage](#usage)
6. [Demo](#demo)
7. [Maintainers](#maintainers)
8. [Contributing](#contributing)
9. [Conventions](#conventions)
10. [Contact](#contact)

# Instructions
## Assignment 3
### Create a Sign Language Translator using React
### Lost in Translation

<p>
  Build an online sign language translator as a Single Page Application using the React framework. 
  You have freedom to be as creative as you wish, as long as it meets the minimum requirements described in 
  Appendix A. 
</p>
<ol>
  <li>
    <p>Set up the development environment</p>
    <p>Make sure you have the following tools available:</p>
    <ul>
        <li>Figma</li>
        <li>NPM/Node.js (LTS – Long Term Support version)</li>
        <li>React CRA (create-react-app)</li>
        <li>Visual Studio Code Text Editor</li>
        <li>Browser Developer Tools for testing and debugging</li>
        <li>Git</li>
        <li>Heroku</li>
    </ul>
  </li>
  <li>
    <p>Recommended: Design a wireframe</p>
    <p>
      Use Figma to create a wireframe of the layout. The layout should only show placeholders and positioning 
      of your design (i.e., no colours or images required). 
    </p>
  </li>
  <li>
    <p>Write HTML & CSS as needed</p>
    <ul>
      <li>Colours: If you have trouble choosing colours, use a free resource like https://coolors.co to browse and experiment with colour combinations.</li>
      <li>Animations: If you want to use animations to bring your design to life, use https://animate.style/.</li>
    </ul>
  </li>
  <li>
    <p> Use the React framework to build the following screens into your translator app
    (See Appendix A for detailed specs):</p>
    <ul>
      <li>The Startup Page</li>
      <li>The Translation Page</li>
      <li>The Profile Page</li>
    </ul>
  </li>
  <li>
    <p>Submit</p>
    <ul>
      <li>Export the wireframe to PDF, upload the file to the project’s Git repository and submit a link to your file</li>
      <li>Also submit your JSON file in the root of the project’s Git repository</li>
      <li>
        Publish your Single Page Application on Heroku and submit a link to your app and the source code on 
        your Git repository. Use https://github.com/mars/create-react-app-buildpack to learn how to deploy 
        React apps to Heroku.
      </li>
    </ul>
  </li>
</ol>

<p align="right">(<a href="#top">back to top</a>)</p>

# Appendix A
### Requirements for the sign language translator 
    <p>The application will have one main feature: to act as a “translator” from regular text to sign language. The 
    application must be able to translate English words and short sentences to American sign language. The 
    images for the sign language will be provided.</p>

1. ### Startup Page
    <p>The first thing a user should see is the “Login page” where the user must be able to enter their name. Once the 
    name has been stored in a node.js database, the app must display the main page, the translation page. There 
    should be a session management solution as well. Users that are already logged in may automatically be 
    redirected to the Translation page. You may use the browsers’ local storage to manage the session.</p>
    
    <p>NB!
    NEVER STORE database IDs in the browser storage.</p>

2. ### Translation Page
    <p>A user may only view this page if they are currently logged into the app. Please redirect a user back to the login 
    page if now active login session exists.</p>

    <p>The user types in the input box at the top of the page. The user must click on the “translate” button to the right 
    of the input box to trigger the translation</p>
    
    <p>Translations must be stored using a node.js database solution (See Required features for more information).
    The Sign language characters must appear in the “translated” box. You may choose to limit the input to 40 
    letters. (Not required)</p>

    <p>Note:
    ONLY the text must be stored, not the sign language images</p>

3. ### Profile page
    <p>The profile page must display the last 10 translations for the current user. There must also be a button to clear 
    the translations. This should mark the translations as “deleted” in your database and no longer display on the 
    profile page.</p>

    <p>The Logout button should clear all the storage and return to the start page. You may design this however you’d 
    like.</p>
    
<p align="right">(<a href="#top">back to top</a>)</p>

### Required features
The following features/tools must be present in the application:

<ul>
  <li>React framework</li>
  <li>React Router to navigate between pages</li>
  <li>Store the translations in a json database using Node.js. You can make use of the json-server node 
  library. </li>
  <li>Json-Server: https://github.com/typicode/json-server</li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

### NB!
1. IF YOU DO NOT USE REDUX, make use of the ContextAPI.
2. Remember to upload the DB so that I may run it on my side.

## Optional features

<p>The following features/tools are optional in the application:</p>
<ul>
  <li> React-Redux
    <li>https://react-redux.js.org</li>
    <li>I highly recommend using the Redux Toolkit: https://redux-toolkit.js.org</li>
  </li>
    <li>Auth0 Authentication client to manage login and session
    <li>https://auth0.com</li>
  </li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

# Resources
Heroku: <a href="https://translate-noroff-app.herokuapp.com/">Demo</a>

Figma: <a href="/resources/figma">Diagram</a>

Code: <a href="/src">Source</a>

# Install
```
cd translate-noroff-app
npm install
```

# Usage
```
npm run start
```

# Demo
Heroku App:

<a href="https://translate-noroff-app.herokuapp.com/Login">https://translate-noroff-app.herokuapp.com/Login</a>

<p align="right">(<a href="#top">back to top</a>)</p>

# Maintainers
[@Cusatelli](https://github.com/Cusatelli)

[@OmarAbdiAli](https://github.com/OmarAbdiAli)

# Contributing
[@OmarAbdiAli](https://github.com/OmarAbdiAli)

[@Cusatelli](https://github.com/Cusatelli)

<p align="right">(<a href="#top">back to top</a>)</p>

# Conventions
`fix: <description>` a commit of the type fix patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).<br/>
`feat: <description>` a commit of the type feat introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).<br/>
`BREAKING CHANGE: <description>` a commit that has a footer `BREAKING CHANGE:`, or appends a ! after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A `BREAKING CHANGE` can be part of commits of any type.

Read more: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) v1.0.0

<p align="right">(<a href="#top">back to top</a>)</p>

# Contact
Cusatelli: <a href="mailto:github.cusatelli@gmail.com">github.cusatelli@gmail.com</a>

OmarAbdiAli: <a href="mailto:github.omarabdiali0@gmail.com">github.OmarAbdiAli@gmail.com</a>

<p align="right">(<a href="#top">back to top</a>)</p>
