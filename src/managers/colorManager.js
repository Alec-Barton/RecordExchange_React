
function darkenHex (hex, amount){  
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

export default darkenHex