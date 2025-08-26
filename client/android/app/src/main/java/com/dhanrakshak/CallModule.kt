package com.dhanrakshak

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class CallModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    init {
        Companion.reactContext = reactContext
    }

    override fun getName(): String {
        return "CallModule"
    }

    companion object {
        private var reactContext: ReactApplicationContext? = null

        fun sendIncomingNumberToReact(number: String) {
            reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("IncomingNumber", number)
        }

        fun sendIncomingSmsToReact(sender: String, message: String) {
            val params = Arguments.createMap().apply {
                putString("sender", sender)
                putString("message", message)
            }
            reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("IncomingSms", params)
        }
    }
}
