declare global {
  interface BigInt {
    toJSON(): { $bigint: string };
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export {};
