import { createContext } from "react";
import { User } from "./store";

const AuthContext = createContext({} as { user: User; setUser: (user: User) => void });

export default AuthContext;