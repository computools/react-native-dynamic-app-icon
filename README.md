# @computools/react-native-dynamic-app-icon 🚀

Dynamically change the app icon in React Native with cross-platform support for iOS and Android. Perfect for themes, events, and personalization.

<table>
  <tr>
    <th style="text-align: center;">iOS</th>
    <th style="text-align: center;">Android</th>
  </tr>
  <tr>
    <td>
      <img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/ios_dynamic_app_icon_preview.gif?updatedAt=1737115408393" width="200">
    </td>
    <td">
      <img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/android_dynamic_app_icon_preview.gif?updatedAt=1737115956222" width="200">
    </td>
  </tr>
</table>

## Installation

**Using Yarn**

```bash
yarn add @computools/react-native-dynamic-app-icon
```

**Using npm**

```bash
npm i @computools/react-native-dynamic-app-icon
```
### iOS Set Up

After installing the package, run:

```bash
cd ios
pod install
```

## Generate App Icons

Generate app icons using a tool like [appicon.co](https://www.appicon.co/) to ensure all required sizes and formats are included.

<img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/app_icon_generator.png?updatedAt=1737458948009" width="400"/>

## App Icons Set Up

### Android

#### Step 1: Add App Icons Files

1. Rename generated files to *ic_launcher_<icon_type>.png* e.g. `ic_launcher_orange.png`.
2. Rename default icon files to to `ic_launcher_default.png`
3. Move app icons files to `android/app/src/main/res/mipmap-*`.

<img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/icons_files_android.png?updatedAt=1737456324691" width="400">

#### Step 2: Modify `AndroidManifest.xml`

1. Add activity-alias for each icon.

```kotlin
<activity-alias
  android:name=".MainActivityPineapple" // .MainActivity + <icon-type>
  android:enabled="false"
  android:exported="true"
  android:icon="@mipmap/ic_launcher_pineapple"
  android:targetActivity=".MainActivity">
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
</activity-alias>
```

**Important**: `android:enabled="true"` should be only for **default** activity-alias, other should have `android:enabled="false"`.

2. Remove `<category android:name="android.intent.category.LAUNCHER" />` for activity-alias with `android:enabled="true"`.

**Notes:**
  1. Don’t forget to use the correct file for `android:icon` and `android:name`. `android:name` is **.MainActivity + <icon-type>** e.g for `android:icon=ic_launcher_orange` `android:name=".MainActivityOrange"`.
  2. Don't forget to change `android:icon` to `"@mipmap/ic_launcher_default"` in `<application>` tag.
  3. Make sure you have activity-alias with `android:icon=ic_launcher_default`, `android:name=".MainActivityDefault"`.

**`AndroidManifest.xml` example:**

```kotlin
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <uses-permission android:name="android.permission.INTERNET" />

  <application
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher_default"
    android:allowBackup="false"
    android:theme="@style/AppTheme"
    android:supportsRtl="true">
    <activity
      android:name=".MainActivity"
      android:label="@string/app_name"
      android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
      android:launchMode="singleTask"
      android:windowSoftInputMode="adjustResize"
      android:exported="true">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
    <activity-alias
      android:name=".MainActivityDefault"
      android:enabled="true"
      android:exported="true"
      android:icon="@mipmap/ic_launcher_default"
      android:targetActivity=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
      </intent-filter>
    </activity-alias>
    <activity-alias
      android:name=".MainActivityPineapple"
      android:enabled="false"
      android:exported="true"
      android:icon="@mipmap/ic_launcher_pineapple"
      android:targetActivity=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity-alias>
    <activity-alias
      android:name=".MainActivityStrawberry"
      android:enabled="false"
      android:exported="true"
      android:icon="@mipmap/ic_launcher_strawberry"
      android:targetActivity=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity-alias>
    <activity-alias
      android:name=".MainActivityOrange"
      android:enabled="false"
      android:exported="true"
      android:icon="@mipmap/ic_launcher_orange"
      android:targetActivity=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity-alias>
  </application>
</manifest>
```

### iOS

#### Step 1: Add App Icons Files

1. Rename generated `AppIcon.appiconset` folders to `<icon-type>Icon.appiconset`.
2. Rename default `AppIcon.appiconset` to `DefaultIcon.appiconset`.
3. Move all .appiconset folders into `ios/<app-name>/Images.xcassets`.
4. Update `folder` values in each `Contents.json` file e.g `"folder": "Images.xcassets/PineappleIcon.appiconset/"`.

<img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/icons_files_ios.png?updatedAt=1737456324725" width="400">

#### Step 2: Set up App Icon in Xcode

1. Open Xcode;
2. Go to app's `General` settings;
3. Scroll to `App Icons and Launch Screen`;
4. Set `App Icon` to *`DefaultIcon`* and check the `Include all app icon assets` checkbox below.

<img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/xcode_general.png?updatedAt=1737456324703" width="400">

#### Step 3: Modify Info.plist

1. Open Xcode, go to `Info` and insert a key for `CFBundleIcons.`
2. Within `CFBundleIcons` dictionary add key `CFBundleAlternateIcons`.
3. Within `CFBundleAlternateIcons` add keys for alternative icons:
  - The `key` is the name you will reference from within code.
  - Set the first `array` item to the name of the target .appiconset.
4. Within `CFBundleIcons` set the default icon name in `CFBundlePrimaryIcon` and `UINewsstandIcon` -> Icon files -> Item 0.

<img src="https://ik.imagekit.io/Computools/RN%20Dynamic%20App%20Icons%20/info_plist.png?updatedAt=1737456324778" width="400">

<br />

**`Info.plist` example:**

```
<key>CFBundleIcons</key>
<dict>
  <key>CFBundleAlternateIcons</key>
  <dict>
    <key>DefaultIcon</key>
    <dict>
      <key>CFBundleIconFiles</key>
      <array>
        <string>DefaultIcon</string>
      </array>
      <key>UIPrerenderedIcon</key>
      <false/>
    </dict>
    <key>OrangeIcon</key>
    <dict>
      <key>CFBundleIconFiles</key>
      <array>
        <string>OrangeIcon</string>
      </array>
      <key>UIPrerenderedIcon</key>
      <false/>
    </dict>
    <key>PineappleIcon</key>
    <dict>
      <key>CFBundleIconFiles</key>
      <array>
        <string>PineappleIcon</string>
      </array>
      <key>UIPrerenderedIcon</key>
      <false/>
    </dict>
    <key>StrawberryIcon</key>
    <dict>
      <key>CFBundleIconFiles</key>
      <array>
        <string>StrawberryIcon</string>
      </array>
      <key>UIPrerenderedIcon</key>
      <false/>
    </dict>
  </dict>
  <key>CFBundlePrimaryIcon</key>
  <dict>
    <key>CFBundleIconFiles</key>
    <array>
      <string>DefaultIcon</string>
    </array>
    <key>CFBundleIconName</key>
    <string></string>
    <key>UIPrerenderedIcon</key>
    <false/>
  </dict>
  <key>UINewsstandIcon</key>
  <dict>
    <key>CFBundleIconFiles</key>
    <array>
      <string>DefaultIcon</string>
    </array>
    <key>UINewsstandBindingEdge</key>
    <string>UINewsstandBindingEdgeLeft</string>
    <key>UINewsstandBindingType</key>
    <string>UINewsstandBindingTypeMagazine</string>
  </dict>
</dict>
```

## Methods

Method | Description | Parameters | Returns |
--- | --- | --- | --- |
**changeIcon(iconName: string)** | Changes the app's icon to the specified icon. <br/> **Note:** The package automatically closes the app on Android after changing the app icon. This behavior is implemented to prevent duplicate icons and requires no additional action from the user. | iconName (string): The name of the icon to switch to. | `Promise<void>`: Resolves with void or rejects with an error. |
**getIcon()** | Retrieves the name of the currently active app icon. | None | `Promise<string>`: Resolves with the name of the current used icon or rejects with an error. |

## Usage

### Change Icon

```typescript
import { changeIcon } from '@computools/react-native-dynamic-app-icon';

const setAppIcon = async () => {
  try {
    await changeIcon('Orange');
  } catch (error) {
    // error handling
  }
}

setAppIcon();
```

### Get Icon

```typescript
import { getIcon } from '@computools/react-native-dynamic-app-icon';

const getCurrentIcon = async () => {
  try {
    const currentIcon = await getIcon();
    // the logic of saving the currentIcon or other
  } catch (error) {
    // error handling
  }
}

getCurrentIcon();
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
