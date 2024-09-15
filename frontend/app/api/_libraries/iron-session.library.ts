import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';

interface SessionData {
  accessToken: string | null;
}

const ironSessionConfig: SessionOptions = {
  password: process.env.FRONTEND_COOKIE_SECRET || '',
  cookieName: 'session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // set this to false in local (non-HTTPS) development
    sameSite: 'lax', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax
    path: '/',
    ttl: 0,
  },
};

if (process.env.NODE_ENV !== 'production') {
  console.log('[INFO] Running cookies in insecure mode.');
}

export async function getSessionData(key: keyof SessionData) {
  const session = await getIronSession<SessionData>(
    cookies(),
    ironSessionConfig,
  );
  console.log('[Iron Session] Get All: ', session);
  return session[key];
}

export async function setSessionData(key: keyof SessionData, value: any) {
  const session = await getIronSession<SessionData>(
    cookies(),
    ironSessionConfig,
  );
  session[key] = value;
  await session.save();
  console.log('[Iron Session] New session: ', session);
}

export async function destroySession() {
  const session = await getIronSession<SessionData>(
    cookies(),
    ironSessionConfig,
  );
  session.destroy();
}
