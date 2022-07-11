import React, { useEffect, useState } from "react";
import "./style.css";
import getCategories from "../../../../services/categories.service";

const CategoryApp = ({ handleCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  //Estados del fetch
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res);
      }).catch((e) => {
        new Error(e);
        setError(e);
        console.log(e.response);
      }).finally(() => {
        setIsLoading(false);
      });

  }, []);


  const handleClick = (e) => {
    e.preventDefault();
    handleCategoryClick(e.target.id);
    const catagoryNew = document.querySelectorAll('.unc-list-category');
    for (let i = 0; i < catagoryNew.length; i++) {
      if (catagoryNew[i].id === e.target.id) {
        catagoryNew[i].style.transform = "scale(1.1, 1.1)";
        catagoryNew[i].style.color ="var(--primary)";

      }else{
        catagoryNew[i].style.transform = "none";
        catagoryNew[i].style.color = "var(--color2)";

      }
    };
  };

  return (
    <>
        <div className="unc-container-list">
          <h2 className="unc-h2">Buscar por tipo de alojamiento</h2>
          <ul className="unc-category">
            {categories.slice(0,4
            ).map((category, index) => (
              <li className="unc-list-category" key={index} id={category.id} onClick={handleClick}>
                <img src={category.urlImage} className="unc-category-img plc-ignore-click" alt="category" />
                <div className="unc-content-category plc-ignore-click">
                  <p>{category.title}</p>
                  <span className="unc-span plc-ignore-click">{`${category.products.length} ${category.title}`}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
};

export default CategoryApp;

