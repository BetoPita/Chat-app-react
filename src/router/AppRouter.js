import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  //esperar mientras verifica el token
  const { auth, verificaToken } = useContext(AuthContext);
  //Cada vez que se ejecuta debemos ver sólo una vez, por eso verificaToken está en un usecallback
  useEffect(() => {
    verificaToken();
  }, [verificaToken]);
  if (auth.checking) {
    return <h1>Espere...</h1>
  }
  
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={AuthRouter} /> */}
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={auth.logged}
            exact path="/"
            component={ChatPage}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
