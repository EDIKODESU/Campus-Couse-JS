exports.firstUpper = function firstUpper(str) {
    if(str == '' || str == null){
        return '';
    }
    str = str.trim();
    str = str[0].toUpperCase() + str.substring(1).toLowerCase();
    return str;
}
