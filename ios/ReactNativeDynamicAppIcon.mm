#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (ReactNativeDynamicAppIcon, NSObject)

RCT_EXTERN_METHOD(getIcon
                  : (RCTPromiseResolveBlock)resolve withRejecter
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(changeIcon
                  : (NSString *)iconName withResolver
                  : (RCTPromiseResolveBlock)resolve withRejecter
                  : (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
