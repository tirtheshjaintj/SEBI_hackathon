package com.dhanrakshak

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.wifi.WifiManager

import android.Manifest
import android.content.pm.PackageManager
import android.database.Cursor
import android.provider.CallLog
import androidx.core.app.ActivityCompat

import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.*

import org.json.JSONObject
import android.net.Uri
import android.provider.ContactsContract

import android.util.Log
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.os.Bundle
import android.content.Intent
import android.app.Activity
import android.os.Handler
import android.os.Looper
import androidx.core.content.ContextCompat
import java.io.File

import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.Arguments
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.bridge.ReactContext

class DeviceSecurityModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var speechRecognizer: SpeechRecognizer? = null
    private var promise: Promise? = null
    override fun getName(): String {
        return "DeviceSecurity"
    }

     companion object {
        var pendingIntent: Intent? = null
    }

@ReactMethod
fun getCallLogs(promise: Promise) {
    Thread {
        if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_CALL_LOG)
            != PackageManager.PERMISSION_GRANTED ||
            ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_CONTACTS)
            != PackageManager.PERMISSION_GRANTED) {

            promise.reject("PERMISSION_DENIED", "Required permissions not granted")
            return@Thread
        }

        val callLogs = Arguments.createArray()
        val nameCache = mutableMapOf<String, String?>()
        val maxLogs = 100
        var count = 0

        val cursor: Cursor? = reactContext.contentResolver.query(
            CallLog.Calls.CONTENT_URI,
            null,
            null,
            null,
            "${CallLog.Calls.DATE} DESC"
        )

        cursor?.use {
            val numberIndex = cursor.getColumnIndex(CallLog.Calls.NUMBER)
            val typeIndex = cursor.getColumnIndex(CallLog.Calls.TYPE)
            val dateIndex = cursor.getColumnIndex(CallLog.Calls.DATE)
            val durationIndex = cursor.getColumnIndex(CallLog.Calls.DURATION)

            while (cursor.moveToNext() && count < maxLogs) {
                val number = cursor.getString(numberIndex)
                val type = cursor.getInt(typeIndex)
                val date = cursor.getLong(dateIndex)
                val duration = cursor.getString(durationIndex)

                val typeStr = when (type) {
                    CallLog.Calls.OUTGOING_TYPE -> "OUTGOING"
                    CallLog.Calls.INCOMING_TYPE -> "INCOMING"
                    CallLog.Calls.MISSED_TYPE -> "MISSED"
                    CallLog.Calls.REJECTED_TYPE -> "REJECTED"
                    else -> "OTHER"
                }

                val name = nameCache[number] ?: getContactNameFromNumber(number).also {
                    nameCache[number] = it
                }

                val map = Arguments.createMap()
                map.putString("number", number)
                map.putString("name", name ?: "Unknown")
                map.putString("type", typeStr)
                map.putDouble("timestamp", date.toDouble())
                map.putString("duration", duration)

                callLogs.pushMap(map)
                count++
            }
        }

        promise.resolve(callLogs)
    }.start()
}

object CallerEmitter {
    fun emitCallerNumber(context: Context, number: String) {
        val app = context.applicationContext as MainApplication
        val instanceManager = app.reactNativeHost.reactInstanceManager
        val reactContext = instanceManager.currentReactContext

        val emitToJS: (ReactContext) -> Unit = { ctx ->
            val params = Arguments.createMap().apply {
                putString("callerNumber", number)
            }
            Log.d("CallerEmitter", "✅ Emitting to JS with number: $number")
            ctx
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("NewCallerIntent", params)
        }

        if (reactContext != null) {
            emitToJS(reactContext)
        } else {
            Log.d("CallerEmitter", "⏳ ReactContext not ready, setting listener...")
            val listener = object : ReactInstanceEventListener {
                override fun onReactContextInitialized(newContext: ReactContext) {
                    Log.d("CallerEmitter", "✅ ReactContext initialized. Emitting now. $number")
                    emitToJS(newContext)
                    instanceManager.removeReactInstanceEventListener(this)
                }
            }

            instanceManager.addReactInstanceEventListener(listener)

            if (!instanceManager.hasStartedCreatingInitialContext()) {
                instanceManager.createReactContextInBackground()
            }
        }
    }
}



    

    @ReactMethod
    fun getInitialIntent(promise: Promise) {
        val intent = currentActivity?.intent ?: pendingIntent
        val callerNumber = intent?.getStringExtra("callerNumber")
        val result = Arguments.createMap().apply {
            putString("callerNumber", callerNumber)
        }
        promise.resolve(result)
    }




