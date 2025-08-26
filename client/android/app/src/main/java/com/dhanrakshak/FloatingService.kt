package com.dhanrakshak

import android.app.*
import android.content.Intent
import android.graphics.*
import android.os.*
import android.view.*
import android.widget.*
import androidx.core.content.ContextCompat
import android.graphics.drawable.GradientDrawable
import android.provider.Settings
import android.util.Log

class FloatingService : Service() {

    private var windowManager: WindowManager? = null
    private var floatingView: View? = null

    override fun onStartCommand(intent: Intent?, flags2: Int, startId: Int): Int {
     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
        Log.e("Overlay", "Draw overlay permission not granted. Skipping overlay.")
        return START_NOT_STICKY
    }

        val number = intent?.getStringExtra("message") ?: "Unknown Caller"
        Log.d("FloatingService", "Received caller number: $number")
        // Notification setup for foreground service
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "floating_service_channel"
            val channel = NotificationChannel(
                channelId,
                "Floating Service Channel",
                NotificationManager.IMPORTANCE_HIGH
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)

            val notification = Notification.Builder(this, channelId)
            .setContentTitle("DhanRakshak Kavach🛡️ Protection")
                .setContentText("")
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .build()
            startForeground(1, notification)
        }

      val layout = LinearLayout(this).apply {
    orientation = LinearLayout.VERTICAL
    setPadding(40, 30, 40, 30)
    background = GradientDrawable().apply {
        cornerRadius = 48f
        colors = intArrayOf(
            Color.parseColor("#EF5350"), // Red 400
            Color.parseColor("#D32F2F")  // Red 700
        )
        gradientType = GradientDrawable.LINEAR_GRADIENT
        setStroke(5, Color.WHITE)
    }
    elevation = 24f
}

val textView = TextView(this).apply {
    text = number
    setTextColor(Color.WHITE)
    textSize = 20f
    setTypeface(Typeface.DEFAULT_BOLD)
    gravity = Gravity.CENTER
    setShadowLayer(5f, 2f, 2f, Color.BLACK)
}

layout.addView(textView)

val buttonLayout = LinearLayout(this).apply {
    orientation = LinearLayout.HORIZONTAL
    gravity = Gravity.CENTER
    setPadding(0, 25, 0, 0)
    layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT
    )
}

fun createButton(text: String, bgColor: String, onClick: () -> Unit): Button {
    return Button(this).apply {
        this.text = text
        setTextColor(Color.WHITE)
        textSize = 14f
        background = GradientDrawable().apply {
            cornerRadius = 24f
            setColor(Color.parseColor(bgColor))
        }
        setOnClickListener { onClick() }
        stateListAnimator = null // Disable button elevation animation
    }
}

val dismissBtn = createButton("Dismiss", "#9E9E9E") { stopSelf() }

val detailsBtn = createButton("View Details Now", "#C62828") {
                  Log.d("FloatingService", "Opening details for: $number")
    Log.d("FloatingService", "Launching: ${MainActivity::class.java.name}")

  val openAppIntent = Intent(this@FloatingService, MainActivity::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or
            Intent.FLAG_ACTIVITY_SINGLE_TOP or
            Intent.FLAG_ACTIVITY_CLEAR_TOP
    putExtra("callerNumber", number)
}
Log.d("FloatingService", "Opening details for: $number")
startActivity(openAppIntent)

     stopSelf() 
}



val buttonParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f).apply {
    setMargins(20, 0, 20, 0)
}

buttonLayout.addView(dismissBtn, buttonParams)
buttonLayout.addView(detailsBtn, buttonParams)

layout.addView(buttonLayout)

        // Setup window params
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                    WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
            PixelFormat.TRANSLUCENT
        )

        params.gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
        params.x = 0
        params.y = 600

        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        floatingView = layout
        windowManager?.addView(floatingView, params)

        layout.postDelayed({ stopSelf() }, 15000)

        return START_NOT_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        if (floatingView != null) {
            windowManager?.removeView(floatingView)
            floatingView = null
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
