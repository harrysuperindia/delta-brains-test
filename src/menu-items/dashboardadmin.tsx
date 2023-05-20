// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDeviceMobile } from '@tabler/icons';
import { OverrideIcon } from 'types';

// constant
const icons = {
    IconDeviceMobile,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
    id: string;
    title: React.ReactNode | string;
    type: string;
    children: {
        id: string;
        title: React.ReactNode | string;
        type: string;
        url: string;
        icon: OverrideIcon;
        breadcrumbs: boolean;
    }[];
}

const dashboardAdmin: DashboardMenuProps = {
    id: 'dashboard-admin',
    title: '',
    type: 'group',
    children: [
        {
            id: 'phone-page',
            title: <FormattedMessage id="Điện thoại" />,
            type: 'item',
            url: '/phone-page',
            icon: icons.IconDeviceMobile,
            breadcrumbs: false
        },
    ]
};

export default dashboardAdmin;
