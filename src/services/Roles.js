class Roles {
	static async createRole(roleObject, domain_name) {
		const token = sessionStorage.kctoken;
		const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${domain_name
			}/roles`;
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(roleObject),
		});
		
		if (response.ok) {
			return response;
		} else {
			throw new Error('Role could not be created.');
		}
	}

	static async getRoles(domain_name) {
		const token = sessionStorage.kctoken;
		const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${domain_name
			}/roles`;
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
			throw new Error('Roles could not be fetched.');
		}
	}
}


export default Roles;
