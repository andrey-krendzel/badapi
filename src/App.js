import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function App(props) {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState();
  const [category, setCategory] = useState('gloves');

  //Errors for fetch
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  // GET method
  React.useEffect(() => {
    fetch("https://frozen-hollows-90227.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/" + category)
      .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setProducts(responseData);
      })
      .catch((error) => console.log(error));
  }, [update]);



  return (
    <div className="App">
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
                      Edit
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
    </div>
  );
}

export default App;
