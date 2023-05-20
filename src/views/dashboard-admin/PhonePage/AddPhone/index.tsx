import { Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/system';
import { UN_AUTHORIZED } from 'constant/authorization';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { addNewPhone } from 'store/slices/phone';
import styled from 'styled-components';
import IBreadcrumsCustom from 'ui-component/breadcrums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

export default function AddPhone() {

    const scriptedRef = useScriptRef();
    const theme = useTheme();
    let navigate = useNavigate()

    return (
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
                        <img style={{ width: '100%' }} src='/assets/phone/iphone13/main-iphone13.jpg' alt='image-phone' />
                    </GridImage>
                    <GridInfo>
                        <Formik
                            initialValues={{
                                nameProduct: 'Iphone',
                                yearOfManufacture: '2023',
                                price: 12000000,
                                docs: 'Iphone',
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
                                                Thêm mới
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