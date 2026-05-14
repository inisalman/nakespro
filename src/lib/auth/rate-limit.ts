const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type LoginAttempt = {
  count: number;
  expiresAt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();

function currentAttempt(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);

  if (!attempt || attempt.expiresAt <= now) {
    const freshAttempt = { count: 0, expiresAt: now + WINDOW_MS };
    loginAttempts.set(key, freshAttempt);
    return freshAttempt;
  }

  return attempt;
}

export function isLoginRateLimited(key: string) {
  return currentAttempt(key).count >= MAX_ATTEMPTS;
}

export function recordFailedLogin(key: string) {
  const attempt = currentAttempt(key);
  attempt.count += 1;
}

export function clearLoginAttempts(key: string) {
  loginAttempts.delete(key);
}
