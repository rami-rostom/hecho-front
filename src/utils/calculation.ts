/* eslint-disable import/prefer-default-export */

/**
 * Function to transform duration in minutes
 * @param duration value in HH:mm:ss
 * @returns Return duration in minutes
 */
export const convertDurationToMin = (duration: string) => {
  if (duration) {
    const [heures, minutes, secondes] = duration
      .toString()
      .split(':')
      .map(Number);
    const durationInMin = heures * 60 + minutes + secondes / 60;

    // Fixe value with two decimals
    return durationInMin.toFixed(2);
  }
  return duration;
};

// ---------------------------------------------------------------------------//

/**
 * Function for calculating the speed of activity
 * @param duration value in minutes
 * @param distance value in kilometers
 * @returns Return speed in km/h
 */
export const speedCalcul = (duration: number, distance: number) => {
  const distanceInMeter = distance * 1000;
  const durationInSeconds = duration * 60;

  const speedResult = (distanceInMeter / durationInSeconds) * 3.6;

  // Return result with two decimals
  return speedResult.toFixed(2);
};

// ---------------------------------------------------------------------------//

/**
 * Function for calculating the pace of activity
 * @param duration value in HH:mm:ss format
 * @param distance value in kilometers
 * @returns Return pace in min/km
 */
export const paceCalcul = (duration: string, distance: number) => {
  // Split the duration into hours, minutes, and seconds
  const [hours, minutes, seconds] = duration.split(':').map(Number);

  // Convert hours, minutes, and seconds to total minutes
  const durationInMinutes = hours * 60 + minutes + seconds / 60;

  // Calculate the pace in minutes per kilometer
  const paceResult = durationInMinutes / distance;

  // Convert pace to minutes and seconds per kilometer
  const paceMinutes = Math.floor(paceResult);
  const paceSeconds = Math.round((paceResult - paceMinutes) * 60);

  // Format the result as a string "mm:ss" for pace per kilometer
  const paceFormatted = `${paceMinutes}:${
    paceSeconds < 10 ? '0' : ''
  }${paceSeconds}`;

  return paceFormatted;
};

// ---------------------------------------------------------------------------//

/**
 * Function to transform date into DAY-MONTH-YEAR format
 * @param oldFormatDate date in format YEAR-MONTH-DAY
 * @returns date in new format
 */
export const convertDateFormat = (oldFormatDate: string) => {
  const [year, month, day] = oldFormatDate.split('-');
  const newFormatDate = `${day}-${month}-${year}`;
  return newFormatDate;
};

// ---------------------------------------------------------------------------//

/**
 * Function to sum two durations in format HH:mm:ss
 * @param duration1 first duration in format HH:mm:ss
 * @param duration2 second duration in format HH:mm:ss
 * @returns
 */
export const sumDurations = (duration1: string, duration2: string) => {
  // Function to convert a duration HH:mm:ss in seconds
  const convertToSeconds = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(':');
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10)
    );
  };

  // Function to convert seconds in duration HH:mm:ss
  const convertToDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const format = (num: number) => (num < 10 ? `0${num}` : num);

    return `${format(hours)}:${format(minutes)}:${format(remainingSeconds)}`;
  };

  const seconds1 = convertToSeconds(duration1);
  const seconds2 = convertToSeconds(duration2);

  const totalSeconds = seconds1 + seconds2;

  return convertToDuration(totalSeconds);
};

// ---------------------------------------------------------------------------//

/**
 * Function to sub two durations in format HH:mm:ss
 * @param duration1 first duration in format HH:mm:ss
 * @param duration2 second duration in format HH:mm:ss
 * @returns
 */
export const subDurations = (duration1: string, duration2: string) => {
  // Function to convert a duration HH:mm:ss in seconds
  const convertToSeconds = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(':');
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10)
    );
  };

  // Function to convert seconds in duration HH:mm:ss
  const convertToDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const format = (num: number) => (num < 10 ? `0${num}` : num);

    return `${format(hours)}:${format(minutes)}:${format(remainingSeconds)}`;
  };

  const seconds1 = convertToSeconds(duration1);
  const seconds2 = convertToSeconds(duration2);

  const totalSeconds = seconds1 - seconds2;

  return convertToDuration(totalSeconds);
};
