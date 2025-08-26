package com.dhanrakshak

import android.app.*
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder

class ForegroundService : Service() {
    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        val notification = Notification.Builder(this, "CALL_SMS_CHANNEL")
            .setContentTitle("DhanRakshak Kavach🛡️ Protection")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .build()
        startForeground(1, notification)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "CALL_SMS_CHANNEL",
                "Call & SMS Monitoring",
                NotificationManager.IMPORTANCE_HIGH
            )
            getSystemService(NotificationManager::class.java)?.createNotificationChannel(channel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
