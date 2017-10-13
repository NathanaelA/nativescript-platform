/**********************************************************************************
 * (c) 2016-2017 Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 1.2.0                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* jshint camelcase: false */
/* global global, java, android, NSString, NSObject, UIScreen */
let getResolution, getDevice;

if (typeof global.nsPlatform === 'undefined') {
	global.nsPlatform = {
		ios: false,
		windows: false,
		android: false,
		type: {ANDROID: 1, IOS: 2, WINDOWS: 3},
		TYPE: {ANDROID: 1, IOS: 2, WINDOWS: 3},
		isWindows: function() { return global.nsPlatform.windows; },
		isAndroid: function() { return global.nsPlatform.android; },
		isIOS: function() { return global.nsPlatform.ios; },
		platform: 0,

	};
    // Screen Sizes since platforms are not accurate after a rotation event
	Object.defineProperty(global.nsPlatform, "screen", {
	    get: function() { return getResolution(); }
    });
	Object.defineProperty(global.nsPlatform, "device", {
	    get: function() { return getDevice(); }
    });

	if (typeof java !== 'undefined' && typeof android !== 'undefined') {
		global.nsPlatform.android = true;
		global.nsPlatform.platform = global.nsPlatform.type.ANDROID;
	} else if (typeof NSString !== 'undefined' && typeof NSObject !== 'undefined') {
		global.nsPlatform.ios = true;
		global.nsPlatform.platform = global.nsPlatform.type.IOS;
	} else { // TODO: Check what properties are available on Windows Runtime
		global.nsPlatform.windows = true;
		global.nsPlatform.platform = global.nsPlatform.type.WINDOWS;
	}

	// Lock the object down to prevent any changes
	Object.freeze(global.nsPlatform);
}


module.exports = global.nsPlatform;

// ---------------------------------------------------------------
// Getting ios Property
// ---------------------------------------------------------------
function iOSProperty(_this, property) {
	if (typeof property === "function") {
		return property.call(_this);
	}
	else {
		return property;
	}
}


// ---------------------------------------------------------------
// Getting android context
// ---------------------------------------------------------------
function getContext() {
	let ctx = java.lang.Class.forName("android.app.AppGlobals").getMethod("getInitialApplication", null).invoke(null, null);
	if (ctx) { return ctx; }

	return java.lang.Class.forName("android.app.ActivityThread").getMethod("currentApplication", null).invoke(null, null);
}


