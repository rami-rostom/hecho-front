/* eslint-disable import/prefer-default-export */

// Function to transform duration in minutes
export const convertDurationToMin = (duration: string) => {
  if (duration) {
    const [heures, minutes, secondes] = duration.split(':').map(Number);
    const durationInMin = heures * 60 + minutes + secondes / 60;

    // Fixe value with two decimals
    return durationInMin.toFixed(2);
  }
  return duration;
};

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

/**
 * Function for calculating the pace of activity
 * @param duration value in minutes
 * @param distance value in kilometers
 * @returns Return pace in min/km
 */
export const paceCalcul = (duration: number, distance: number) => {
  const paceResult = duration / distance;

  // Return result with two decimals
  return paceResult.toFixed(2);
};

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
