// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCql8kYzeaq_BuDzhsw8X4q5CxEG-5s3j4",
  authDomain: "beeodiversity-ephec.firebaseapp.com",
  projectId: "beeodiversity-ephec",
  storageBucket: "beeodiversity-ephec.appspot.com",
  messagingSenderId: "21503560541",
  appId: "1:21503560541:web:18a34406649302ecf2f6b4",
  measurementId: "G-GD72DZ58Y2"
  },
  appShellConfig: {
    debug: false,
    networkDelay: 500
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
