type Rate = {
  count: number;
  lastRequest: number;
};

const rateMap = new Map<string, Rate>();

export function rateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const data = rateMap.get(ip);

  if (!data) {
    rateMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  if (now - data.lastRequest > windowMs) {
    rateMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  if (data.count >= limit) {
    return false;
  }

  data.count++;
  return true;
}