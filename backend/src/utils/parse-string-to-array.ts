export const parseStringToArray = function(stringToArray: String): Array<String>{
  return stringToArray.split(',').map((i) => i.trim());
}