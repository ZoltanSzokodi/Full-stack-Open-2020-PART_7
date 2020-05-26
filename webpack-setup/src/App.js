import React, { useState } from 'react';
import { useNotes } from './hooks';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  // We have configured webpack to use different URL's for development and production
  // DEV_ENV => $ npm run derver (port 3001) / $ npm start (port 3000)
  // PROD_ENV =>
  // We can inspect the bundled production version of the application locally by executing the following command in the build directory: $ npx static-server (port 9080)
  const notes = useNotes(BACKEND_URL);

  console.log(notes);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
