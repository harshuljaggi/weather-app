// Returns numeric temperature after rounding off the decimal part
export const formatTemp = (temp: any) => Math.round(temp);


// Returns object containing date value converted from Unix Timestamp
export const getDate = (unixTimestamp: any) => {
    // Months array
    const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    const date = new Date(unixTimestamp*1000);
   
    // Year
    const year = date.getFullYear();
    // Month
    const month = months_arr[date.getMonth()];
    // Day
    const day = date.getDate();
    // Hours
    const hours = date.getHours();
    // Minutes
    const minutes = "0" + date.getMinutes();
    // Seconds
    const seconds = "0" + date.getSeconds();
    const minutesPart = minutes.substr(-2), secondsPart = seconds.substr(-2);

    // Display date time in DD-MM-YYYY h:m:s format
    // const convdataTime = day + '-' + month + '-' + year +' ' + hours + ':' + minutesPart + ':' + secondsPart;
    const dayMonth = day + ' ' + month.toUpperCase();
    return {
      dayMonth: dayMonth,
      day,
      month,
      year,
      hours,
      minutesPart,
      secondsPart
    };
}