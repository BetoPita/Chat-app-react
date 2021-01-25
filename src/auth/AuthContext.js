import React, { createContext, useState, useCallback, useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
export const AuthContext = createContext();
const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const {dispatch} = useContext(ChatContext)
  const login = async (email, password) => {
    const resp = await fetchSinToken("auth/login", { email, password }, "POST");
    const { usuario } = resp;
    if (resp.exito) {
      localStorage.setItem("token", resp.token);
      setAuth({
        uid: usuario.id,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
    }
    return resp.exito;
  };
  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken(
      "auth/create",
      { nombre, email, password },
      "POST"
    );
    const { usuario } = resp;
    if (resp.exito) {
      localStorage.setItem("token", resp.token);
      setAuth({
        uid: usuario.id,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
    }
    return resp;
  };
  const verificaToken = useCallback(async () => {
    //Sólo se ejecuta una vez
    const token = localStorage.getItem("token");
    if (!token) {
      return setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
    }
    //Validar si es válido
    const resp = await fetchConToken("auth/renew");
    if (resp.exito) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;
      setAuth({
        uid: usuario.id,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      uid: null,
      checking: false,
      logged: false
    });
    dispatch({
      type: types.borrarChatState
    })
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verificaToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
