import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Manufacturer(props) {
    const [manufacturers, setManufacturers] = useState([]);
    const [update, setUpdate] = useState();
    const [fetched, setFetched] = useState(0);

    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://frozen-hollows-90227.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/" + props.location.manufacturer)
    .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.response);
        setFetched(1);
        setManufacturers(responseData.response);
      })
      .catch((err) => console.error(err));
  }, [update]);
  

  if (fetched == 1){
    let codes = manufacturers.map(manufacturer => manufacturer.DATAPAYLOAD.split("<CODE>")[1].split("</CODE>")[0])
    let availability = manufacturers.map(manufacturer => manufacturer.DATAPAYLOAD.split("<INSTOCKVALUE>")[1].split("</INSTOCKVALUE>")[0])
    console.log(availability)
  }



  return (
    <div>
      <h1>Manufacturers</h1>

      <h2>
        <Link to="/">Go back </Link>
      </h2>
      <div className="manufacturers">
      <table>
        <thead>
          <tr>
            <th>ID </th>
            <th>
              Code: &nbsp;
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
              Availability: &nbsp;
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
        {manufacturers
          .map((manufacturer, index) => (
            <tbody>
              <tr key={index}>
                <td>{manufacturer.id}</td>
                <td>{manufacturer.DATAPAYLOAD.split("<CODE>")[1].split("</CODE>")[0]}</td>
                <td>{manufacturer.DATAPAYLOAD.split("<INSTOCKVALUE>")[1].split("</INSTOCKVALUE>")[0]}</td>
              </tr>
            </tbody>
          ))}
      </table>
      </div>
    </div>
  );
}

export default Manufacturer;
