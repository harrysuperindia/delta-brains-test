import React, { Ref } from 'react';

// material-ui
import { Button, Card, CardContent, CardContentProps, CardHeader, CardHeaderProps, CardProps, Divider, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import styled from 'styled-components';
import { KeyedObject } from 'types';

import AppsIcon from '@mui/icons-material/Apps';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
    border?: boolean;
    boxShadow?: boolean;
    children: React.ReactNode | string;
    style?: React.CSSProperties;
    content?: boolean;
    className?: string;
    contentClass?: string;
    contentSX?: CardContentProps['sx'];
    darkTitle?: boolean;
    sx?: CardProps['sx'];
    secondary?: CardHeaderProps['action'];
    shadow?: string;
    elevation?: number;
    title?: React.ReactNode | string;
    valueActive?: any;
    valueFind?:any;
}

const MainCardPhone = React.forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            valueActive,
            valueFind,
            ...others
        }: MainCardProps,
        ref: Ref<HTMLDivElement>
    ) => {
        const theme = useTheme();
        let navigate = useNavigate();

        const [valueTable, setValueTable] = React.useState(1)

        React.useEffect(() => {
            const isActive = localStorage.getItem('activeGrid')
            if(isActive === '1'){
                setValueTable(1)
            }
            if(isActive === '2'){
                setValueTable(2)
            }
        }, []);

        const handleGrid = () => {
            setValueTable(1);
            valueActive(1)
        localStorage.setItem('activeGrid', '1');
        };    
        const handleList = () => {
            setValueTable(2);
            valueActive(2)
        localStorage.setItem('activeGrid', '2');
        };   

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                    ':hover': {
                        boxShadow: boxShadow
                            ? shadow ||
                            (theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
                            : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                <CsGrid>
                    <CsGridTitle>
                        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
                        <CsButton variant="contained" onClick={()=>navigate('/phone-page/add')}>Thêm mới</CsButton>
                        <CsGridIconUp sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
                            <CsAppsIcon onClick={handleGrid} isActive={valueTable}/>
                            <CsFormatListBulletedIcon onClick={handleList} isActive={valueTable}/>
                        </CsGridIconUp>
                    </CsGridTitle>
                    <CsGridFind>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-find">Tìm kiếm</InputLabel>
                            <OutlinedInput
                                type="text"
                                name="find"
                                inputProps={{}}
                                onChange={(e)=>valueFind(e.target.value)}
                            />
                        </FormControl>
                        <CsGridIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
                            <CsAppsIcon onClick={handleGrid} isActive={valueTable}/>
                            <CsFormatListBulletedIcon onClick={handleList} isActive={valueTable}/>
                        </CsGridIcon>
                    </CsGridFind>
                </CsGrid>
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

export default MainCardPhone;

const CsGrid = styled(Grid)`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 769px){
        flex-direction: column;
    }
`
const CsGridFind = styled(Grid)`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    @media screen and (max-width: 769px){
        padding: 10px;
        flex-direction: column;
    }
`
const CsGridIcon = styled(Grid)`
    display: none;
    justify-content: space-between;
    @media screen and (min-width: 769px){
        margin-right: 30px;
        display: flex;
    }
`
const CsGridIconUp = styled(Grid)`
    display: flex;
    justify-content: space-between;
    margin-right: 30px;
    @media screen and (min-width: 769px){
        margin-right: 30px;
        display: none;
    }
`
const CsGridTitle = styled(Grid)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 769px){
        margin-right: 30px;
    }
`
const CsAppsIcon = styled(AppsIcon)<{isActive?:number}>`
    color: ${({ isActive}) => isActive === 1 ? '#2196F3' : ''};
    transform: scale(1.5);
    &:hover{
        transform: scale(1.7);
    }
`
const CsFormatListBulletedIcon = styled(FormatListBulletedIcon)<{isActive?:number}>`
    color: ${({ isActive}) => isActive === 2 ? '#2196F3' : ''};
    transform: scale(1.5);
    &:hover{
        transform: scale(1.7);
    }
`
const CsButton = styled(Button)`
    height: 40px;
    @media screen and (max-width: 769px){
        margin-right: 250px;
    }
    @media screen and (max-width: 669px){
        margin-right: 20px;
    }
`