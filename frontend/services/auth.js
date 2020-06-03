export const TOKEN_KEY = "@api/market";
export const USER_KEY = "@market/id";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  	localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
	  localStorage.removeItem(TOKEN_KEY);
	  localStorage.removeItem(USER_KEY);
};
export const getUSer = () => localStorage.getItem(USER_KEY);
export const setUser = id => {
	localStorage.setItem(USER_KEY, id);
};
