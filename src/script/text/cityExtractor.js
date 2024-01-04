// cityExtractor.js
export function extractCityOrCounty(address) {
  const regex = /[\S]+[시군](?=\s|$)/;
  const match = address.match(regex);
  return match ? match[0] : '';
}
