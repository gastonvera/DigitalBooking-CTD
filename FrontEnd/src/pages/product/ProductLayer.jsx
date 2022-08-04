import React, { useEffect, useState } from "react";
import HeaderBlock from "../../components/headerBlock/index";
import FeatureBlock from "./components/featureBlock/index.jsx";
import PolicyBlock from "./components/policyBlock/PolicyBlock";
import DescriptionBlock from "./components/descriptionBlock/DescriptionBlock.jsx";
import LocationBlock from "./components/locationBlock";
import CalendarBlock from "./components/calendarBlock/index.jsx";
import Maps from "./components/maps/Maps.jsx";
import { getProductById } from '../../services/products.service.js';
import Spinner from "../../components/spinner/Spinner";
import GalleryBlock from './components/galleryBlock/GalleryBlock';

const style = {
  container: {
    paddingTop: "140px",
  }
}

const ProductLayer = (props) => {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const location = window.location.pathname;
  const productId = location.split("/")[2];

  useEffect(() => {
    setIsLoading(true);
    getProductById(productId)
      .then((res) => {
        setProduct(res);
        return res;
      })
      .catch((e) => {
        new Error(e);
        setError(e);
        console.log(e.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner height={"90vh"} />
      ) : (
        <>
          {product && <HeaderBlock data={product} />}
          <div style={style.container}>
            {product && <LocationBlock data={product} />}
            {product && <GalleryBlock data={product} />}
            {product && <DescriptionBlock data={product} />}
            {product && <FeatureBlock data={product} />}
            {product && (
              <CalendarBlock
                data={product}
                setBookTriedWithoutLogin={props.setBookTriedWithoutLogin}
              />
            )}
            {product && <Maps data={product} />}
            {product && <PolicyBlock data={product} />}
          </div>
        </>
      )}
    </>
  );
};

export default ProductLayer;
