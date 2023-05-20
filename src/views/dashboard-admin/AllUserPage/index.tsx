// material-ui
import React from 'react';
import { useDispatch, useSelector } from 'store';
import { getAllUsers } from 'store/slices/allUsers';
import { AllUserProfileV2 } from 'types/user-profile';
import StickyHeadTable from './table';
import { CircularProgress } from '@mui/material';

//import components

export default function ManageUser() {

    const [data, setData] = React.useState<AllUserProfileV2[]>([]);

    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.allUser);

    React.useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    React.useEffect(() => {
        setData(allUsers);
    }, [allUsers]);

    return (
        <div>
            {
                data?.length !== 0 ? <StickyHeadTable projectItem={data}/> : <CircularProgress />
            }
        </div>
    );
}
