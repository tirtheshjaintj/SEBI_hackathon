package com.dhanrakshak

import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream
import android.net.Uri

class InstalledAppsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context = reactContext

    override fun getName(): String {
        return "InstalledApps"
    }
  

@ReactMethod
fun getInstalledApps(promise: Promise) {
    try {
        val pm = context.packageManager
        val apps = pm.getInstalledApplications(PackageManager.GET_META_DATA)
        val result = Arguments.createArray()

        for (appInfo in apps) {
            if ((appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0) {
                continue
            }
            val appData = Arguments.createMap()

            // App name
            val appName = pm.getApplicationLabel(appInfo).toString()
            appData.putString("appName", appName)

            //Category
            val category = getAppCategory(pm, appInfo.packageName)
            appData.putString("category", category)

            // Package name
            appData.putString("packageName", appInfo.packageName)

            // Is system app
            appData.putBoolean("isSystemApp", (appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0)

            // Installer package name
            val installer = try {
                pm.getInstallerPackageName(appInfo.packageName) ?: "unknown"
            } catch (e: Exception) {
                "unknown"
            }
            appData.putString("installerPackageName", installer)

            // Permissions
            val permissions = Arguments.createArray()
            try {
                val packageInfo = pm.getPackageInfo(appInfo.packageName, PackageManager.GET_PERMISSIONS)
                packageInfo.requestedPermissions?.forEach { permissions.pushString(it) }
            } catch (e: Exception) {
                // Ignore missing permissions
            }
            appData.putArray("permissions", permissions)

            // App icon
            val iconDrawable = pm.getApplicationIcon(appInfo)
            val iconBase64 = drawableToBase64(iconDrawable)
            appData.putString("icon", iconBase64)

            result.pushMap(appData)
        }

        promise.resolve(result)
    } catch (e: Exception) {
        promise.reject("ERROR", e.message, e)
    }
}

   @ReactMethod
    fun openDeveloperOptions() {
        val intent = Intent(Settings.ACTION_APPLICATION_DEVELOPMENT_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent)
    }

    @ReactMethod
    fun openAppInfo(packageName: String) {
    val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
    intent.data = Uri.parse("package:$packageName")
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    context.startActivity(intent)
    }


    private fun drawableToBase64(drawable: Drawable): String {
        val bitmap = if (drawable is BitmapDrawable) {
            drawable.bitmap
        } else {
            val bitmap = Bitmap.createBitmap(
                drawable.intrinsicWidth.takeIf { it > 0 } ?: 1,
                drawable.intrinsicHeight.takeIf { it > 0 } ?: 1,
                Bitmap.Config.ARGB_8888
            )
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            bitmap
        }

        val stream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
        val byteArray = stream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }

    private fun getAppCategory(packageManager: PackageManager, packageName: String): String {
    val categoryMatchers = listOf(
        "upi" to Intent("android.intent.action.VIEW", Uri.parse("upi://pay")),
        "browser" to Intent(Intent.ACTION_VIEW, Uri.parse("http://")),
        "email" to Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:")),
        "sms" to Intent(Intent.ACTION_SENDTO, Uri.parse("smsto:")),
        "dialer" to Intent(Intent.ACTION_DIAL),
        "media" to Intent(Intent.ACTION_VIEW).apply { type = "video/*" },
        "file_manager" to Intent(Intent.ACTION_GET_CONTENT).apply { type = "*/*" }
    )

    for ((tag, intent) in categoryMatchers) {
        val resolveInfos = packageManager.queryIntentActivities(intent, 0)
        for (info in resolveInfos) {
            if (info.activityInfo?.packageName == packageName) {
                return tag
            }
        }
    }
    return "other" // default if no known category matched
}


   
}
