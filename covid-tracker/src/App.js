import { FormControl, MenuItem ,Select} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Box from "./Box";
import './App.css';

function App() {
  const [countries, setCountries]=useState([]);
  const [country ,setCountry]=useState("worldwide");
  const [countryInfo, setCountryInfo]=useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries=data.map((country) =>({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);
  const Countrychange = async (event) => {
    const countryCode= event.target.value;
    setCountry(countryCode);
    const url = 
      countryCode ==="Worldwide"
      ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    });
    
  };
  
  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
        
        <h1>
          COVID TRACKER
        </h1>
        <FormControl>
          <Select variant="outlined" value={country} onChange={Countrychange}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
           {countries.map((country) => (
             <MenuItem value={country.value}>{country.name}</MenuItem>
           ))}
  
          </Select>
        </FormControl>
        </div>
      </div>

      <div className="app_right">
        
        <div>
        <Box title="Active" cases={countryInfo.active} total={400}/>
        <Box title="recovered" cases={countryInfo.recovered} total={countryInfo.todayRecovered}/>
        <Box title="death" cases={countryInfo.deaths} total={countryInfo.todayDeaths}/>
        <Box title="confirmed" cases={countryInfo.cases} total={countryInfo.todayCases}/>
        </div>
      </div>  
    </div>
  );
}

export default App;
