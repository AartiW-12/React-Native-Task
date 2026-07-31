import api from '../api'

export const signUp = async(userData) => {
    const response = await api.get('/users')

    const existingUser = response.data.find((item) => item.email === userData.email || item.mobileNumber === userData.mobileNumber)

    if(existingUser) throw new Error("User Already Exist")
    
    const newUser = await api.post('/users', userData)
    return newUser.data
}

export const login = async (inputValue, password) => {
    const response = await api.get("/users");

    const user = response.data.find(
        (item) =>
            (item.email === inputValue || item.mobileNumber === inputValue) &&
            item.password === password
    );

    if (!user) {
        throw new Error("Invalid email or password");
    }

    return user;
};

export const updateProfile = async(userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData)

    return response.data
}

export const resetPassword = async (userId, password) => {
    const response = await api.put(`/users/${userId}`, {
        password,
    });
    return response.data;
};