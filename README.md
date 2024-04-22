## Local setup (shared)

- Create file `classpass_mobile/src/utils/firebase-creds.ts` with the following content:
```
export default {
  appId: 'some_value',
  apiKey: 'some_value',
  databaseURL: 'some_value',
  storageBucket: 'some_value',
  messagingSenderId: 'some_value',
  projectId: 'some_value',
  persistence: true,
};
```
- Add file `classpass_mobile/ios/GoogleService-Info.plist` (required for Firebase)
- Add file `classpass_mobile/android/app/google-services.json` (required for Firebase)

## Local setup (iOS)

- https://reactnative.dev/docs/environment-setup -> React Native CLI Quickstart (guide is for both iOS and Android)
-  Node v16.20.1 (install via `brew` or `nvm`)
- `brew install watchman`
- install [cocoapods](https://cocoapods.org/) (dependency management system available for iOS)
- `brew install rbenv ruby-build`
- `rbenv install 2.7.6` (required version of Ruby is [here](https://github.com/facebook/react-native/blob/v0.71.3/.ruby-version))
- `export PATH="$HOME/.rbenv/shims:$PATH"` - add path to rbenv on top of PATH var
- `echo "$PATH"` to make sure that $PATH variable has `$HOME/.rbenv/shims` proceeding `/usr/bin` so that system ruby version points to rbenv
- commands `ruby --version` and `rbenv version` should have the same output `2.7.6`
- XCode 10+
- XCode Command Line Tools
- remove `react-native-cli` if it was installed globally: `npm uninstall -g react-native-cli @react-native-community/cli`
- run iOS application `yarn i`

## Local setup (Android)

- Pass all the steps enumerated in *Local setup (iOS)*
- install Java Development Kit
```
brew tap homebrew/cask-versions
brew install --cask zulu11

# Get path to where cask was installed to double-click installer
brew info --cask zulu11
```
- install Android Studio
- install Android SDK
- `open ~/.bash_profile` -> configure the `ANDROID_HOME` environment variable
```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
then `source ~/.bash_profile` to load the config into your current shell
- `adb devices` make sure Android Debug Bridge (adb) is intalled and devices are listed
- run Android application `yarn a`

# Run application locally

## iOS

- No need to open XCode
- `yarn i` - this will start application on iPhone emulator

## Android

- Open Android Studio with project you want to build and run
- Run virtual device or plug in physical device via cable
- `yarn a` - this will start applicaiton on virtual or physical device

# nvm

`nvm ls` - list all installed node versions

`nvm use {alias}` - use specific version, e.g. `nvm use default` - will use node v14.21.3, `nvm use stable` - will use node v16.20.1

`node -v` - check node version which is currently used

## Create iOS sharable build / application file

- Open XCode
- Product -> Archive -> Wait...
- In the opened window "Archives" -> Select latest archive -> Distribute App -> App Store Connect -> Upload -> Automatically manage signing -> Upload
- Wait until build is processed and ready for installation via TestFlight
- iOS device -> TestFlight -> Install latest version of the app

## Errors

If iOS UI does not work after installing new packages:
- `cd classpass_mobile/ios `
- `pod install`

This will install all required dependencies on mobile OS level

***

While building Android app:

Node found at: /usr/local/Cellar/node@14/14.21.3/libexec/node
error: Can't find the '/usr/local/Cellar/node@14/14.21.3/libexec/node' binary to build the React Native bundle.  If you have a non-standard Node.js installation, select your project in Xcode, find  'Build Phases' - 'Bundle React Native code and images' and change NODE_BINARY to an  absolute path to your node executable. You can find it by invoking 'which node' in the terminal.

- go to terminal
- `open /usr/local/Cellar/node@14`
- rename folder `14.21.3_1` to `14.21.3`

***

How to run locally on Android virtual device?

- Open Android Studio with project you want to build and run
- Start any virtual device (press "Play" button for that)
- `yarn run-android` - note that this command DOES NOT start virtual device

***

How to fix Android error "Installing APK 'app-debug.apk'" while running on physical device? The same applies to error "Execution failed for task ':app:installDebug'". The same applies when build is stuck at 99%

- Open Android studio with project you want to build and run
- Unplug physical device
- Start any virtual device
- `yarn a` - Run on virtual device
- Shut down virtual device
- DO NOT close Anroid studio
- `yarn a` - Run on physical device

In case steps above do not help:
- Re-open Android studio with project you want to build and run
- Unplug physical device
- Run any virtual device
- Make sure virtual device is working (click on any application)
- `yarn a` - Run on virtual device
- Make sure that classpass is runnning correctly on virtual device
- Shut down virtual device
- DO NOT close Anroid studio
- Plug physical device
- `yarn a` - Run on physical device

***

iOS run two simulators failed: Unable to lookup in current state: Shutdown

Solution - https://stackoverflow.com/questions/69283962/ios-run-two-simulators-failed-unable-to-lookup-in-current-state-shutdown

***

Android -> build application -> Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.

Solution - run `source ~/.bash_profile`

***

To enable husky pre-push, run once: ```npx husky install``` from root project directory

***
