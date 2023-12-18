import {
    LOGIN_DETAIL,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    TOKEN,
    PROFILE,
    LOGOUT,
    PASSWORD_CONFIRMED,
    PASSWORD_CONFIRMED_ERROR,
    PASSWORD_UPDATED_ERROR,
    PASSWORD_UPDATED,
} from '../constat'
import history from '../../components/history/history'
import jwt_decode from 'jwt-decode'
let token = localStorage.getItem('token')


let state = {
    userDetail: token ? jwt_decode(token).id : null,
    userInfo:null,
    message: null
}


export function auth(newState = state, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            state.userDetail = action.payload.user._id
            state.userInfo = action.payload.user
            localStorage.setItem('token', token)
            if (action.payload.token) {
                localStorage.setItem('token', action.payload.token)
            }
            setTimeout(() => {
                history.push('/')
            })
            break;
        case PROFILE:
            console.log(action.payload)
            state.userInfo = action.payload
            setTimeout(() => {
                history.push('/')
            })
            if (action.payload) {
                state.message = "succussfully...!!!"
            }

            break;
        case LOGIN_FAILED:

            if (action.payload) {
                state.message = "Invalid information...!!!"
            }
            console.log(state.message);

            break;
        case LOGOUT:

            localStorage.removeItem('token')
            state.userDetail = null
            setTimeout(() => {
                history.push('/')
            })

            break;

        case PASSWORD_CONFIRMED:

        
                
            setTimeout(() => {
                history.push('/edit_company_setting')
            })

            break;

            case PASSWORD_UPDATED:

            // state.message = "Password didn't Match"
                
            setTimeout(() => {
                history.push('/')
            })

            break;


        default:
            break;
    }
    return newState
}

