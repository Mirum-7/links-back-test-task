declare global {
  interface BigInt {
    toJSON(): { $bigint: string };
  }
}

// Add to json support for BigInt
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export {};
