export function parseStringToArray (stringToArray: String): Array<String>{
  return stringToArray.split(',').map((i) => i.trim());
}