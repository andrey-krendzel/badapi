import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";

function Products(props){
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState();

 //Errors for fetch
 function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// GET method
React.useEffect(() => {
  
  if (localStorage.getItem(props.category)){
    setProducts(localStorage.getItem(props.category))
  } else{
  fetch("https://damp-woodland-35964.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/" + props.category)
    .then(handleErrors)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      setProducts(responseData);
      localStorage.setItem(props.category, products);
    })
    .catch((error) => console.log(error));
  }
}, [update]);

return(
  <table>
  <thead>
    <tr>
      <th>ID </th>
      <th>
        Color &nbsp;
        <button
          type="button"
          onClick={() => {
          }}
        >
          Asc
        </button>
        <button
          type="button"
          onClick={() => {
          }}
        >
          Desc
        </button>
      </th>

      <th>
        Manufacturer &nbsp;
        <button
          type="button"
          onClick={() => {
          }}
        >
          Asc
        </button>
        <button
          type="button"
          onClick={() => {
          }}
        >
          Desc
        </button>
      </th>

      <th>
        Type &nbsp;
        <button
          type="button"
          onClick={() => {
           
          }}
        >
          Asc
        </button>
        <button
          type="button"
          onClick={() => {
          }}
        >
          Desc
        </button>
      </th>
      <th>
        Price &nbsp;
        <button
          type="button"
          onClick={() => {
          }}
        >
          Asc
        </button>
        <button
          type="button"
          onClick={() => {
          }}
        >
          Desc
        </button>
      </th>
      <th>
        Name &nbsp;
        <button
          type="button"
          onClick={() => {
          }}
        >
          Asc
        </button>
        <button
          type="button"
          onClick={() => {
    
          }}
        >
          Desc
        </button>
      </th>
    </tr>
  </thead>
  {products
    .map((product, index) => (
      <tbody>
        <tr key={index}>
          <td>{product.id}</td>
          <td>{product.color}</td>
          <td> <Link
                to={{
                  pathname: "/manufacturer/" + product.manufacturer,
                  manufacturer: product.manufacturer,
                }}
              >
               
             {product.manufacturer}  </Link>{" "}</td>
          <td>{product.type}</td>
          <td>{product.price}</td>
          <td>{product.name}</td>
      
          <td>
            <button>
            
              Delete
            </button>
          </td>
          <td>
            <button>
            Edit
            </button>
          </td>
        </tr>
      </tbody>
    ))}
</table>
)

}

function App(props) {

  const [tabValue, setTabValue] = useState("one");

 

  //Tabs

  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  return (
    <div className="App">
              <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value="one" label="Gloves" />
            <Tab value="two" label="Facemasks" />
            <Tab value="three" label="Beanies" />
          </Tabs>
        </AppBar>
        {tabValue === "one" && (
          <Products category="gloves" />
        )}
      {tabValue === "two" && (
         <Products category="facemasks" />
        )}
              {tabValue === "three" && (
        <Products category="beanies" />
        )}

    </div>
  );
}

export default App;
