import 'server-only';
import { v4 as uuidv4 } from 'uuid';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SessionPayload } from '@/types/session.type';

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1y')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function createSession(userId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + 365.25 * 24 * 3600; // 1 year
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt * 1000,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getUserSession() {
  const session = (await cookies()).get('session');

  if (session) {
    return await decrypt(session.value);
  }

  return null;
}

export async function getOrCreateUserSession() {
  const session = await getUserSession();

  if (!session) {
    await createSession(uuidv4());
    return await getUserSession();
  }

  return session;
}
