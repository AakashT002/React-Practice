const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms`;

class Domains {
  static async get() {
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Domains could not be fetched.');
    }
  }

  static async createDomain(domainObject) {
    const token = sessionStorage.kctoken;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(domainObject),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Domain could not be created.');
    }
  }

  static async validateDomain(domainName) {
    const getDomainUrl = `${API_URL}/${domainName}`;
    const token = sessionStorage.kctoken;

    const response = await fetch(getDomainUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const data = await response.ok;
      return data;
    } else {
      throw new Error('Domain already exists.');
    }
  }
}

export default Domains;
