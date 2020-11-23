import React from 'react';
import { useSwipeable } from 'react-swipeable';

function App() {
  const handlers = useSwipeable({});

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
      }}
    >
      Hello there fellow stranger. 60S.
    </div>
  );
}

export default App;
