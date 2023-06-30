// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import phoneReducer from './slices/phone';
import detailUserReducer from './slices/detailUser';
import allUserReducer from './slices/allUsers';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';
import getListWaitingReducer from './slices/projectwaiting'
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: userReducer,
    phone: phoneReducer,
    detailUser: detailUserReducer,
    allUser: allUserReducer,
    menu: menuReducer,
    getlistprojectwaiting: getListWaitingReducer,
});
export default reducer;
