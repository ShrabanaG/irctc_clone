import { useReducer } from "react"
import reducer from "./reducer"
import initialState, { User } from "./store"
import { actions } from "./actions";
import AuthContext from "./authContext";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        setUser: (user: User) => dispatch({ type: actions.SET_USER, payload: {  ...state, user } })
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;