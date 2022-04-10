import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from './loginReducer';
import {LoginParamsType} from '../../api/todolists-api';
import {AppRootStateType} from '../../app/store';
import {Navigate} from 'react-router-dom';


export const Login = () => {
    const dispatch = useDispatch();
    const isAuth=useSelector<AppRootStateType,boolean>((state) => state.login.isAuth);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType,'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'password must be more then 2 characters';
            }
            return errors;
        },
        /* validationSchema: Yup.object({

             password: Yup.string()
                 .min(3, 'Must be 3 characters or more')
                 .required('Required'),
             email: Yup.string().email('Invalid email address').required('Required'),
         }),*/
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(setLogin(values));
            formik.resetForm();
        },
    });
    if(isAuth)return <Navigate to={'/'}/>
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email:  lelik21212121@gmail.com</p>
                        <p>Password: enter_free</p>
                    </FormLabel>

                     <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox
                                {...formik.getFieldProps('rememberMe')}
                            />
                        }/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

