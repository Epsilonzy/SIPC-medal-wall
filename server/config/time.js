const setOverTime = (hours = 24) => {
    let now = new Date();
    let number = hours * 60 * 60 * 1000;
    return now.getTime() + number;
}

const isOverTime = (time) => {
    let now = new Date();
    if (time > now) {
        //未过期
        return false;
    } else {
        //已过期
        return true;
    }
}

module.exports = {
    setOverTime: setOverTime,
    isOverTime: isOverTime
}