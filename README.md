# BQuest - Front end

built with:
* React.js + Redux
* Create React App
* scss

## setup (development)

- clone the repository and `cd` in
- `yarn` to install node modules
- `yarn start` to launch dev server
    - visit `localhost:3000`

## run inside a docker container

- `make build_image` to build the latest bundle inside a baked image
- `make run` to start nginx inside of a docker container

## Project Organization
```
.
├── images  
│   ├── landingPage
│   └── profile
├── pages  // the index.html and any static assets it references
└── src
    ├── components  // contains all the "dummy" UI components
    │   ├── loading
    │   ├── navbar
    │   ├── pages
    │   │   ├── completeRegistration
    │   │   ├── home
    │   │   │   └── topBar
    │   │   ├── login
    │   │   ├── ambassadorDetail
    │   │   ├── profile
    │   │   ├── register
    │   │   ├── requests
    │   │   └── search
    │   ├── searchBar
    │   └── util
    │       ├── Button
    │       └── divider
    ├── container  // contains all the "smart" components that hook into redux
    ├── reducer  // contains files that each hold a reducer and action thunks
    ├── selectors  // used to select parts of state to memoize. See https://github.com/reactjs/reselect
    └── style  // style variables
    ├── main.js  // ENTRY POINT for our application's javascript
    ├── main.scss  // ENTRY POINT for our application's CSS
```

## Helpful links to check out
* [React.js documentation](https://reactjs.org/docs/hello-world.html)
* [Redux documentation](https://redux.js.org/introduction)
* [Guide to reselect](https://github.com/reactjs/reselect)
* [Immutable.js Documentation + introduction](https://facebook.github.io/immutable-js/)
* [Base project upon which ours is built](https://github.com/xorkevin/reactant)
    * Building and understanding this project will help you understand ours
    
