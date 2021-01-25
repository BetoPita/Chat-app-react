import React,{useEffect,useContext} from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online,conectarSocket,desconectarSocket } = useSocket('http://localhost:8080');
    const {auth} =  useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)
    //Cuando se conecta
    useEffect(() => {
        if(auth.logged){
            conectarSocket();
        }
    }, [auth,conectarSocket]);
    //Cuando se desconecta
    useEffect(() => {
        if(!auth.logged){
            desconectarSocket();
        }
    }, [auth,desconectarSocket])

    //Escuchar cambios de usuarios conectados
    useEffect(() => {
        socket?.on('lista-usuarios',(usuarios) => {
            dispatch({
                type:types.usuariosCargados,
                payload: usuarios
            })
        })
        //Dispatch ya es una función memorizada por parte de react, por eso no se usa usecallback
    }, [socket,dispatch])

    useEffect(() => {
        socket?.on('mensaje-personal',(mensaje)=>{
            dispatch({
                type: types.nuevoMensaje,
                payload:mensaje
            })
            //Dispatch de una acción 

            //Mover el scroll al final
            scrollToBottomAnimated('mensajes');
        })
    }, [socket,dispatch])
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}