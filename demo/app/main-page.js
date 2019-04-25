/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
const createViewModel = require("./main-view-model").createViewModel;
const nsPlatform = require('nativescript-platform');

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = args.object;


    // Console  Log out all the settings
    console.log("iOS?", nsPlatform.ios ? "Yes" : "No");
    console.log("Android?", nsPlatform.android ? "Yes" : "No");
    console.log("Windows?", nsPlatform.windows ? "Yes" : "No");
    console.log("Platform:", nsPlatform.platform === nsPlatform.type.ANDROID ? "Android" : nsPlatform.platform === nsPlatform.type.IOS ? "iOS" : "Unknown");
    console.log("Device:");
    for (const key in nsPlatform.device) {
        console.log("  ", key + ":", nsPlatform.device[key]);
    }
    console.log("DeviceType:", nsPlatform.deviceType);
    console.log("Screen:");
    for (const key in nsPlatform.screen) {
        console.log("  ", key + ":", nsPlatform.screen[key]);
    }


    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
