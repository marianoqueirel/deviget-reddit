# Reddit App !

## URL

[GAME URL](https://mariano-deviget-reddit.herokuapp.com)

## Tech notes

- The APP starts the sagas automatically without triggering the initial flow from component effects.
- I've used two different ways to manage async API calls just to different way to manage this flows.
  - Catching the error on the proper requests service and returns mapped objects.
  - try / catch block on the sagas generator.
- The apps allows us for 5 seconds from we pressed on "Dismiss All Posts" to restore them. I used redux-saga solution but it could be achieve using store for preservation.

## Tech debts and TODOs

- Reuse Sagas to get posts and next page posts instead of repeat code.
- We could abstract into one single method the axios method an reuse it on all the calls
- SwipeableDrawer is being mounted / unmounted every time we trigger it, we can could avoid behavior to improve performance and to not lose the scroll position.
- Use Context to avoid prop drilling for swipeable side bar functionality
- Add loader component
- Animation when dismiss all posts
- Add unit testing
- Error handling
- Make n attempts on API request before throw an error.

## Tech used

- react
- redux
- redux-devtools
- redux-saga
- material-ui
- axios
- react-spring
- reselect

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
