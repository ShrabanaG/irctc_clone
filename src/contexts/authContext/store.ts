export type User = {
    id: number;
    username: string;
    email: string;
} | null;

export type Store = {
    user: User;
    isLoggedIn: boolean;
};

const initialState: Store = {
    user: null,
    isLoggedIn: false
}

export default initialState;