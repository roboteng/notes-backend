import crypto from "crypto";

function randomHex(length: number) {
  return crypto.randomBytes(Math.floor(length / 2)).toString("hex");
}

export default randomHex;