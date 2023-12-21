import bcrypt from 'bcrypt';

export async function encrypt(password, saltRounds) {
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (err) {
    console.err('Error hashing password', err);
    return err;
  }
}

export async function compare(plainTextPassword, hashPassword) {
  const isValid = await bcrypt.compare(plainTextPassword, hashPassword);
  return isValid;
}
