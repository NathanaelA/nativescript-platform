var Observable = require("data/observable").Observable;
var nsPlatform = require('nativescript-platform');
var utils = require('utils/utils');

function createViewModel() {

    // Display All the Settings.
    var Data = "iOS? " + (nsPlatform.ios ? "Yes" : "No");
    Data += "\r\nAndroid? " + (nsPlatform.android ? "Yes" : "No");
    Data += "\r\nWindows? " + (nsPlatform.windows ? "Yes" : "No");
    Data += "\r\nPlatform: " + (nsPlatform.platform === nsPlatform.type.ANDROID ? "Android" : nsPlatform.platform === nsPlatform.type.IOS ? "iOS" : "Windows");
    Data += "\r\nDevice:";
    for (var key in nsPlatform.device) {
        Data += "\r\n   "+key+": " + nsPlatform.device[key];
    }

    Data += "\r\nScreen";
    for (var key in nsPlatform.screen) {
        Data += "\r\n   " + key + ": " + nsPlatform.screen[key];
    }

    var viewModel = new Observable();
    viewModel.data = Data;

    viewModel.tap = function() {
        utils.openUrl("http://www.master.technology");
    }

    return viewModel;
}

exports.createViewModel = createViewModel;