
function hexBrightnessPercentage (hex, percent){  
    hex = hex.slice(1);
    var num = parseInt(hex,16);
    var baseLine = 0 

    let rHex = (num >> 16)
    let bHex = ((num >> 8) & 0x00FF)
    let gHex = (num & 0x0000FF)
    let highestColor = Math.max(rHex, bHex, gHex)
    if (percent > 0) {
        // percent = 1 -percent
        baseLine = 255
    } else if (percent < 0){
        baseLine = 0
    } else {
        return hex
    }

    let changeAmount = (Math.abs(baseLine - highestColor) * percent)


    var r = rHex + changeAmount
    if (r > 255) {
        r = 255
    }
    else if  (r < 0) {
        r = 0
    }
    var b = bHex + changeAmount
    if (b > 255) {
        b = 255
    }
    else if  (b < 0) {
        b = 0
    }
    var g = gHex + changeAmount
    if (g > 255) {
        g = 255
    }
    else if (g < 0) {
        g = 0
    }

    var hexString = (g | (b << 8) | (r << 16)).toString(16)
    // hexString = ('0' * 6-hexString.length) + hexString
    if (hexString.length < 6){
        let leadingZeros = '0' * (6-hexString.length)
        hexString = leadingZeros + hexString
    }
    return ('#') + hexString;
}

function hexBrightnessAmount (hex, amount){  
    hex = hex.slice(1);
    var num = parseInt(hex,16);

    var r = (num >> 16) + amount
    if (r > 255) {
        r = 255
    }
    else if  (r < 0) {
        r = 0
    }

    var b = ((num >> 8) & 0x00FF) + amount
    if (b > 255) {
        b = 255
    }
    else if  (b < 0) {
        b = 0
    }

    var g = (num & 0x0000FF) + amount
    if (g > 255) {
        g = 255
    }
    else if (g < 0) {
        g = 0
    }
 
    return ('#') + (g | (b << 8) | (r << 16)).toString(16);
}

export default hexBrightnessPercentage 