import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ inputValue, password }, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");

      const user = response.data.find(
        (item) =>
          (item.email === inputValue ||
            item.mobileNumber === inputValue) &&
          item.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const token = `token_${Date.now()}`;

      await AsyncStorage.setItem("Token", token);
      await AsyncStorage.setItem("User", JSON.stringify(user));

      return {
        user,
        token,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// SIGNUP
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");

      const existingUser = response.data.find(
        (item) =>
          item.email === userData.email ||
          item.mobileNumber === userData.mobileNumber
      );

      if (existingUser) {
        throw new Error("User Already Exists");
      }

      const newUser = await api.post("/users", userData);

      const token = `token_${Date.now()}`;

      await AsyncStorage.setItem("Token", token);
      await AsyncStorage.setItem(
        "User",
        JSON.stringify(newUser.data)
      );

      return {
        user: newUser.data,
        token,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "auth/updateProfileUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/${userId}`,
        userData
      );

      await AsyncStorage.setItem(
        "User",
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const resetPasswordUser = createAsyncThunk(
  "auth/resetPasswordUser",
  async ({ userId, password }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}`, {
        password,
      });

      const storedUser = JSON.parse(
        await AsyncStorage.getItem("User")
      );

      if (storedUser) {
        storedUser.password = password;

        await AsyncStorage.setItem(
          "User",
          JSON.stringify(storedUser)
        );
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
    },

    restoreSession(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          password: action.payload.password,
        };
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;

export default authSlice.reducer;