// import P from 'prop-types';
import './App.css';
import { Div } from './Components/Div';
import { AppContext } from './contexts/App';
// import React, { useContext, useState } from 'react';
// { useState, useEffect, useMemo, useRef }

function App() {
  return (
    <AppContext>
      <Div />
    </AppContext>
  );
}

export default App;
