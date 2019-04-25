const Observable = require("tns-core-modules/data/observable").Observable;
const nsPlatform = require('nativescript-platform');
const utils = require('tns-core-modules/utils/utils');


function createViewModel() {
    // Display All the Settings.
    let Data = "iOS? " + (nsPlatform.ios ? "Yes" : "No");
    Data += "\r\nAndroid? " + (nsPlatform.android ? "Yes" : "No");
    Data += "\r\nPlatform: " + (nsPlatform.platform === nsPlatform.type.ANDROID ? "Android" : nsPlatform.platform === nsPlatform.type.IOS ? "iOS" : "Windows");
    Data += "\r\nDevice:";
    for (const key in nsPlatform.device) {
        Data += "\r\n   "+key+": " + nsPlatform.device[key];
    }
    Data += "\r\nDeviceType: " + nsPlatform.deviceType;

    Data += "\r\nScreen";
    for (const key in nsPlatform.screen) {
        Data += "\r\n   " + key + ": " + nsPlatform.screen[key];
    }

    let viewModel = new Observable();
    viewModel.data = Data;

    viewModel.tap = function() {
        utils.openUrl("http://www.master.technology");
    };

    return viewModel;
}

exports.createViewModel = createViewModel;
