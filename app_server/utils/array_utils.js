class ArrayUtils {
  flatten(array) {
    return [].concat(...array);
  }
}
module.exports = new ArrayUtils()