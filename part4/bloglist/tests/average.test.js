
//const averageUtils = require('../utils/average')
const average = (array) => {
  if (array.length === 0) return 0;
  const sum = array.reduce((sum, item) => sum + item, 0);
  return sum / array.length;
};

//const average = require('../utils/average')

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
module.exports = average;