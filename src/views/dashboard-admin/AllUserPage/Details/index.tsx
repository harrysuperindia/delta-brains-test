import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Formik } from "formik";
import useScriptRef from "hooks/useScriptRef";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "store";
import { gridSpacing } from "store/constant";
import { getUserDetail } from "store/slices/detailUser";
import { UserProfileV2 } from "types/user-profile";
import IBreadcrumsCustom from "ui-component/breadcrums";
import MainCardV2 from "ui-component/cards/MainCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from 'yup';

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function DetailsUser(props: {
    [x: string]: any;
    projectItem?: any;

}) {
    const { _username } = useParams();
    console.log(_username);

    const scriptedRef = useScriptRef();
    const theme = useTheme();
    const [isActive, setActive] = React.useState(false)
    const [data, setData] = React.useState<UserProfileV2>({});

    const dispatch = useDispatch();
    const { userDetail } = useSelector((state) => state.detailUser);

    React.useEffect(() => {
        dispatch(getUserDetail(_username));
    }, [dispatch, _username]);
    React.useEffect(() => {
        setData(userDetail);
    }, [userDetail]);

    return (
        <>
            <IBreadcrumsCustom profile="Tất cả hồ sơ" mainProfile="Hồ sơ cá nhân" link="/all-users" />
            <MainCardV2 title={`Thông tin hồ sơ`}>
                <Grid
                    container
                    spacing={gridSpacing}
                    sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
                >
                </Grid>
                <Grid mt='2rem' container justifyContent='space-around'>
                    <Grid>
                        <Grid sx={{ width: '300px', height: '300px', borderRadius: '180px', overflow: 'hidden' }}>
                            <img src={data?.image} alt="Avata" style={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                    <Grid mt='2rem' sx={{ width: '50%' }}>
                        <Formik
                            initialValues={{
                                username: data?.username,
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string().max(255).required('Bắt buộc nhập')
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    // await login(values.email, values.password);

                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                        // setActive(false)
                                    }
                                } catch (err: any) {
                                    const errMessage = err &&
                                        " Thất bại !"

                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: errMessage });
                                        setSubmitting(false);
                                    }
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px' }}>
                                    <FormControl disabled={!isActive} error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput, width: '60%' }}>
                                        <InputLabel htmlFor="outlined-adornment-email-login">Họ và tên</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email-login"
                                            type="text"
                                            value={values.username}
                                            name="username"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                        {touched.username && errors.username && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.username}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <Box sx={{ mt: 2 }}>
                                        {isActive ?
                                            <AnimateButton>
                                                <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                                    Hoàn tất
                                                </Button>
                                            </AnimateButton>
                                            :
                                            <AnimateButton>
                                                <Button color="secondary" onClick={() => setActive(true)} disabled={isSubmitting} fullWidth size="large" variant="contained">
                                                    Thay đổi
                                                </Button>
                                            </AnimateButton>
                                        }
                                    </Box>
                                    {errors.submit && (
                                        <Box sx={{ mt: 3 }}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Box>
                                    )}
                                </form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </MainCardV2>
        </>
    );
}
