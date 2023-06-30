// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { dataPhone } from 'constant/data-delta-brain';
import { DefaultRootStatePropsV2 } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStatePropsV2['phone'] = {
    error: null,
    phone: [],
    detailPhone: {
        id: 0,
        nameProduct: '',
        yearOfManufacture: '',
        price: 0,
        image: '',
        docs: ''
    },
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PHONE
        getPhoneSuccess(state, action) {
            state.phone = action.payload;
        },
         // GET DETAIL PHONE
         getDetailPhoneSuccess(state, action) {
            state.detailPhone = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllPhone() {
    return async () => {
        try {
            dispatch(slice.actions.getPhoneSuccess(dataPhone));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDetailPhone(idPhone:number) {
    return async () => {
        try {
            const newData = dataPhone.filter((data:any) => data.id === idPhone);
            dispatch(slice.actions.getDetailPhoneSuccess(newData[0]));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDeletePhone(dataPhone:[], idPhone:number) {
    return async () => {
        try {
            const newData = dataPhone.filter((data:any) => data.id !== idPhone);
            dispatch(slice.actions.getPhoneSuccess(newData));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addNewPhone(nameProduct: any, yearOfManufacture:string, price: any, docs:any) {

    const newArr = {
        id: dataPhone.length + 1,
        nameProduct: nameProduct,
        yearOfManufacture: yearOfManufacture,
        price: price,
        image: dataPhone[0].image,
        docs: docs
    }
    const newValue = dataPhone.concat(newArr)
        return async () => {
            try {
            dispatch(slice.actions.getPhoneSuccess(newValue));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}