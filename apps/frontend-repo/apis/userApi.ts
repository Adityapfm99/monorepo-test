/// Define UserData interface
export interface UserData {
  email: string;
  name: string;
  age?: number; 
}

const BASE_URL = 'http://127.0.0.1:5001/backend-ebuddy-dd012/us-central1/api';
export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    console.log("Payload being sent to login API:", { email, password });

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log("Error response from login API:", errorResponse);
      throw new Error(errorResponse.message || "Login failed");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw error;
  }
};

export const fetchUserData = async (email: string): Promise<UserData> => {
  try {
    const response = await fetch(`${BASE_URL}/user?email=${email}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to fetch user data');
    }

    const data = await response.json();
    return data as UserData;
  } catch (error: any) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};

// Update user data
export const updateUserData = async (userData: { email: string; name: string; age: number; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to update user data');
    }

    console.log('User data updated successfully');
  } catch (error: any) {
    console.error('Error updating user data:', error.message);
    throw error;
  }
};

// Fetch user info by email
export const fetchUserInfo = async (email: string): Promise<UserData> => {
  try {
    const response = await fetch(`${BASE_URL}/user?email=${email}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to fetch user information');
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data as UserData;
  } catch (error: any) {
    console.error('Error fetching user info:', error.message);
    throw error;
  }
};

export const registerUser = async (email: string, name: string, age: number, password:string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, age, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to register user');
    }

    console.log('User registered successfully');
  } catch (error: any) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};
