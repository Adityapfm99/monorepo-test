export const fetchUserData = async (token: string) => {
    const response = await fetch('/api/fetch-user-data', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };
  
  export const updateUserData = async (token: string, userData: any) => {
    const response = await fetch('/api/update-user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  };
  