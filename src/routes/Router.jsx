import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import useAxios from "../api/api";
import PrivateRoute from "./PrivateRoute";
import { publicRoutes, privateRoutes } from "./routes";

export default function Router() {
  const axios = useAxios();
  return (
      <SWRConfig
          value={{
            fetcher(url, params) {
              return axios({
                method: "GET",
                url,
                params,
              }).then((res) => res.data);
            },
          }}
      >
        <BrowserRouter>
          <Switch>
            {publicRoutes.map(
                ({ exact, path, component, ...otherProps }) => (
                    <Route
                        key={`public-route-${path}`}
                        exact={exact}
                        path={path}
                        component={component}
                        {...otherProps}
                    />
                )
            )}
            {privateRoutes.map(({ exact, path, component, children }) =>
                children ? (
                    children.map((child) =>
                        child.children ? (
                            child.children.map((subChild) => (
                                <PrivateRoute
                                    key={`private-route-${path}-${child.path}`}
                                    exact={subChild.exact}
                                    path={`${path}${child.path}${subChild.path}`}
                                    component={subChild.component}
                                />
                            ))
                        ) : (
                            <PrivateRoute
                                key={`private-route-${path}`}
                                exact={child.exact}
                                path={`${path}${child.path}`}
                                component={child.component}
                            />
                        )
                    )
                ) : (
                    <PrivateRoute
                        key={`private-route-${path}`}
                        exact={exact}
                        path={path}
                        component={component}
                    />
                )
            )}
          </Switch>
        </BrowserRouter>
      </SWRConfig>
  );
}