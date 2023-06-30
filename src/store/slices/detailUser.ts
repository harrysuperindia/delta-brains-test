// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStatePropsV2 } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStatePropsV2['detailUser'] = {
    error: null,
    user: [],
    userDetail: {},
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USER
        getUserSuccess(state, action) {
            state.user = action.payload;
        },
        // GET DETAIL USER
        getDetailUserSuccess(state, action) {
            state.userDetail = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDetailUser() {
    return async () => {
        try {
            const response = await axios.get('/user');
            dispatch(slice.actions.getUserSuccess(response.data.user));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUserDetail(username: any) {
    return async () => {
        try {
            const response = await axios.get(`/profiles/${username}`);
            dispatch(slice.actions.getDetailUserSuccess(response.data.profile));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}