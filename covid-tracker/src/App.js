import { Card ,CardContent, FormControl, MenuItem ,Select} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Box from "./Box";
import Table from "./Table"
import Map from "./Map"
import "leaflet/dist/leaflet.css"



import './App.css';
import { sortData } from './sort';

function App() {
  const [countries, setCountries]=useState([]);
  const [country ,setCountry]=useState("Worldwide");
  const [countryInfo, setCountryInfo]=useState({});
  const [tableData, setTableData]=useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
      .then((data) => {
      setCountryInfo(data);
    });
  },[]);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries=data.map((country) =>({
          name: country.country,
          value: country.countryInfo.iso2,
          cases:country.cases,
        }));
        const sortedData=sortData(data);
        setTableData(sortedData);
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
      <div className="app_left">
        
        <div className="Box">
         <Box title="Active" cases={countryInfo.active} total={countryInfo.todayCases - countryInfo.todayRecovered}/>
         <Box title="recovered" cases={countryInfo.recovered} total={countryInfo.todayRecovered}/>
         <Box title="death" cases={countryInfo.deaths} total={countryInfo.todayDeaths}/>
         <Box title="confirmed" cases={countryInfo.cases} total={countryInfo.todayCases}/>
        </div>
        <div>
         <Map />
        </div>
      </div>
      
        <div className="app_right">
                <Card>
                  <CardContent>
                    <h4>country cases</h4>
                    {tableData.map((c) => (
                      <Table country={c.country} cases={c.active} />
                    ))}
                    
                  
                   <h4>
                     live
                   </h4>
                   </CardContent>
                </Card>
          
        </div>

      


    </div>
  );
}

export default App;
