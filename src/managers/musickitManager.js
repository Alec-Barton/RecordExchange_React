export default class MusicKitManager {
    static provider() {
        return new MusicKitManager()
    }

    configure() {
        window.MusicKit.configure({
            developerToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IldWN1IyNEdVNkgifQ.eyJpc3MiOiJaTThSVkxFNDlWIiwiZXhwIjoxNjA5MDc0Nzk2LCJpYXQiOjE1OTMzMDY3OTZ9.oWF90_BRLS1TLghtyAPbCj_pD9-WikUabDTotfJ2MIY4uvMbJm41lOVFzIC2UrKo6QTiQV1LpZksk8wtsBvsdQ',
            app: {
                name: 'Record Exchange',
                build: '0.1.0'
            }
        });
    }

    getMusicInstance() {
        return window.MusicKit.getInstance();
    }
}