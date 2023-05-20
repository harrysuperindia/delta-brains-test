// material-ui
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { getDetailUser } from 'store/slices/detailUser';
import { UserProfile } from 'types/user-profile';

//import components

export default function ManageUser() {

    const [isStatus, setStatus] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const [data, setData] = React.useState<UserProfile[]>([]);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.detailUser);

    // React.useEffect(() => {
    //     dispatch(getDetailUser());
    // }, [dispatch]);
    // React.useEffect(() => {
    //     setData(user);
    // }, [user]);

    return (
        <div>
            {/* {
                !true ? <StickyHeadTable projectItem={dataUser}/> : <CircularProgress />
            } */}
        </div>
    );
}
