import { SignJWT, jwtVerify } from 'jose';
const secret = new TextEncoder().encode('super-secret-key-12345678'); // غيرها!

export async function createToken(user) {
  return await new SignJWT({ id: user.id, username: user.username, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}