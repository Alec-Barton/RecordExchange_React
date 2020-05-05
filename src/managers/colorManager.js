
function hexBrightnessPercentage (hex, percent){  
    hex = hex.slice(1);
    var num = parseInt(hex,16);
    var baseLine = 0 

    //get highest of R, G, B
    //calc increment to add based on highest
    //apply equal amount to all three

    if (percent > 0) {
        baseLine = 255
    } else if (percent < 0){
        baseLine = 0
    } else {
        return hex
    }

    console.log(percent)
    var r = (num >> 16) + (Math.abs(baseLine - (num >> 16)) * percent)
    
    if (r > 255) {
        r = 255
    }
    else if  (r < 0) {
        r = 0
    }
    var b = ((num >> 8) & 0x00FF) + (Math.abs(baseLine - ((num >> 8) & 0x00FF)) * percent)
    if (b > 255) {
        b = 255
    }
    else if  (b < 0) {
        b = 0
    }
    var g = (num & 0x0000FF) + (Math.abs(baseLine - (num & 0x0000FF) * percent))
    if (g > 255) {
        g = 255
    }
    else if (g < 0) {
        g = 0
    }
    console.log((num >> 16), ((num >> 8) & 0x00FF), (num & 0x0000FF))
    console.log(r, g, b)
    return ('#') + (g | (b << 8) | (r << 16)).toString(16);
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