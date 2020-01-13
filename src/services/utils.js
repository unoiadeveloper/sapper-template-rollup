/**
 * Get Distance in Km Using Lat-Lng
 * @param  {Object} starting
 * @param  {Object} ending
 * @returns {Number} distance
 */
const getDistanceFromLatLonInKm = (starting, ending) => {
  let lat1 = starting.lat;
  let lat2 = ending.lat;
  let lon1 = starting.lng;
  let lon2 = ending.lng;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
};

const getNearest = (arr, goal, starting) => {
  return arr.reduce((prev, curr) => {
    let prevDist = getDistanceFromLatLonInKm(starting, prev);
    let currDist = getDistanceFromLatLonInKm(starting, curr);
    return (Math.abs(currDist - goal) < Math.abs(prevDist - goal) ? curr : prev);
  })
}


export { getDistanceFromLatLonInKm, deg2rad, getNearest }
