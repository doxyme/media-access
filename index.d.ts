interface MediaDevice<DeviceKind> {
    deviceId: String,
    label: String,
    kind: DeviceKind
}

type EventMap = {
    localVolumeChange: Number // Will fire every 500ms or so
};

interface MediaAccess {
    userMediaStatus: {
        cameras: MediaDevice<'videoInput'>[],
        microphones: MediaDevice<'audioInput'>[],
        speakers: MediaDevice<'audioOutput'>[],
        hasCamera: Boolean,     // True if there is at least one camera
        hasMicrophone: Boolean, // True if there is at least one microphone
        noDevices: Boolean,     // True if there are no media devices (0 cameras and 0 microphones)
        hasMediaAccess: Boolean // True if user allowed access in a previous session and browser saved the permission
    },

    requestMediaAccess(): Promise<MediaStream>,

    on<EventName extends keyof EventMap> (
        event: EventName,
        callback: (payload: EventMap[EventName]) => void
    ): void
}