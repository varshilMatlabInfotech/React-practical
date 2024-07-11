import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '../../../node_modules/@material-ui/core/index';

const LandingPage = () => {
  const [state, setState] = useState({
    tabValue: 0,
  });

  useEffect(() => {
   
  }, []);

  return (
    <div>
      <div>
        <Tabs value={state.tabValue} onChange={(e, newValue) => setState((prev) => ({ ...prev, tabValue: newValue }))}>
          <Tab label="All Users" />
          <Tab label="Bookmarked Users" />
        </Tabs>
      </div>

      <div>{state.tabValue === 0 ? <div></div> : <div></div>}</div>
    </div>
  );
};

export default LandingPage;
