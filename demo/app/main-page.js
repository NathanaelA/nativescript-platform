var createViewModel = require("./main-view-model").createViewModel;
var nsPlatform = require('nativescript-platform');

function onNavigatingTo(args) {
    var page = args.object;

    // Console  Log out all the settings
    console.log("iOS?", nsPlatform.ios ? "Yes" : "No");
    console.log("Android?", nsPlatform.android ? "Yes" : "No");
    console.log("Windows?", nsPlatform.windows ? "Yes" : "No");
    console.log("Platform:", nsPlatform.platform === nsPlatform.type.ANDROID ? "Android" : nsPlatform.platform === nsPlatform.type.IOS ? "iOS" : "Windows");
    console.log("Device:");
    for (var key in nsPlatform.device) {
        console.log("  ",key+":", nsPlatform.device[key]);
    }
    console.log("DeviceType:", nsPlatform.deviceType);
    console.log("Screen:" );
    for (var key in nsPlatform.screen) {
        console.log("  ",key+":", nsPlatform.screen[key]);
    }

    page.bindingContext = createViewModel();
}

exports.onNavigatingTo = onNavigatingTo;