const DEFAULT_BASE_URL = 'http://localhost:8081';

export function getBaseUrl() {
  return (process.env.REACT_APP_API_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
}

export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * @param {string} path e.g. "/productos"
 * @param {{method?: string, body?: any, token?: string, headers?: Record<string,string>}} opts
 */
export async function apiRequest(path, opts = {}) {
  const {
    method = 'GET',
    body,
    token,
    headers = {},
  } = opts;

  const storedToken = (token === undefined || token === null)
    ? (window?.localStorage?.getItem('modaUrbana.jwt') || '')
    : token;


  const url = `${getBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`;

  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (storedToken) {
    finalHeaders.Authorization = `Bearer ${storedToken}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const msg = typeof payload === 'string'
      ? payload
      : (payload && (payload.message || payload.error)) || `HTTP ${res.status}`;
    throw new ApiError(msg, { status: res.status, details: payload });
  }

  return payload;
}