// ----------------------------------------
// NativeScript-Platforms Typings
// ----------------------------------------

export function isIOS(): boolean;
export function isAndroid(): boolean;
export function isWindows(): boolean;

export const windows: boolean;
export const ios: boolean;
export const android: boolean;
export const deviceType: string;

enum TYPE {
    ANDROID = 1,
    IOS = 2,
    WINDOWS = 3
}
export const type = TYPE;

export const platform: TYPE;
export class screen {
    public width: number;
    public height: number;
    public scale: number;
    public widthPixels: number;
    public heightPixels: number;
}

export class platform {
    public emulator: boolean;
    public model: string;
    public name: string;
    public manufacturer: string;
}