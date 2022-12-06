import React, { useState } from "react";
import { useFormik } from "formik";

function Pac() {
  let [products, setProducts] = useState();
  let [brands, setBrands] = useState();
  let [children, setChildren] = useState();
  let [eanNumbers, setEanNumbers] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      getProducts(values);
    },
  });

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

  const getProducts = async (credentials) => {
    const login = {
      client_id: "administration",
      grant_type: "password",
      scopes: "write",
      username: credentials.email,
      password: credentials.password,
    };

    const fetchToken = await fetch(
      "https://www.freshcotton.com/api/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      }
    );
    const convertToken = await fetchToken.json();
    const fetchProducts = await fetch(
      "https://www.freshcotton.com/api/search/product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${convertToken.access_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const convertProducts = await fetchProducts.json();

    const fetchBrands = await fetch(
      "https://www.freshcotton.com/api/search/product-manufacturer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${convertToken.access_token}`,
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
          Authorization: `Bearer ${convertToken.access_token}`,
        },
        body: JSON.stringify(eanBody),
      }
    );
    const convertEan = await fetchEan.json();


  
    setProducts(() => convertProducts);
    setBrands(() => convertBrand);
    setEanNumbers(() => convertEan);

    window.localStorage.setItem("token", convertToken.access_token);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Username</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
      <div>Pac</div>

      <div className="my-5 mx-3">
        <h1>Product availability check</h1>
        <button className="btn btn-primary my-2">Export to cvs </button>
      </div>

      <table className="table  mx-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Ean</th>
            <th scope="col">Stock</th>
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
                      {
                        eanNumbers.data.find(
                          (eanNumber) => 
                            product.id === eanNumber.id
                            )?.attributes.productNumber                      
                      }
                    </td>
                    <td>{product.attributes.stock}</td>
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
