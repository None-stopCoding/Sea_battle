const convertTime = (time) => {
    let hours = 0, minutes = 0, seconds = 0;

    hours = Math.floor(time / 3600);
    minutes = Math.floor((time - hours * 3600) / 60);
    seconds = time - (hours * 3600 + minutes * 60);

    return {
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0")
    }
};

export default convertTime;