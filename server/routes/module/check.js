const checkGetMedalsFormat = (obj) => {
    let checkList = ["medalId", "medalName", "content", "imgUrl", "weight"],
        isWhole = true;
    checkList.forEach(item => {
        if (typeof obj[item] === "undefined" && obj[item] == "") {
            isWhole = false;
        }
    })
    if (isWhole) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    checkGetMedalsFormat: checkGetMedalsFormat
}