class Clients {
  static async get(currentdomainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${currentdomainName}/clients`;
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
      throw new Error('Clients could not be fetched.');
    }
  }
}

export default Clients;