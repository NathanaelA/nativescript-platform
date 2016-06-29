[![npm](https://img.shields.io/npm/v/nativescript-platform.svg)](https://www.npmjs.com/package/nativescript-platform)
[![npm](https://img.shields.io/npm/l/nativescript-platform.svg)](https://www.npmjs.com/package/nativescript-platform)
[![npm](https://img.shields.io/npm/dt/nativescript-platform.svg?label=npm%20d%2fls)](https://www.npmjs.com/package/nativescript-platform)

# nativescript-platform
A NativeScript plugin to easily deal with and detect which platform you are on

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support contract, changes, enhancements and/or a commercial license please contact me at [http://nativescript.tools](http://nativescript.tools).

I also do contract work; so if you have a module you want built for NativeScript (or any other software projects) feel free to contact me [nathan@master-technology.com](mailto://nathan@master-technology.com).

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg?style=plastic)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HN8DDMWVGBNQL&lc=US&item_name=Nathanael%20Anderson&item_number=nativescript%2dplatform&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3ax%3aNonHosted)
[![Patreon](https://img.shields.io/badge/Pledge-Patreon-brightgreen.svg?style=plastic)](https://www.patreon.com/NathanaelA)


## Requirements
Any version of NativeScript

## Installation 

tns plugin add nativescript-platform


## Usage

To use the module you just `require()` it:

```js
var myPlatform = require( "nativescript-platform" );
if (myPlatform.android) {
  // do android specific stuff
}
```

please note you can also simple do, and then the nsPlatform will be available globally everywhere:
```js
require( "nativescript-platform" );
if (nsPlatform.ios) {
 // do ios specific stuff
}
```

nsPlatform will be declared globally.  My recommendation is just to include it in the app.js and then use it everywhere.


## You ask, how exactly does this help?
This wraps up several simple ways to check for the platform you are on.  This comes up commonly when you are trying to do stuff on just one platform.


## API
### Functions
#### .isAndroid();
#### .isIOS();
#### .isWindows();
- returns true or false depending on the platform it is on
Example:
```
if (nsPlatform.isAndroid()) { /* do my android specific stuff */ }
```


### Variables
#### .ios
#### .windows
#### .android
- Is set to either true or false for the platform it is on
Example:
```
if (nsPlatform.ios) { /* do my ios specific stuff */ }
```

### Switch Statement support
#### .platform
##### .type.WINDOWS
##### .type.IOS
##### .type.ANDROID
Example:
```
switch (nsPlatform.platform) {
  case nsPlatform.type.WINDOWS: // Do Windows stuff
  case nsPlatform.type.IOS:     // Do iOS stuff
  case nsPlatform.type.ANDROID: // Do Android stuff
}
```
