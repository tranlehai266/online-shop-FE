import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { useSelector } from "react-redux";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};
export const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const VERIFY = "AUTH.VERIFY_SUCCESS";
// const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload.user,
      };
    case VERIFY:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // case UPDATE_PROFILE:
    //   return {
    //     ...state,
    //     user: { ...state.user, ...action.payload },
    //   };
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const updatedProfile = useSelector((state) => state.user.updatedProfile);
  // console.log("76", updatedProfile);

  // useEffect(() => {
  //   if (updatedProfile) {
  //     dispatch({
  //       type: UPDATE_PROFILE,
  //       payload: updatedProfile,
  //     });
  //   }
  // }, [updatedProfile]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("/users/profile");
          const user = response.data.data;
          console.log("profile", user);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", {
      email,
      password,
    });
    const { user, accessToken } = response.data.data;
    console.log("user", response.data.data);
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };
  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users/register", {
      name,
      email,
      password,
    });
    const { token } = response.data.data;
    const message = response.data.message;
    window.localStorage.setItem("tokenRegister", token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user: null },
    });
    callback(message);
  };

  const verify = async ({ code, token }, callback) => {
    const response = await apiService.post("/users/verify-code", {
      code,
      token,
    });
    const { user } = response.data.data;
    const message = response.data.message;
    dispatch({
      type: VERIFY,
      payload: { user },
    });

    callback(message);
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, verify, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
