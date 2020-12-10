import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Store from "./Store";

const Home = lazy(() => import("./components/Home"));
const Room = lazy(() => import("./components/Room"));

const Routes = () => (
  <BrowserRouter>
    <Suspense fallback={<div />}>
      <Switch>
        <Route
          path="/:id"
          render={(props) => {
            return (
              <Store {...props}>
                <Room {...props}/>
              </Store>
            );
          }}
        />
        <Route path="/admin/:id" component={Room} />
        <Route path="/" component={Home} />
        <Route
          path="/*"
          render={() => {
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Routes;
