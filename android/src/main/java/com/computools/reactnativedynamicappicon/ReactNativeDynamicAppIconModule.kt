package com.computools.reactnativedynamicappicon

import android.app.Activity
import android.app.Application
import android.content.ComponentName
import android.content.pm.PackageManager
import android.os.Bundle
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ReactNativeDynamicAppIconModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), Application.ActivityLifecycleCallbacks {

    companion object {
        const val NAME = "ReactNativeDynamicAppIcon"
        const val MAIN_ACTIVITY_BASE_NAME = ".MainActivity"
    }

    private var componentClass = ""
    private val classesToKill: MutableSet<String> = HashSet()

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun getIcon(promise: Promise) {
        val activity = currentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NOT_FOUND", "Activity was not found")
            return
        }

        val activityName = activity.componentName.className

        if (activityName.endsWith(MAIN_ACTIVITY_BASE_NAME)) {
            promise.resolve("Default")
            return
        }

        val activityNameSplit = activityName.split("MainActivity".toRegex()).toTypedArray()
        if (activityNameSplit.size != 2) {
            promise.reject("ANDROID:UNEXPECTED_COMPONENT_CLASS:", componentClass)
            return
        }

        promise.resolve(activityNameSplit[1])
    }

    @ReactMethod
    fun changeIcon(iconName: String, promise: Promise) {
        val activity = currentActivity

        if (activity == null) {
            promise.reject("ACTIVITY_NOT_FOUND", "The activity is null. Check if the app is running properly.")
            return
        }
        if (iconName.isEmpty()) {
            promise.reject("EMPTY_ICON_STRING", "Icon name is missing i.e. changeIcon('YOUR_ICON_NAME_HERE')")
            return
        }
        if (componentClass.isEmpty()) {
            componentClass = activity.componentName.className
        }

        val newIconName = iconName.takeUnless { it.isEmpty() } ?: "Default"
        val packageName = reactContext.packageName
        val activeClass = "$packageName$MAIN_ACTIVITY_BASE_NAME$newIconName"

        if (componentClass == activeClass) {
            promise.reject("ICON_ALREADY_USED", "This icon is the current active icon. $componentClass")
            return
        }

        try {
            activity.packageManager.setComponentEnabledSetting(
                ComponentName(packageName, activeClass),
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP
            )
            promise.resolve(newIconName)
        } catch (e: Exception) {
            promise.reject("ICON_INVALID", e.localizedMessage)
            return
        }

        classesToKill.add(componentClass)
        componentClass = activeClass
        activity.application.registerActivityLifecycleCallbacks(this)
        completeIconChange()
    }

    private fun completeIconChange() {
        val activity = currentActivity ?: return

        classesToKill.forEach { cls ->
            activity.packageManager.setComponentEnabledSetting(
                ComponentName(reactContext.packageName, cls),
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP
            )
        }

        classesToKill.clear()
    }

    override fun onActivityPaused(activity: Activity) {}

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}

    override fun onActivityStarted(activity: Activity) {}

    override fun onActivityResumed(activity: Activity) {}

    override fun onActivityStopped(activity: Activity) {}

    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}

    override fun onActivityDestroyed(activity: Activity) {
        android.os.Process.killProcess(android.os.Process.myPid())
    }
}
