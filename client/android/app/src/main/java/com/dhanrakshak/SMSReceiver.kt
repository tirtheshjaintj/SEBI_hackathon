package com.dhanrakshak

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.telephony.SmsMessage
import android.util.Log
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.net.URL
import java.net.HttpURLConnection
import java.net.URLEncoder
import android.os.Handler
import android.os.Looper
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build

class SmsReceiver : BroadcastReceiver() {

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

   private fun isSpamByRegex(number: String, body: String): Boolean {
    val spamNumberPatterns = listOf(
        Regex("^140\\d{7,}$"),       // Telemarketers
        Regex("^1800\\d{6,}$"),      // Toll-free
        Regex("^(\\d)\\1{5,}$"),     // Repeated digits e.g. 999999
        Regex("^[A-Z]{2}-[A-Z0-9]{3,}$"), // India SMS headers like VK-PROMO, IM-ICICIBANK
        Regex("^[A-Z]-[A-Z0-9]{3,}$")    // Variants like V-PAYTM
    )

    val spamKeywords = listOf(
        "Click here", "Lottery", "Lucky Draw", "Apply Now"
    )

    return spamNumberPatterns.any { it.matches(number) } ||
           spamKeywords.any { body.contains(it, ignoreCase = true) }
}

private fun isSensitiveTraiMessage(senderId: String): Boolean {
    // Matches any TRAI sender ID ending with "-S" or "-T"
    val traiSensitivePattern = Regex("^[A-Z]{2}-[A-Z0-9]{1,6}[ST]$", RegexOption.IGNORE_CASE)
    return traiSensitivePattern.matches(senderId)
}

    private fun checkSpamWithApi(context: Context, number: String, body: String, callback: (Boolean) -> Unit) {
        Thread {
            try {
                val encodedNumber = URLEncoder.encode(number, "UTF-8")
                val encodedBody = URLEncoder.encode(body, "UTF-8")
                val url = URL("${Constants.BASE_URL}/report/check?phone_number=$encodedNumber&message=$encodedBody")                
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "GET"
                connection.connectTimeout = 5000
                connection.readTimeout = 5000
                val responseCode = connection.responseCode
                val response = connection.inputStream.bufferedReader().readText()
                Log.d("SmsReceiver", "API response: $response")
                callback(response.contains("\"spam\":true"))
            } catch (e: Exception) {
                Log.e("SmsReceiver", "API call failed", e)
                callback(false)
            }
        }.start()
    }

    private fun showOverlayAndNotify(context: Context, number: String) {
    showNotification(context, "⚠️ Spam Message", "From: $number")
    val floatIntent = Intent(context, FloatingService::class.java).apply {
        putExtra("message", "⚠️ Spam Message from: $number")
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(floatIntent)
    } else {
        context.startService(floatIntent)
    }
   }

    override fun onReceive(context: Context, intent: Intent) {
        val bundle: Bundle? = intent.extras

        try {
            if (bundle != null) {
                val pdus = bundle.get("pdus") as Array<*>
                for (pdu in pdus) {
                    val format = bundle.getString("format")
                    val message = SmsMessage.createFromPdu(pdu as ByteArray, format)
                    val sender = message.displayOriginatingAddress
                    val body = message.messageBody

                    Log.d("SmsReceiver", "SMS from $sender: $body")
                    CallModule.sendIncomingSmsToReact(sender, body)
                    val sensitive=isSensitiveTraiMessage(sender)
                    if(sensitive) return;
                    val isRegexSpam = isSpamByRegex(sender, body)
                    if (isRegexSpam) {
                        showOverlayAndNotify(context,sender);
                    } else {
                        checkSpamWithApi(context, sender, body) { isApiSpam ->
                            if (isApiSpam) {
                                showOverlayAndNotify(context,sender);
                            } else {
                                Log.d("SmsReceiver", "SMS not spam.")
                            }
                        }
                    }
                    return  // handle one SMS at a time (you can remove this if you want to loop)
                }
            }
        } catch (e: Exception) {
            Log.e("SmsReceiver", "Exception in SMS Receiver: ${e.message}")
        }
    }
}
