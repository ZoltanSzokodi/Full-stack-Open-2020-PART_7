import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = name => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
      axios
        .get(url)
        .then(response => {
          console.log(response.data);
          if (response.data.length > 0) {
            setCountry({
              found: true,
              data: response.data[0],
            });
          }
        })
        .catch(error => {
          setCountry({ found: false });
        });
    }
  }, [name]);

  return country;
};
