@objc(ReactNativeDynamicAppIcon)
class ReactNativeDynamicAppIcon: NSObject {

  @objc(getIcon:withRejecter:)
  func getIcon(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if let currentIcon = UIApplication.shared.alternateIconName {
        resolve(currentIcon)
      } else {
        resolve("DefaultIcon")
      }
    }
  }

  @objc(changeIcon:withResolver:withRejecter:)
  func changeIcon(iconName: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if !UIApplication.shared.supportsAlternateIcons {
        reject("IOS:NOT_SUPPORTED", "Alternate icons are not supported on this device", nil)
        return
      }

      let currentIcon = UIApplication.shared.alternateIconName

      if iconName == currentIcon {
        reject("IOS:ICON_ALREADY_USED", "The selected icon is already in use", nil)
        return
      }

      let newIconName = iconName.isEmpty || iconName == "DefaultIcon" ? nil : iconName

      UIApplication.shared.setAlternateIconName(newIconName) { error in
        if let error = error {
          reject("IOS:ICON_CHANGE_FAILED", "Failed to change icon: \(error.localizedDescription)", error)
        } else {
          resolve(newIconName ?? "DefaultIcon")
        }
      }
    }
  }
}
