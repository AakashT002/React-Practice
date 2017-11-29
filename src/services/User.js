class User {
  static async add(realm, userObj) {
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${realm}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(userObj),

    });
    if (!response.ok) {
      var responseHeader = response.headers.get('Location');
      return responseHeader;
    } else {
      responseHeader = response.headers.get('Location');
      return responseHeader;
    }
  }

  static async delete(str, index) {
    const token = sessionStorage.kctoken;
    const response = await fetch(str, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    if (response.ok) {
      return index;
    }
    else {
      throw new Error('User cannot be added.');
    }
  }

  static async handleUserValidation(userName, realmName) {
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${realmName}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const users = await response.json();
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === userName) {
          return false;
        }
      }
      return true;
    } else {
      throw new Error('User already exists.');
    }
  }

  static async getRoles() {
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/realms/${process.env.REACT_APP_AUTH_REALM}/protocol/openid-connect/userinfo`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      var roleId = data['sub'];
      const API_URL_role = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_AUTH_REALM}/users/` + roleId + '/role-mappings';
      const token_role = sessionStorage.kctoken;
      const response_role = await fetch(API_URL_role, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token_role,
        },
      });
      if (response_role.ok) {
        const data_role = await response_role.json();
        var obj_data = data_role['realmMappings'];
        var rolenames = [];
        for (var i = 0; i < obj_data.length; i++) {
          if (obj_data[i].name !== 'uma_authorization' && obj_data[i].name !== 'offline_access') {
            rolenames.push(obj_data[i].name);
          }
        }
        return rolenames;
      }
      else {
        throw new Error('User Role cannot be fetched');
      }
    } else {
      throw new Error('User Role cannot be fetched');
    }
  }

  static async handleEmailValidation(email, realmName) {
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${realmName}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      const users = await response.json();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return false;
        }
      }
      return true;
    } else {
      throw new Error('Client already exists.');
    }
  }
}

export default User;
