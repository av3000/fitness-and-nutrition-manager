# FitnessAndNutritionManager

Live version available at [https://fitness-app-dd09c.firebaseapp.com/](https://fitness-app-dd09c.firebaseapp.com/)

![Application demo](./docs/assets/images/fitness-demo.gif)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

[Firebase](https://www.npmjs.com/package/firebase) and [@angular/fire](https://www.npmjs.com/package/@angular/fire) used with [RxJs](https://rxjs.dev/) for authentication and [NoSQL real-time database](https://firebase.google.com/docs/database) with websocket connection to get a new changes via snapshot.
[Docker containers](https://www.docker.com/) and [Docker desktop](https://www.docker.com/products/docker-desktop/) for easier Docker management.

In order to setup your firebase database, visit [firebase console](https://console.firebase.google.com/) create project and copy-paste firebase config of your new database.

Project is build and served using [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

## Project features

- CRUD actions for Calendar/days meals and workouts
- Reactive Angular components with vanilla SCSS
- Shared reusable constants, types, pipes and UI components
- Lazy loadable modules and routable components
- Authentication of routes and guards implemented with Firebase and AngularFireAuth library
- Realtime updates with firebase websocket snapshotChanges
- Data access with single general subject store
- Docker setup

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker

You can also run the app in a Docker container. First, recommend to [Docker Desktop](https://www.docker.com/products/docker-desktop). Then, to build and start the Docker container:

```bash
docker-compose up
```

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the dist/ directory.

`npm run build:production` is needed to reflect latest changes and to deploy to firebase with `firebase deploy`.

Might need to clear the cache if changes not reflected.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
