import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const App = () => {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const response = await fetch('data.json', headers);
    const { rates } = await response.json();

    const ratesArray = Object.entries(rates).map(([name, value]) => {
      return {
        name,
        value,
      };
    });
    setRates(ratesArray);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => getData(), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <Loader
          className="loader"
          type="Watch"
          color="#363636"
          height={50}
          width={50}
        />
      </div>
    );
  }

  return (
    <div className="container">
      {rates.map((rate, i) => (
        <div className="item" key={i}>
          <div>
            <p className="heading">{rate.name}</p>
            <p className="title">{rate.value.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
