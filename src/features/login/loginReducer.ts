import {Dispatch} from 'redux';
import {authAPI, LoginParamsType, ResultCode} from '../../api/todolists-api';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setInitialized} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
    isAuth: false,
}
type AuthType = typeof initialState;

type AuthActionType =
    ReturnType<typeof setAuthLogin>
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setInitialized>

export const loginReducer = (state = initialState, action: AuthActionType): AuthType => {
    switch (action.type) {
        case 'SET_AUTH_LOGIN':
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
}

export const setAuthLogin = (isAuth: boolean) => ({type: 'SET_AUTH_LOGIN', isAuth} as const);

export const setLogin = (data: LoginParamsType) =>
    async (dispatch: Dispatch<AuthActionType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authAPI.login(data);

            if (res.data.resultCode === ResultCode.successful) {
                dispatch(setAuthLogin(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    };

export const getAuthMe = () =>
    async (dispatch: Dispatch<AuthActionType>) => {
        try {
            dispatch(setAppStatusAC('loading'));
            const res = await authAPI.getAuthMe();
            if (res.data.resultCode === ResultCode.successful) {
                dispatch(setAppStatusAC('succeeded'));
                dispatch(setAuthLogin(true));

            } else {
                handleServerAppError(res.data, dispatch);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
        }finally {
            dispatch(setInitialized(true));
        }
    }
export const setLoguot = () =>
    async(dispatch:Dispatch<AuthActionType>)=>{
    try{
        dispatch(setAppStatusAC('loading'))
        const res=await authAPI.logout();
        if(res.data.resultCode===ResultCode.successful){
            dispatch(setAuthLogin(false));
            dispatch(setAppStatusAC('succeeded'));
        }else {
            handleServerAppError(res.data,dispatch)
        }
    }catch (e:any) {
        handleServerNetworkError(e,dispatch)
    }
    }

