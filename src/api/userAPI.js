import httpClient from './httpClient';

const parseLinkHeaderForNextSince = (linkHeader) => {
  if (!linkHeader) return null;
  const parts = linkHeader.split(',');
  for (const part of parts) {
    const [urlPart, relPart] = part.split(';');
    if (!urlPart || !relPart) continue;
    const rel = relPart.trim().replace(/rel="(.*)"/, '$1');
    if (rel === 'next') {
      const url = urlPart.trim().slice(1, -1);
      try {
        const u = new URL(url);
        const sinceParam = u.searchParams.get('since');
        if (sinceParam) return Number(sinceParam);
      } catch (_) {
        return null;
      }
    }
  }
  return null;
};

export const listUsers = async ({ since = 0, perPage = 30 } = {}) => {
  const res = await httpClient.get('/users');
  const users = res.data;
  const headerNextSince = parseLinkHeaderForNextSince(res.headers?.link);
  const hasMore = Array.isArray(users) ? users.length === perPage || Boolean(headerNextSince) : false;
  return { users, nextSince: headerNextSince, hasMore };
};

export const getNextSinceFromUsers = (users) => {
  if (!Array.isArray(users) || users.length === 0) return 0;
  const last = users[users.length - 1];
  return last?.id ?? 0;
};

export default listUsers;
