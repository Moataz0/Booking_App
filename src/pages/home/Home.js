import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Featured,
  FeaturedProperties,
  Footer,
  Header,
  MailList,
  Navbar,
  PropertyList,
} from "../../components";
import useFetch from "../../hooks/useFetch";
import "./home.css";


function Home() {
  const { data, loading, error } = useFetch("ping", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept-Language": "ar",
    },
  });
  // Check if no response
  if (!data.data?.access_token) return;
  const { tenant, currencies, default_language ,languages} = data.data.settings;
  const { access_token } = data.data;
  localStorage.setItem("token", access_token);

  return (
    <>
      {loading ? (
        <div className="centerLoader">
          <span className="loader"></span>
        </div>
      ) : (
        <div div className="container">
          <Navbar
            nameCompany={tenant.name}
            currencies={currencies}
            lang={default_language}
            languages={languages}
          />
          <Header />
          <div className="homeContainer">
            <Featured />
            <h1 className="homeTitle">Browse by property type</h1>
            <PropertyList />
            <h1 className="homeTitle">Homes guests love</h1>
            <FeaturedProperties />
            <h1 className="homeTitle">Connect with other travelers</h1>
            <MailList />
            <Footer tenant={tenant} />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
