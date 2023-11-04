#import "AppDelegate.h"

// required for @react-native-firebase
#import <Firebase.h>

#import <React/RCTBundleURLProvider.h>

// required for react-native-maps
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // required for @react-native-firebase
  [FIRApp configure];

  // required for react-native-maps
  [GMSServices provideAPIKey:@"AIzaSyCSvmCLNxBWDrNHaTOaLkFcL6Alrw7tUtQ"];

  self.moduleName = @"classpass_mobile";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
