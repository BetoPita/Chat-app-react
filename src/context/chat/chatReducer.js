import { types } from "../../types/types";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: action.payload,
      };
    case types.activarChat:
      //Si es la misma persona y no esté trayendo siempre información si le da varios clicks al elemento
      if (state.chatActivo === action.payload) {
        return state;
      }
      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };
    case types.nuevoMensaje:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        //Tengo el chat activo
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        //no tengo el chat activo
        return state;
      }
    case types.cargarMensajes:
      return {
        ...state,
        mensajes: action.payload,
      };
    case types.borrarChatState:
      return {
        uid: "",
        chatActivo: null,
        usuarios: [],
        mensajes: [],
      };
    default:
      return state;
  }
};
