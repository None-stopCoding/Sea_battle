/**
 * Конвертация врменной метки в отформатированый вывод даты
 * @param unixTimestamp
 * @returns {string}
 */
const convertUnix = unixTimestamp => {
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date(unixTimestamp);
    let year = date.getFullYear();
    let month = months_arr[date.getMonth()];
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    return month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
};

export default convertUnix;