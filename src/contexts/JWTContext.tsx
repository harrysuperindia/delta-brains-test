import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

// types
import { KeyedObject } from 'types';
import { InitialLoginContextProps, JWTContextType } from 'types/auth';
import { AUTH_API } from '_apis/api-endpoint';
import { configAuth, dataLogin } from 'constant/data-delta-brain';

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const user = {};
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user
                    }
                });
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    // const response = await axios.get('/user/me');
                    const user = {};
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post(AUTH_API.SignIn, { email, password });
        let status = 401

        if(email === configAuth.email && password === configAuth.password){
            status = 201
        }
        const resLogin = dataLogin.filter((data:any) => data.email === email);

        if (status === 201) {
            // const accessToken = response.data.user.token;
            const accessToken = resLogin[0]?.token;
            setSession(accessToken);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                }
            });
        } else {
            throw new Error(response.data?.message)
        }
    };

    const register = async (email: string, password: string, name: string, phoneNumber: string) => {
        // todo: this flow need to be recode as it not verified
        // const response = await axios.post(AUTH_API.SignUp, {
        //     email,
        //     password,
        //     name,
        //     phoneNumber,
        //     // securityQuestions
        // });
        // let users = response?.data?.data || {};

        // // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
        // //     const localUsers = window.localStorage.getItem('users');
        // //     users = [
        // //         ...JSON.parse(localUsers!),
        // //         {
        // //             email,
        // //             password,
        // //             name,
        // //             phoneNumber
        // //         }
        // //     ];
        // // }

        // window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = (email: string) => console.log(email);

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

export default JWTContext;