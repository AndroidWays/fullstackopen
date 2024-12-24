// Additional test cases for reverse function

const reverse = (string) => {
  if (string === null || string === undefined) {
    return string; // Return null for null input and undefined for undefined input
  }
  return string.split('').reverse().join('');
}

test('reverse of empty string', () => {
    const result = reverse('');
    expect(result).toBe('');
});

test('reverse of mixed case string', () => {
    const result = reverse('ReAcT');
    expect(result).toBe('TcAeR');
});

test('reverse of string with spaces', () => {
    const result = reverse('hello world');
    expect(result).toBe('dlrow olleh');
});

test('reverse of null returns null', () => {
    const result = reverse(null);
    expect(result).toBe(null);
});

test('reverse of undefined returns undefined', () => {
    const result = reverse(undefined);
    expect(result).toBe(undefined);
});
