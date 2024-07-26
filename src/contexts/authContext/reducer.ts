import { actions } from "./actions";
import { Store } from "./store";

const reducer = (state: Store, action: { type: string; payload: Store }) => {
    switch (action.type) {
        case actions.SET_USER: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            }
        }
        default: throw new Error("Invalid Action");
    }
}

export default reducer;