import { useCallback } from 'react';
import { useDispatch, useStore } from '../store/StoreProvider';
import { getFavsById, loginUser } from '../services/user.service';
import { useNavigate, useLocation } from 'react-router-dom';
import { types } from '../store/StoreReducer';

const useUser = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const { user, favs, isLogged } = store;
    const navigate = useNavigate();
    const location = useLocation();

    const login = useCallback(({ email, password }) => {
        let userData;
        let favsList;
        var stateLogin = "";
        loginUser({ email, password }).then((res) => {
            if(res === undefined) return stateLogin = "error";
            if (res.status === 200) {
                userData = {
                    id: res.data.id,
                    name: res.data.name,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    tokenJwt: res.data.token,
                    rol: res.data.rol.rolName
                }
                localStorage.setItem("user", JSON.stringify(userData));
                dispatch({
                    type: types.authLogin,
                    payload: userData
                });
                const userId = userData.id;
                const jwt = userData.tokenJwt;
                getFavsById(userId, jwt).then((res) => {
                    dispatch({
                        type: types.favsChange,
                        payload: res
                    });
                    favsList = res;
                    return res
                }).catch((err) => {
                    console.log(err);
                })
                stateLogin = "success";
            } else {
                stateLogin = "error";
            }
        })
        const storeData = {
            user: userData,
            isLogged: true,
            favs: favsList
        }
        localStorage.setItem("store", JSON.stringify(storeData));
        return stateLogin;
    }, [store])


    const logout = useCallback(() => {
        dispatch({ type: types.authLogout });
        localStorage.removeItem("user");
        localStorage.removeItem("store");
        if (location.pathname !== "/") {
            navigate("/");
        } else{
            navigate(0);
        }
    }, [store])

    return {
        login,
        logout
    }

}

export default useUser;