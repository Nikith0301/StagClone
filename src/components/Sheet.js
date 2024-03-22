

import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';



const INITIAL_DATA = [
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
];

export default function Sheet() {
  const [data, setData] = useState(INITIAL_DATA);
  const [table, setTable] = useState(INITIAL_DATA);
  const [csv, setCsv] = useState(
    'Name,Age,City\nAlice,30,New York\nBob,25,London\nCharlie,40,Paris'
  );

  function CsvToArrobj(s) {
    let finalObjArray = [];
    let rows = s.split('\n');
   
    for (let row of rows) {
      let val = row.split(',');
      let temp = [];
      for (let e of val) {
        temp.push({ value: e });
      }
      finalObjArray.push(temp);
    }
    // console.log(finalObjArray);
    return finalObjArray
    // setData(finalObjArray);
  }

  function ArrobjToCsv(ob) {
    let csv = '';
    for (let row of ob) {
      let line = row.map(cell => cell.value).join(',');
      csv += line + '\n';
    }
    return csv;
    setCsv(csv);
  }
  function ArrayToObjArr(ar){
  
    let objArr=[]
    for (let row of ar){
      let temp=[];
      for (let e of row){
        temp.push({value:e})
      }
      objArr.push(temp);
      // console.log(row);
    }
    return objArr;
    }

  function handleClick() {
    const newData = [...data, [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }]];
    setData(newData);
  }

  function AddCol() {
    const newData = data.map(row => [...row, { value: '' }]);
    setData(newData);
  }

  function Trail(){
    let c= 'Name,Age,City\nAlice,30,New York\nBob,25,London\nCharlie,40,Paris';
    let o=CsvToArrobj(c);
    console.log(o)
    // setTable(o);
    setData(o);

  }
  

  async function Save() {
    try {
      // Prepare data in JSON format
      const jsonData = { text: ArrobjToCsv(data) };
  console.log(jsonData)


      // Fetch API with POST method and JSON body
      const response = await fetch('http://localhost:5000/db_post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
        // body:jsonData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log("Data sent successfully!");
  
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      // Disconnect from the database gracefully (if applicable)
    }
  }
  


  async function Fetch(){

    try {
      const response = await fetch('http://localhost:5000/data'); // Replace "/api/data" with your actual endpoint
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      let info = await response.json();
    
      console.log( info);
      let s=ArrayToObjArr(info);
    

      setData(s)
      
     
  } catch (error) {
      console.error('Error fetching data:', error);
     
  }
  
  
  console.log('This is fetch');
  }


  return (
    <>
      <button onClick={handleClick}>Add row</button>
      <button onClick={AddCol}>Add Cols</button>
      <button onClick={Trail}>trail here</button>
      {/* <button onClick={Convict}>concert to csv here</button> */}
      <button onClick={Fetch}>fetch data</button>
      <button onClick={Save}>Save data</button>
      <div>
        <Spreadsheet
          data={data}
          onChange={setData}
          // columnLabels={cols}
        />
      </div>
    </>
  );
}
