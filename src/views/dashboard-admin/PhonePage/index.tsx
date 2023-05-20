// material-ui
import { CircularProgress } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'store';
import { getAllPhone } from 'store/slices/phone';
import { PhoneProfile } from 'types/phone';
import StickyHeadTable from './table';

//import components

export default function PhonePage() {
    let newArr: PhoneProfile[] = []

    const dispatch = useDispatch();
    const { phone } = useSelector((state) => state.phone);
    
    const [data, setData] = React.useState<PhoneProfile[]>([]);

    React.useEffect(() => {
        dispatch(getAllPhone());
    }, [dispatch]);
    React.useEffect(() => {
        setData(phone);
    }, [phone]);

    return (
        <div>
            {
                data.length !== 0 ? <StickyHeadTable projectItem={data}/> : <CircularProgress />
            }
        </div>
    );
}
