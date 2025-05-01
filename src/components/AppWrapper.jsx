import React from "react";
import { usePullToRefresh } from "./usePullToRefresh";

function AppWrapper({ children }) {
  usePullToRefresh(() => {
    window.location.reload();
  });

  return <>{children}</>;
}

export default AppWrapper;
