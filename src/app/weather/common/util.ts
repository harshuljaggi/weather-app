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
};

// Returns compass like direction values for wind direction for input degree
export const getWindDirection = (degree: any) => {
  const deg = parseFloat(degree);
  let windDir = "";
  if (deg >= 0 && deg < 11.25) {
    windDir = "N";
  } else if (deg >= 11.25 && deg < 33.75) {
    windDir = "NNE";
  } else if (deg >= 33.75 && deg < 56.25) {
    windDir = "NE";
  } else if (deg >= 56.25 && deg < 78.75) {
    windDir = "ENE";
  } else if (deg >= 78.75 && deg < 101.25) {
    windDir = "E";
  } else if (deg >= 101.25 && deg < 123.75) {
    windDir = "ESE";
  } else if (deg >= 123.75 && deg < 146.25) {
    windDir = "SE";
  } else if (deg >= 146.25 && deg < 168.75) {
    windDir = "SSE";
  } else if (deg >= 168.75 && deg < 191.25) {
    windDir = "S";
  } else if (deg >= 191.25 && deg < 213.75) {
    windDir = "SSW";
  } else if (deg >= 213.75 && deg < 236.25) {
    windDir = "SW";
  } else if (deg >= 236.25 && deg < 258.75) {
    windDir = "WSW";
  } else if (deg >= 258.75 && deg < 281.25) {
    windDir = "W";
  } else if (deg >= 281.25 && deg < 303.75) {
    windDir = "WNW";
  } else if (deg >= 303.75 && deg < 326.25) {
    windDir = "NW";
  } else if (deg >= 326.25  && deg < 348.75) {
    windDir = "NNW";
  } else if (deg >= 348.75 && deg <= 360.00) {
    windDir = "N";
  }
  return windDir;
};

// To convert first letter of a string to uppercase
export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);