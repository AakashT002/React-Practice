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
}

export default Domains;
