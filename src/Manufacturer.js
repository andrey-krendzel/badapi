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
    const [sortedField, setSortedField] = React.useState();
    const [direction, setDirection] = React.useState();

    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://damp-woodland-35964.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/" + props.location.manufacturer)
    .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.response);
        setFetched(1);
        setManufacturers(responseData.response);
      })
      .catch((err) => console.error(err));
  }, [update]);
  

 /* if (fetched == 1){
      // Testing the split functions
    let codes = [...manufacturers.map(manufacturer => manufacturer.DATAPAYLOAD.split("<CODE>")[1].split("</CODE>")[0])]
    let availability = [...manufacturers.map(manufacturer => manufacturer.DATAPAYLOAD.split("<INSTOCKVALUE>")[1].split("</INSTOCKVALUE>")[0])]
    console.log(availability)
  } */

    //Sort magic
  //Dont execute the function if sortedField isn't modified
  if (sortedField != null) {
    if (direction == "asc") {
      //Asc
      manufacturers.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      });
    } else {
      // Desc
      manufacturers.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return 1;
        }
        if (a[sortedField] > b[sortedField]) {
          return -1;
        }
        return 0;
      });
    }
  }



  return (
    <div>
      <h2>Manufacturer: <span className="title">{props.location.manufacturer}</span></h2>
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
            </th>
            <th>
              Availability: &nbsp;
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
