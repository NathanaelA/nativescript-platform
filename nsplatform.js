/**********************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 1.0.0                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* jshint camelcase: false */
/* global java, android, NSString, NSObject */

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
        platform: 0
    };

    if (typeof java !== 'undefined' && typeof android !== 'undefined') {
        global.nsPlatform.android = true;
        global.nsPlatform.platform = global.nsPlatform.type.ANDROID;
    } else if (typeof NSString !== 'undefined' && typeof NSObject !== 'undefined') {
        global.nsPlatform.ios = true;
        global.nsPlatform.platform = global.nsPlatform.type.IOS;
    } else { // TODO: Check what properties are available on Windows Runtime
        global.nsPlatform.winows = true;
        global.nsPlatform.platform = global.nsPlatform.type.WINDOWS;
    }

    // Lock the object down to prevent any changes
    Object.freeze(global.nsPlatform);
}


module.exports = global.nsPlatform;

