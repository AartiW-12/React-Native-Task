import api from '../api'

export const signUp = async(userData) => {
    const response = await api.get('/users')

    const existingUser = response.data.find((item) => item.email === userData.email || item.mobileNumber === userData.mobileNumber)

    if(existingUser) throw new Error("User Already Exist")
    
    const newUser = await api.post('/users', userData)
    return newUser.data
}

export const login = async (email, password) => {
    const response = await api.get("/users");

    const user = response.data.find(
        (item) =>
            item.email === email &&
            item.password === password
    );

    if (!user) {
        throw new Error("Invalid email or password");
    }

    return user;
};