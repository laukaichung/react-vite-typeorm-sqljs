import React, {FunctionComponent, ReactElement} from "react";
import {isRouteErrorResponse} from "react-router";
import {useRouteError} from "react-router-dom";

export const ErrorBoundary: FunctionComponent = () => {
  const error = useRouteError() as any;
  console.error(error);
  let element: ReactElement = <></>;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      element = <div>Not found</div>;
    }
  } else {
    element = (
      <div>{JSON.stringify(error)}</div>
    );
  }
  return element
};
