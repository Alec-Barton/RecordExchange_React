const ServiceType = {
    spotify: 'spotify',
    apple: 'apple',
    invalid: 'invalid'
};

const ObjectType = {
    track: 'track',
    album: 'album',
    playlist: 'playlist'
};


class ParsedUrl {
    constructor(serviceType, objectType, id) {
        this.serviceType = serviceType
        this.objectType = objectType
        this.id = id
    }
}

function parseUrl(url) {
    if (url.search('open.spotify.com') != -1) {
        if (url.search('track/') != -1) {
            let startIndex = url.search('track/') + 6
            let endIndex = startIndex + 22
            let id = url.substring(startIndex, endIndex)
            let parsedUrl = new ParsedUrl(ServiceType.spotify, ObjectType.track, id)
            return (parsedUrl)
        } else if (url.search('album/') != -1) {
            let startIndex = url.search('album/') + 6
            let endIndex = startIndex + 22
            let id = url.substring(startIndex, endIndex)
            let parsedUrl = new ParsedUrl(ServiceType.spotify, ObjectType.album, id)
            return (parsedUrl)
        } else if (url.search('playlist/') != -1) {
            let startIndex = url.search('playlist/') + 9
            let endIndex = startIndex + 22
            let id = url.substring(startIndex, endIndex)
            let parsedUrl = new ParsedUrl(ServiceType.spotify, ObjectType.playlist, id)
            return (parsedUrl)
        }
    }

    else if (url.search('music.apple.com') != -1) {
        if (url.search('album/') != -1) {
            if (url.search('i=') != -1) {
                let startIndex = url.search('i=') + 2
                let endIndex = startIndex + 10
                let id = url.substring(startIndex, endIndex)
                let parsedUrl = new ParsedUrl(ServiceType.apple, ObjectType.track, id)
                return (parsedUrl)
            } else {
                let albumStartIndex = url.search('album/')
                let albumSubstring = url.substring(albumStartIndex + 6)
                let idStartIndex = albumSubstring.search('/') + 1
                let idEndIndex = idStartIndex + 10
                let id = albumSubstring.substring(idStartIndex, idEndIndex)
                let parsedUrl = new ParsedUrl(ServiceType.apple, ObjectType.album, id)
                return (parsedUrl)
            }
        } else if (url.search('playlist/') != -1) {
            let substringStartIndex = url.search('playlist/') + 9
            let substring = url.substring(substringStartIndex)
            let subSubstringStartIndex = substring.search('/')
            let subSubstring = substring.substring(subSubstringStartIndex)
            if (subSubstring.search('pl.u-') != -1) {
                let startIndex = subSubstring.search('pl.u-') 
                let id = subSubstring.substring(startIndex)
                let parsedUrl = new ParsedUrl(ServiceType.apple, ObjectType.playlist, id)
                return (parsedUrl)
            } else if (subSubstring.search('pl.') != -1) {
                let startIndex = subSubstring.search('pl.')
                let id = subSubstring.substring(startIndex)
                let parsedUrl = new ParsedUrl(ServiceType.apple, ObjectType.playlist, id)
                return (parsedUrl)
            }
            
        }

    }
    let parsedUrl = new ParsedUrl(ServiceType.invalid)
    return (parsedUrl)
}

export{ParsedUrl, parseUrl}