if (nsPlatform.android) {
	getResolution = function() {
		const context = getContext();
		const metrics = new android.util.DisplayMetrics();
		context.getSystemService(android.content.Context.WINDOW_SERVICE).getDefaultDisplay().getRealMetrics(metrics);

		return {
			width: parseInt(metrics.widthPixels / metrics.density,10),
			height: parseInt(metrics.heightPixels / metrics.density,10),
			scale: metrics.density,
			widthPixels: metrics.widthPixels,
			heightPixels: metrics.heightPixels
		};
	};

	let deviceType = null;
	getDevice = function() {
	    if (deviceType) { return deviceType; }
	    deviceType = {emulator: false, model: "emulator", name: "emulator", manufacturer: "generic"};

        const res = android.os.Build.FINGERPRINT;
        if (res.indexOf("vbox86") >= 0 || res.indexOf("generic") >= 0) { deviceType.emulator = true; }

        deviceType.manufacturer = android.os.Build.MANUFACTURER;
        deviceType.model = android.os.Build.MODEL;

        const betterModel = android.provider.Settings.Secure.getString(getContext().getContentResolver(), "bluetooth_name");
        if (betterModel) { deviceType.name = betterModel.toString();}
        else deviceType.name = deviceType.model;

        return deviceType;
    }
} else if (nsPlatform.ios) {
	getResolution = function() {
		const screen = iOSProperty(UIScreen, UIScreen.mainScreen);
		return {
			width: screen.bounds.size.width,
			height: screen.bounds.size.height,
			scale: screen.scale,
			widthPixels: screen.bounds.size.width * screen.scale,
			heightPixels: screen.bounds.size.height * screen.scale,
		};
	};

	let deviceType = null;
	getDevice = function() {
	    if (deviceType) { return deviceType; }
	    deviceType = {emulator: false, model: "emulator", name: "emulator", manufacturer: "Apple"};
        // See: https://github.com/NativeScript/ios-runtime/issues/698
        const _SYS_NAMELEN = 256;
        const buffer = interop.alloc(5 * _SYS_NAMELEN);
        uname(buffer);
        let _machine = NSString.stringWithUTF8String(buffer.add(_SYS_NAMELEN * 4)).toString();

        // Get machine name for Simulator
        if (_machine === "x86_64" || _machine === "i386") {
            deviceType.emulator = true;
            let env = iOSProperty(NSProcessInfo, NSProcessInfo.processInfo).environment;
            _machine = env.objectForKey("SIMULATOR_MODEL_IDENTIFIER");
        }
        deviceType.model = _machine;

        switch (_machine) {
            // region iPhone's
            case "iPhone1,1":
                deviceType.name = "iPhone";
                break;
            case "iPhone1,2":
                deviceType.name = "iPhone3G";
                break;
            case "iPhone2,1":
                deviceType.name = "iPhone3GS";
                break;
            case "iPhone3,1":
            case "iPhone3,2":
            case "iPhone3,3":
                deviceType.name = "iPhone4";
                break;
            case "iPhone4,1":
                deviceType.name = "iPhone4S";
                break;
            case "iPhone5,1":
            case "iPhone5,2":
                deviceType.name = "iPhone5";
                break;
            case "iPhone5,3":
            case "iPhone5,4":
                deviceType.name = "iPhone5C";
                break;
            case "iPhone6,1":
            case "iPhone6,2":
                deviceType.name = "iPhone5S";
                break;
            case "iPhone7,1":
                deviceType.name = "iPhone6Plus";
                break;
            case "iPhone7,2":
                deviceType.name = "iPhone6";
                break;
            case "iPhone8,1":
                deviceType.name = "iPhone6S";
                break;
            case "iPhone8,2":
                deviceType.name = "iPhone6SPlus";
                break;
            case "iPhone8,4":
                deviceType.name = "iPhoneSE";
                break;
            case "iPhone9,1":
            case "iPhone9,3":
                deviceType.name = "iPhone7";
                break;
            case "iPhone9,2":
            case "iPhone9,4":
                deviceType.name = "iPhone7Plus";
                break;
            case "iPhone10,1":
            case "iPhone10,4":
                deviceType.name = "iPhone8";
                break;
            case "iPhone10,2":
            case "iPhone10,5":
                deviceType.name = "iPhone8Plus";
                break;
            case "iPhone10,3":
            case "iPhone10,6":
                deviceType.name = "iPhoneX";
                break;
            // endregion iPhone

            /// region iPad's
            case "iPad1,1":
                deviceType.name = "iPad";
                break;
            case "iPad2,1":
            case "iPad2,2":
            case "iPad2,3":
            case "iPad2,4":
                deviceType.name = "iPad 2";
                break;
            case "iPad2,5":
            case "iPad2,6":
            case "iPad2,7":
                deviceType.name = "iPad Mini 1";
                break;
            case "iPad3,1":
            case "iPad3,2":
            case "iPad3,3":
                deviceType.name = "iPad 3";
                break;
            case "iPad3,4":
            case "iPad3,5":
            case "iPad3,6":
                deviceType.name = "iPad 4";
                break;
            case "iPad4,1":
            case "iPad4,2":
            case "iPad4,3":
                deviceType.name = "iPad Air";
                break;
            case "iPad5,3":
            case "iPad5,4":
                deviceType.name = "iPad Air 2";
                break;
            case "iPad4,4":
            case "iPad4,5":
            case "iPad4,6":
                deviceType.name = "iPad Mini 2";
                break;
            case "iPad4,7":
            case "iPad4,8":
            case "iPad4,9":
                deviceType.name = "iPad Mini 3";
                break;
            case "iPad5,1":
            case "iPad5,2": deviceType.name = "iPad Mini 4"; break;

            case "iPad6,3":
            case "iPad6,4": deviceType.name = "iPad 9.7 Pro"; break;

            case "iPad6,7":
            case "iPad6,8": deviceType.name = "iPad 12.9 Pro"; break;

            case "iPad7,1":
            case "iPad7,2": deviceType.name = "iPad 12.9 Pro 2"; break;

            case "iPad7,3":
            case "iPad7,4": deviceType.name = "iPad 10.5 Pro"; break;

            case "iPad6,11":
            case "iPad6,12": deviceType.name = "iPad 5"; break;
            /// endregion iPad

            /// region iPod's
            case "iPod1,1":
                deviceType.name = "iPod 1G";
                break;
            case "iPod2,1":
                deviceType.name = "iPod 2G";
                break;
            case "iPod3,1":
                deviceType.name = "iPod 3G";
                break;
            case "iPod4,1":
                deviceType.name = "iPod 4G";
                break;
            case "iPod5,1":
                deviceType.name = "iPod 5G";
                break;
            case "iPod7,1":
                deviceType.name = "iPod 6G";
                break;
            // endregion

            default:
                deviceType.name = _machine;
                break;
        }

        return deviceType;
    };
}
