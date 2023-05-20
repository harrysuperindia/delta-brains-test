import { Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IBreadcrumsCustom from 'ui-component/breadcrums';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { PhoneProfile } from 'types/phone';
import { useDispatch, useSelector } from 'store';
import { addNewPhone, getDetailPhone } from 'store/slices/phone';
import useScriptRef from 'hooks/useScriptRef';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { UN_AUTHORIZED } from 'constant/authorization';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPhone() {

    const { idPhone } = useParams();
    const scriptedRef = useScriptRef();
    const theme = useTheme();
    let navigate = useNavigate()

    const [data, setData] = React.useState<PhoneProfile>();

    const dispatch = useDispatch();
    const { detailPhone } = useSelector((state) => state.phone);

    React.useEffect(() => {
        dispatch(getDetailPhone(Number(idPhone)));
    }, [dispatch]);
    React.useEffect(() => {
        setData(detailPhone);
    }, [detailPhone]);

    return (
        <>
            {data?.id !== 0 && data !== undefined ?
                <>
                    <IBreadcrumsCustom profile="Trang chủ" mainProfile="Cập nhật điện thoại" link="/phone-page" />
                    <MainCard title={`Thông tin điện thoại`}
                    >
                        <Grid
                            container
                            spacing={gridSpacing}
                            sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
                        >
                        </Grid>
                        <CsGridContainer>
                            <GridImage>
                                <img style={{ width: '100%' }} src={data?.image} alt='image-phone' />
                            </GridImage>
                            <GridInfo>
                                <Formik
                                    initialValues={{
                                        nameProduct: data?.nameProduct,
                                        price: data?.price,
                                        docs: data?.docs,
                                        image: data?.image,
                                        yearOfManufacture: '2023',
                                        submit: null
                                    }}
                                    validationSchema={Yup.object().shape({
                                        nameProduct: Yup.string().max(255).required('Không được để trống'),
                                        yearOfManufacture: Yup.string().max(255).required('Không được để trống'),
                                        price: Yup.string().max(255).required('Không được để trống'),
                                        docs: Yup.string().max(255).required('Không được để trống')
                                    })}
                                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                        try {
                                            await addNewPhone(values.nameProduct, values.yearOfManufacture, values.price, values.docs);

                                            if (scriptedRef.current) {
                                                setStatus({ success: true });
                                                setSubmitting(false);
                                                navigate('/phone-page')
                                            }
                                        } catch (err: any) {
                                            const errMessage = err && err.message == UN_AUTHORIZED &&
                                                "Lỗi hệ thống"

                                            if (scriptedRef.current) {
                                                setStatus({ success: false });
                                                setErrors({ submit: errMessage });
                                                setSubmitting(false);
                                            }
                                        }
                                    }}
                                >
                                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                        <form noValidate onSubmit={handleSubmit} >
                                            <FormControl fullWidth error={Boolean(touched.nameProduct && errors.nameProduct)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-nameProduct-login">Tên sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-nameProduct-login"
                                                    type="nameProduct"
                                                    value={values.nameProduct}
                                                    name="nameProduct"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.nameProduct && errors.nameProduct && (
                                                    <FormHelperText error id="standard-weight-helper-text-nameProduct-login">
                                                        {errors.nameProduct}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-price-login">Giá sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-price-login"
                                                    type="price"
                                                    value={values.price}
                                                    name="price"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.price && errors.price && (
                                                    <FormHelperText error id="standard-weight-helper-text-price-login">
                                                        {errors.price}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <FormControl fullWidth error={Boolean(touched.docs && errors.docs)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-docs-login">Mô tả sản phẩm</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-docs-login"
                                                    type="docs"
                                                    value={values.docs}
                                                    name="docs"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                    multiline={true}
                                                    // sx={{minHeight:'100px'}}
                                                />
                                                {touched.docs && errors.docs && (
                                                    <FormHelperText error id="standard-weight-helper-text-docs-login">
                                                        {errors.docs}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <Box sx={{ mt: 2 }}>
                                                <AnimateButton>
                                                    <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                                        Cập nhật
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                            {errors.submit && (
                                                <Box sx={{ mt: 3 }}>
                                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                                </Box>
                                            )}
                                        </form>
                                    )}
                                </Formik>
                            </GridInfo>
                        </CsGridContainer>
                    </MainCard>
                </>
                :

                <CircularProgress />
            }

        </>
    );
};

const CsGridContainer = styled(Grid)`
    margin-top: 2rem;
    display: flex;
`
const GridImage = styled(Grid)`
width: 40%;
`
const GridInfo = styled(Grid)`
width: 60%;

`