// Utility to get contact name from phone number
private fun getContactNameFromNumber(phoneNumber: String): String {
    // Check permission first
    val hasPermission = ContextCompat.checkSelfPermission(
        reactContext,
        android.Manifest.permission.READ_CONTACTS
    ) == PackageManager.PERMISSION_GRANTED

    if (!hasPermission) {
        return "Unknown"
    }

    val uri: Uri = Uri.withAppendedPath(
        ContactsContract.PhoneLookup.CONTENT_FILTER_URI,
        Uri.encode(phoneNumber)
    )
    val projection = arrayOf(ContactsContract.PhoneLookup.DISPLAY_NAME)

    val cursor = reactContext.contentResolver.query(uri, projection, null, null, null)
    cursor?.use {
        if (it.moveToFirst()) {
            return it.getString(0) ?: "Unknown"
        }
    }

    return "Unknown"
}

@ReactMethod
fun canDrawOverlays(promise: Promise) {
    val context = reactApplicationContext
    val result = Settings.canDrawOverlays(context)
    promise.resolve(result)
}

@ReactMethod
fun openOverlayPermission() {
    val intent = Intent(
        Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
        Uri.parse("package:${reactApplicationContext.packageName}")
    )
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    reactApplicationContext.startActivity(intent)
}

private fun checkRooted(): Boolean {
    val knownPaths = arrayOf(
        "/system/app/Superuser.apk",
        "/sbin/su",
        "/system/bin/su",
        "/system/xbin/su",
        "/data/local/xbin/su",
        "/data/local/bin/su",
        "/system/sd/xbin/su",
        "/system/bin/failsafe/su",
        "/data/local/su"
    )
    return knownPaths.any { path -> File(path).exists() }
}

@ReactMethod
fun getSecurityStatus(promise: Promise) {
    try {
        // Developer Options
        val devOptionsEnabled = Settings.Secure.getInt(
            reactContext.contentResolver,
            Settings.Secure.DEVELOPMENT_SETTINGS_ENABLED, 0
        ) == 1

        // USB Debugging
        val usbDebuggingEnabled = Settings.Secure.getInt(
            reactContext.contentResolver,
            Settings.Secure.ADB_ENABLED, 0
        ) == 1

        // Wi-Fi Connected
        val connectivityManager = reactContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        var wifiConnected = false

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val network = connectivityManager.activeNetwork
            val capabilities = connectivityManager.getNetworkCapabilities(network)
            wifiConnected = capabilities?.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) == true
        } else {
            @Suppress("DEPRECATION")
            val networkInfo = connectivityManager.activeNetworkInfo
            @Suppress("DEPRECATION")
            wifiConnected = networkInfo?.type == ConnectivityManager.TYPE_WIFI && networkInfo.isConnected
        }

        // SIM Presence
        val telephonyManager = reactContext.getSystemService(Context.TELEPHONY_SERVICE) as? android.telephony.TelephonyManager
        val simPresent = telephonyManager?.simState == android.telephony.TelephonyManager.SIM_STATE_READY

        // Root Check (basic)
        val isRooted = checkRooted()

        val result = JSONObject().apply {
            put("developerOptionsEnabled", devOptionsEnabled)
            put("usbDebuggingEnabled", usbDebuggingEnabled)
            put("wifiConnected", wifiConnected)
            put("simPresent", simPresent)
            put("isRooted", isRooted)
        }

        promise.resolve(result.toString())
    } catch (e: Exception) {
        promise.reject("SECURITY_CHECK_ERROR", "Failed to check device security settings", e)
    }
}


private fun hasMicrophonePermission(): Boolean {
    val permissionCheck = ContextCompat.checkSelfPermission(reactContext, Manifest.permission.RECORD_AUDIO)
    return permissionCheck == PackageManager.PERMISSION_GRANTED
}

    
@ReactMethod
fun startListening(p: Promise) {
    val activity: Activity? = currentActivity
    if (activity == null) {
        p.reject("NO_ACTIVITY", "Activity is null")
        return
    }

    if (!hasMicrophonePermission()) {
        p.reject("PERMISSION_DENIED", "Microphone permission not granted")
        return
    }

    promise = p

    // Run everything on the main thread
    Handler(Looper.getMainLooper()).post {
        if (!SpeechRecognizer.isRecognitionAvailable(activity)) {
            p.reject("NOT_AVAILABLE", "Speech recognition not available")
            return@post
        }

        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(activity)
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-IN")
            putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        }

        speechRecognizer?.setRecognitionListener(object : RecognitionListener {
            override fun onResults(results: Bundle?) {
                val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                promise?.resolve(matches?.get(0) ?: "")
            }

            override fun onError(error: Int) {
                promise?.reject("ERROR", "Speech error code: $error")
            }

            override fun onBeginningOfSpeech() {}
            override fun onEndOfSpeech() {}
            override fun onReadyForSpeech(params: Bundle?) {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })

        speechRecognizer?.startListening(intent)
    }
}


    @ReactMethod
    fun stopListening() {
    Handler(Looper.getMainLooper()).post { 
        speechRecognizer?.stopListening()
    }
    }
 
}
