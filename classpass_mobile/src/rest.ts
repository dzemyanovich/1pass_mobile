export function post<T, Y>(url: string, data: T): Promise<Y> {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function get<T, Y>(url: string, data: T): Promise<Y> {
  const params = new URLSearchParams(data as URLSearchParams);

  return request(`${url}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const text = await response.text();
  const responseData: T = text && JSON.parse(text);
  return responseData;
}
