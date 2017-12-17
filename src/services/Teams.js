class Teams {
  static async getTeams(domainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${
      process.env.REACT_APP_AUTH_URL
    }/admin/realms/${domainName}/groups`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Teams could not be fetched.');
    }
  }

  static async createTeam(teamObject) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${sessionStorage.currentdomainName}/groups`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamObject),
      }
    );
    if (response.status === 201) {
      // var responseHeader = response.headers.get('Location');
      // var clientId = responseHeader.substr(responseHeader.length - 36, 36);
      return response;
    } else if (response.status === 409) {
      throw new Error('Team name already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

}
export default Teams;
