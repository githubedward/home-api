/**
 *
 * @param {integer} home
 * @param {integer} curr
 * @return {bool} if home
 */
export const isHome = (home, curr) => {
  const value = curr - home;
  return -200 < value && value < 200;
};
