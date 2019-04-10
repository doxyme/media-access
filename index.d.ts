interface MediaDevice<DeviceKind> {
    deviceId: String,
    label: String,
    kind: DeviceKind
}

type EventMap = {
    localStream: MediaStream, // Typically fires once, when user allows access to camera
    localVolumeChange: Number // Will fire every 500ms or so
};

type PlatformName = 'mobile' | 'desktop';

type OSName = 'linux' | 'mac' | 'windows' | 'ios' | 'android' | 'chromeos';

type BrowserName = 'firefox' | 'chrome' | 'safari' | 'msedge' | 'opera' | 'msie' | 'samsungBrowser';

interface GlobalSystemInfoObject {
    systemInfo: {
        platform: PlatformName,
        os: OSName,
        browser: BrowserName,
        browserVersion: Number,
        isSupportedBrowser: Boolean,
        isUpToDateBrowser: Boolean
    },

    userMediaStatus: {
        cameras: MediaDevice<'videoInput'>[],
        microphones: MediaDevice<'audioInput'>[],
        speakers: MediaDevice<'audioOutput'>[],
        hasCamera: Boolean,     // True if there is at least one camera
        hasMicrophone: Boolean, // True if there is at least one microphone
        noDevices: Boolean,     // True if there are no media devices (0 cameras and 0 microphones)
        hasMediaAccess: Boolean // True if user allowed access in a previous session and browser saved the permission
    },

    enableWebcam(): Promise<void>,

    on<EventName extends keyof EventMap> (
        event: EventName,
        callback: (event: EventMap[EventName]) => void
    ): void
}