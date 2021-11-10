import styles from "../styles/Home.module.css";

import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// import { Form, Button, Container } from "react-bootstrap";
export default function Home() {
  const [currentData, setCurrentData] = useState("");

  // const [urls, setUrls] = useLocalStorage('urls',[])

  // const existingUrls = localStorage.getItem('urls')
  // console.log(existingUrls)
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const url = e.target[0].value;
      const newUrl = url.replace(/(^\w+:|^)\/\//, "").toString();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: newUrl,
        }),
      };
      const result = await fetch("http://localhost:5000/addurl", options);
      const data = await result.json();
      
      setCurrentData((previousUrls) => {
        if (previousUrls && previousUrls.some(e=> e.id === data.id)) {

          return [...previousUrls];
        }
        else return [...previousUrls,data]
      });
      // setUrls(previousUrls => {
      //   return [...previousUrls, data]
      // })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="d-flex w-100 m-2 p-2 flex-column">
      <h1 className='align-self-center'>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="m-2 p-2 align-self-center">
        <label htmlFor="url">Enter url:</label>
        <input type="text" id="url" />
        <input type="submit" value="Submit" />
      </form>
      <div className="m-2 p-2 align-self-center card">
        {currentData ? 
          currentData.map((item) => (
            <div className="m-2 p-2 align-self-center ">
            <h2>
              <a href={`http://localhost:3000/goto/${item.id}`}>{item.id}</a>,
              {item.url}
            </h2>
            </div>
          )) : <h1>Search for something</h1>}
      </div>
    </div>
  );
}
