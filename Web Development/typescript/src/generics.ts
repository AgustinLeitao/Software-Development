namespace generics {
  /* Interface contraints */

  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    // Using extends allows us to constrain the generic type.
    console.log(arg.length);
    return arg;
  }

  /* Generic interface as function type */

  interface KeyValueProcessor<T, U> {
    (key: T, val: U): void;
  }

  function processNumKeyPairs(key: number, value: number): void {
    console.log('processNumKeyPairs: key = ' + key + ', value = ' + value);
  }

  function processStringKeyPairs(key: number, value: string): void {
    console.log('processStringKeyPairs: key = ' + key + ', value = ' + value);
  }

  let numKVProcessor: KeyValueProcessor<number, number> = processNumKeyPairs;
  numKVProcessor(1, 12345); //Output: processNumKeyPairs: key = 1, value = 12345

  let strKVProcessor: KeyValueProcessor<number, string> = processStringKeyPairs;
  strKVProcessor(1, 'Bill'); //Output: processStringKeyPairs: key = 1, value = Bill
}
