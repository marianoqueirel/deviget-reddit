# Reddit App !

## URL

[GAME URL](https://mariano-deviget-reddit.herokuapp.com)

## Important notes

- The Post Detail Component need to be improved, I'm not manipulating properly the image... this is something that
  I've not finished
- The APP starts the sagas automatically without triggering the initial flow from component effects.
- I've used two different ways to manage async API calls just to show different ways to manage that:
  - Catching the error on the proper requests service and returns mapped objects.
  - try / catch block on the sagas generator.
- I have left event actions like GET_TOP_POST_SUCCESS so that the worker use this action instead of returns just
  an object without a signature or api.
- The apps allows us for 5 seconds since we press "Dismiss All Posts" button to restore dismissed posts. I used redux-saga solution for that but it could be achieved using redux store for data preservation.

## Tech debts and TODOs

- One big tech debt is moving all inline styles to classes or css objects. I've prioritized other things. We could
  use High Order component Material UI gives su to accomplish that or use
- I just add some unit testing for the saga file, I should add more unit testing for all the app.
- Error handling
- We could abstract axios into a single method then reuse it.
- SwipeableDrawer is being mounted / unmounted every time we trigger it, we can could avoid behavior to improve performance and to not lose the scroll position. The scroll position inside the SwipeableDrawer could be achieved using a method of the react-window's List.
- Use Context to avoid prop drilling for swipeable side bar functionality (open and close)
- Animation when dismiss all posts
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
