import axios from 'axios';

function createDeeplink(link, imgUrl, title){
    let base = 'https://RecordExchange.page.link/?link=http://'
    let appendedTitle = title + " - Record Exchange"
    let sanitizedTitle =  appendedTitle.replace(/\s/g, "%20")
    //TODO: make this unnessesary
    let sanitizedUrl = link.replace("www.", "")
    let url = `${base}${sanitizedUrl}&si=${imgUrl}&st=${sanitizedTitle}`
    return url
}

function createCompactDeeplink(url){

}

export{ createDeeplink, createCompactDeeplink}

