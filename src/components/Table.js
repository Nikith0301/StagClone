import React,{useState,useEffect} from 'react'

export default function Table() {

// let arr=[
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
//     [10,11,12]
// ]
let arr=[[null,null,null]];
let arrObj=[
  [{value:"1"},{value:"2"},{value:3}],
  [{value:4},{value:5},{value:6}],
  [{value:7},{value:8},{value:9}],
 
]

const [data,setData]=useState( arr)
const [heading,setHeading]=useState( ['','Head1'])
// const [heading,setHeading]=useState( ['Sno','head2'])

const[table,setTable]=useState(<tr>
    <th scope="row">1</th>
    <td contentEditable="true">77</td>
    
    <td contentEditable="true">kaun</td>
  </tr>)

// useEffect( (data)=>{
//     return {
//         newRow=Wrap(data)
//     }
// },[data] )

// let nami=[ <td contentEditable="true">{"Nami"}</td>]

function Wrap(arr){
    // console.log(arr);
 let dup=arr.map((r,rowIndex)=>{
  let cols=r.map(c=>{return  <td contentEditable="true">{c}</td>})
    return (<tr>
    <th scope="row">{rowIndex}</th>
    {/* <td contentEditable="true">{r[0]}</td>
    <td contentEditable="true">{r[1]}</td>
    <td contentEditable="true">{r[2]}</td> */}



   {cols}
  </tr>)

} )
// console.log(dup);
setTable(dup);
 
}

//my addcolumn
// function AddColumn(){
  
//   // let dup=[];
//   let dup=data.map((r)=>{
// let temp=r;
// temp.push(null);
// return temp
//   })
 
//   let newData=[...data,dup];
 
//     setData(newData)
//     let newHeading=[...heading,'brook']
//     setHeading(newHeading)
//     Wrap(data)

  
// }

function addColumn() {
  // Clone the data array and add a new column with null values
  const updatedData = data.map(row => [...row, null]);
  
  // Update state with the new data
  setData(updatedData);

  // Update headings with the new column name
  const updatedHeadings = [...heading, 'Edit'];
  setHeading(updatedHeadings);

  // Perform any necessary wrap operation
  Wrap(updatedData);
}


function AddRow(){
  //create equal number of columns
  let cols=[]
  for(let i=0;i<data[0].length;i++){
    cols.push(null)
  }
    // let newData=[...data,[null,null,"",null]];
    let newData=[...data,cols];
 
    setData(newData)
 
    Wrap(data)
  
}

async function Fetch(){

  try {
    const response = await fetch('http://localhost:5000/data'); // Replace "/api/data" with your actual endpoint
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const info = await response.json();
    console.log( info);
    setData(info)
    Wrap(info)
   
} catch (error) {
    console.error('Error fetching data:', error);
   
}


console.log('This id fetch');
}

  return (
    <div>
        <button onClick={()=>Fetch()}>Fetch</button>
        <button onClick={()=>AddRow()}>AddRow</button>
        <button onClick={()=>addColumn()}>AddColumn</button>
        <table className="table table-success  table-bordered">

    {
            heading.map((head)=>{
                return(<th contentEditable="true">{head}</th>)
            })
    }

 
    <tbody>
      {table}
    
    </tbody>
  </table></div>
  )
}
