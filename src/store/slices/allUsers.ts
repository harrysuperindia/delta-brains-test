// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStatePropsV2 } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStatePropsV2['allUsers'] = {
    error: null,
    allUsers: [],
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
        getAllUsersSuccess(state, action) {
            state.allUsers = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllUsers() {
    return async () => {
        try {
            const response = await axios.get('/users');
            dispatch(slice.actions.getAllUsersSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
