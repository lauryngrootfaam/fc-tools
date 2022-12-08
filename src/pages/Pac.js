import React, { useState } from "react";
import Navbar from "../Navbar";

import {UserContext} from '../UserContext'
import { useContext } from "react"


function Pac() {
  let [products, setProducts] = useState();
  let [brands, setBrands] = useState();
  let [children, setChildren] = useState();
  let [eanNumbers, setEanNumbers] = useState();


  const {getToken, token ,  setToken} = useContext(UserContext);
  const {refreshToken, setRefreshToken} = useContext(UserContext);

  const body = {
    page: 1,
    filter: [
      {
        type: "equals",
        field: "product.parentId",
        value: null,
      },
      {
        type: "equals",
        field: "product.active",
        value: false,
      },
      {
        type: "multi",
        operator: "or",
        queries: [
          {
            type: "range",
            field: "stock",
            parameters: {
              gte: 1,
            },
          },
          {
            type: "range",
            field: "children.stock",
            parameters: {
              gte: 1,
            },
          },
        ],
      },
    ],
    associations: {
      children: {
        includes: { 
          product: ["id"],
        },
      },
      cover: {},
    },
    includes: {
      product: ["id", "name", "stock", "manufacturerId", "coverId", "children"],
    },
    "total-count-mode": 1,
  };

  const eanBody = {
    "page": 1,
    "filter": [
        {
            "type": "equals",
            "field": "product.active",
            "value": false
        },
        {
            "type": "multi",
            "operator": "or",
            "queries": [
                {
                    "type": "range",
                    "field": "stock",
                    "parameters": {
                        "gte": 1
                    }
                }
            ]
        }
    ],
     "includes": {
    "product": ["productNumber", "children", "name", "translated.name"]
  },
  "associations": {
    "children": [],
    "media": []
    },
    "grouping": ["parentId"],
    "total-count-mode": 1
};

  const getProducts = async (credentials) => {;

    //fetch products
    const fetchProducts = await fetch(
      "https://www.freshcotton.com/api/search/product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify(body),
      }
    );
    const convertProducts = await fetchProducts.json();

    //fetch brands
    const fetchBrands = await fetch(
      "https://www.freshcotton.com/api/search/product-manufacturer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    const convertBrand = await fetchBrands.json();


    //fetch ean numbers
    const fetchEan = await fetch(
      "https://www.freshcotton.com/api/search/product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify(eanBody),
      }
    );
    const convertEan = await fetchEan.json();

    setProducts(() => convertProducts);
    setBrands(() => convertBrand);
    setEanNumbers(() => convertEan);

  };
 
  getProducts();

  return (
    <>
    <Navbar />

      <p>Token: {token}</p>
      <p>Refresh Token: {refreshToken}</p>

      <div className="my-5 mx-3">
        <h2>Product availability check</h2>
        {/* <button className="btn btn-primary my-2">Export to cvs</button> */}
      </div>

      <table className="table  mx-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Brand Name</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.data.map((product) => {

              
              return (
                <>
                <pre>{JSON.stringify(children)}</pre>
                  <div className="my5"></div>
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.attributes.name}</td>
                    <td>
                      {
                        brands.data.find(
                          (brand) =>
                            brand.id === product.attributes.manufacturerId
                        )?.attributes.name
                      }
                    </td>
                    <td>
                      <a
                        target="_blank"
                        href={`https://www.freshcotton.com/admin#/sw/product/detail/${product.id}/base`}
                      >
                        {" "}
                        View Product in Shopware
                      </a>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>

  );

}


export default Pac;
