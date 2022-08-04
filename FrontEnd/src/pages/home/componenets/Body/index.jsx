import React, { useState, useEffect } from "react";
import Category from "./Category";
import Pager from "../../../../components/pager/Pager.jsx";
import "./style.css";
import { getProducts, getProductsFilteredByCategory } from "../../../../services/products.service";
import ProductCard from "../../../../components/cardProduct/ProductCard.jsx";
import Spinner from "../../../../components/spinner/Spinner";
import NothingHere from "../../../../components/nothingHere/NothingHere";

const Body = () => {
  //Estados del fetch (esto se puede poner en el service)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //Estados para los productos y los filtros
  const [products, setProducts] = useState([]);
  //empieza desde la pagina 1
  const [pag, setPag] = useState(1);
  //cuantas cards en total
  const [porPag, setPorPag] = useState(8);
  const maxPag = products.length / porPag;

  const handleCategoryClick = (id) => {
    setIsLoading(true);
    getProductsFilteredByCategory(id)
      .then((res) => {
        setProducts(res);
      }).catch((e) => {
        new Error(e);
        setError(e);
        setProducts([]);
      }).finally(() => {
        setIsLoading(false);
      });
      setPag(1);
  }

  useEffect(() => {

    setIsLoading(true);
    getProducts().then((res) => {
      setProducts(res);
      return res
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    })

  }, []);
 
  return (
    <div className="unc-body-container">
      <Category handleCategoryClick={handleCategoryClick} />
      {isLoading ? <Spinner height={"300px"} /> :
        <div className="unc-container">
          <div className="unc-container-list">
            <h2 className="unc-h2">Recomendaciones</h2>
            <ul className="unc-list">
              {products
                .slice((pag - 1) * porPag, (pag - 1) * porPag + porPag)
                .map((product, index) => (
                  <li className="unc-card" key={index}>
                    <ProductCard product={product} />
                  </li>
                ))}
            </ul>
            {products.length > 0 ? <Pager pag={pag} setPag={setPag} maxPag={maxPag} /> : <NothingHere />}
          </div>
        </div>
      }
    </div>
  );
};

export default Body;
