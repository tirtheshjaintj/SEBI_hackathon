package com.dhanrakshak

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager
import android.util.Log

//Notifications
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build

import java.net.URL
import java.net.HttpURLConnection
import java.io.BufferedReader
import java.io.InputStreamReader
import android.os.Handler
import android.os.Looper
import java.net.URLEncoder

class CallReceiver : BroadcastReceiver() {
    private fun showNotification(context: Context, title: String, message: String) {
    val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val channel = NotificationChannel(
            "ALERT_CHANNEL",
            "Incoming Alerts",
            NotificationManager.IMPORTANCE_HIGH
        )
        notificationManager.createNotificationChannel(channel)
    }

    val notification = Notification.Builder(context, "ALERT_CHANNEL")
        .setContentTitle(title)
        .setContentText(message)
       .setSmallIcon(android.R.drawable.ic_dialog_info)
        .build()

    notificationManager.notify(System.currentTimeMillis().toInt(), notification)
}

private fun isSpamByRegex(number: String): Boolean {
    // Example: starts with 140 or 1800, or too many repeated digits
    val spamPatterns = listOf(
        Regex("^140\\d{7,}$"),      // Common telemarketer prefix in India
        Regex("^1800\\d{6,}$"),     // Toll-free marketing numbers
        Regex("^(\\d)\\1{5,}$")     // e.g., 999999, 88888888
    )

    return spamPatterns.any { it.matches(number) }
}

private fun isSensitiveTraiMessage(senderId: String): Boolean {
    // Matches any TRAI sender ID ending with "-S" or "-T"
    val traiSensitivePattern = Regex("^[A-Z]{2}-[A-Z0-9]{1,6}[ST]$", RegexOption.IGNORE_CASE)
    return traiSensitivePattern.matches(senderId)
}


private fun checkSpamWithApi(context: Context, number: String, callback: (Boolean) -> Unit) {
    Thread {
        try {
            Log.d("CallReceiver", "Making request to check spam for number: $number")
            val encodedNumber = URLEncoder.encode(number, "UTF-8")
            val url = URL("${Constants.BASE_URL}/report/check?phone_number=$encodedNumber")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            connection.connectTimeout = 3000
            connection.readTimeout = 3000

            val responseCode = connection.responseCode
            Log.d("CallReceiver", "API response code: $responseCode")
        
            if (responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().readText()
                Log.d("CallReceiver", "API response: $response")
                val isSpam = response.contains("\"spam\":true")
                callback(isSpam)
            } else {
                Log.d("CallReceiver", "API returned non-OK status.")
                callback(false)
            }
        } catch (e: Exception) {
            Log.e("CallReceiver", "API request failed: ${e.message}")
            callback(false)
        }
    }.start()
}


private fun showOverlayAndNotify(context: Context, number: String) {
    showNotification(context, "⚠️ Spam Call", "From: $number")
    val floatIntent = Intent(context, FloatingService::class.java).apply {
        putExtra("message", "⚠️ Spam Call from: $number")
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(floatIntent)
    } else {
        context.startService(floatIntent)
    }
}



    override fun onReceive(context: Context, intent: Intent) {
    val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
    // val pendingResult = goAsync() // Prevent receiver from exiting

     //Log.d("CallReceiver",TelephonyManager.EXTRA_STATE_RINGING)
    if (state == TelephonyManager.EXTRA_STATE_RINGING) {
        val incomingNumber = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)
          
        if (!incomingNumber.isNullOrEmpty()) {
            CallModule.sendIncomingNumberToReact(incomingNumber)
           // Log.d("CallReceiver", "Incoming call from: $incomingNumber")

            val isRegexSpam = isSpamByRegex(incomingNumber);
            val sensitive=isSensitiveTraiMessage(incomingNumber);
            if(sensitive) return;
            if (isRegexSpam) {
                //Log.d("CallReceiver", "Making request to check spam for number: $incomingNumber")
                showOverlayAndNotify(context, incomingNumber)
            } else {
                checkSpamWithApi(context, incomingNumber) { isApiSpam ->
                    if (isApiSpam) {
                        showOverlayAndNotify(context, "$incomingNumber")
                    } else {
                        Log.d("CallReceiver", "Number is not spam.")
                    }
                }
            }
        }
    }
}
}
