export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const formatDateTime = (date: Date): string => {
  const dayOfMonth = date.getDate();
  const dayOfWeek  = date.getDay();
  const monthIndex = date.getMonth();
  const year       = date.getFullYear();
  let hours        = date.getHours();
  let minutes: any = date.getMinutes();

  const period = hours >= 12 ? 'pm' : 'am';
  hours        = hours % 12;
  hours        = hours ? hours : 12;
  minutes      = minutes < 10 ? '0' + minutes : minutes;
  const time   = `${hours}:${minutes} ${period}`;


  return `${DAYS[dayOfWeek]} ${MONTHS[monthIndex]} ${dayOfMonth}, ${year} at ${time}`;
};

export const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const parseDateTime = (dateTime: string): string => {
  if (!dateTime) return '';

  const parts = dateTime.split('-')
  const time = parts[2].split('T')[1].split('.')[0];
  const year = parts[0];
  const month = parts[1];
  const day = parts[2].split('T')[0];

  return `${month}-${day}-${year} ${time24To12(time)}`;
}

// credit: https://stackoverflow.com/a/13899011
export const time24To12 = (time: any): any => {
  if (!time) return '';
  // Check correct time format and split into components
  time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time.pop(); // remove trailing ":00"
    time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
};