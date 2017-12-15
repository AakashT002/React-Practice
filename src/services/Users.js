class Users {
  static async fetchUsers(realm) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realm}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Users could not be fetched.');
    }
  }
}

export default Users;
