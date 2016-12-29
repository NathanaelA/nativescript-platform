/**********************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 1.0.2                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* jshint camelcase: false */
/* global global, java, android, NSString, NSObject, UIScreen */
let getResolution;

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

		// Screen Sizes since platforms are not accurate after a rotation event
		screen: function() { return getResolution(); }
	};

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

	}
}
