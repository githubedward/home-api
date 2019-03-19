import geolib from "geolib";

/**
 *
 * @param {integer} home
 * @param {integer} curr
 * @return {bool} if home
 */
export const isHome = (home, curr) => {
  const value = geolib(curr, home, 1);
  return value < 200;
};
