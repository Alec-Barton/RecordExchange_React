export default class MusicKitManager {
    static provider() {
        return new MusicKitManager()
    }

    configure() {
        window.MusicKit.configure({
            developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldWN1IyNEdVNkgifQ.eyJpYXQiOjE1Nzc2NTAwNzMsImV4cCI6MTU5MzIwMjA3MywiaXNzIjoiWk04UlZMRTQ5ViJ9.4P1-_Nqiy3huaTW9saNzrV5cGx41rbXvsuXSjwZ_h4WjqAomobIHNsrO0BtQjtxD3fsKP9eTPHjTc7_vypBVwA',
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