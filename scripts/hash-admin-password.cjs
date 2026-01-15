#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const bcrypt = require("bcryptjs");

const [rawPassword] = process.argv.slice(2);

if (!rawPassword) {
  console.error("Usage: node scripts/hash-admin-password.js <plaintext-password>");
  process.exit(1);
}

const hashed = bcrypt.hashSync(rawPassword, 10);
console.log(hashed);
