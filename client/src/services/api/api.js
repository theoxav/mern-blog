class ApiService {
  static async request(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(endpoint, options);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Request to ${endpoint} failed`);
    }

    return data;
  }
}

export default ApiService;
