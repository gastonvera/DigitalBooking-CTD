import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts, getProductsFilteredByCity, findProductByDateAndCity, findProductByDate } from "../../../services/products.service";
import CheckBox from '../../../components/checkBox/CheckBox';
import Pager from '../../../components/pager/Pager';
import ProductCard from '../../../components/cardProduct/ProductCard.jsx';
import Spinner from '../../../components/spinner/Spinner';
import NothingHere from '../../../components/nothingHere/NothingHere';
import './Results.css';
import { categorias, caracteristicas } from '../../../utilities/filtersList';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FilterContext } from '../../../context/FilterProvider';


const Results = () => {
    const location = useLocation();
    //Estados del fetch (esto se puede poner en el service)
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState(categorias);
    const [featuresList, setFeaturesList] = useState(caracteristicas);
    //Estados para los productos y los filtros
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [features, setFeatures] = useState([]);
    //empieza desde la pagina 1
    const [pag, setPag] = useState(1);
    //cuantas cards en total
    const [porPag, setPorPag] = useState(6);
    const maxPag = filteredProducts.length / porPag;
    //state para abrir el menu
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const dimensions = useWindowDimensions();
    const {filters} = useContext(FilterContext);

    const handleOpenFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    useEffect(()=>{
      handleClearFilters();
  },[location.pathname])


    const handleClearFilters = () => {
        setCategories([]);
        setFeatures([]);
        for (let i = 0; i < categoriesList.length; i++) {
            categoriesList[i].checked = false;    
        }
        for (let i = 0; i < featuresList.length; i++) {
            featuresList[i].checked = false;    
        }
    }


    useEffect(() => {

        //Fetch de los productos iniciales (server-side filter)
        setIsLoading(true);
        if (filters.city === "any" && filters.startDate === "any" && filters.endDate === "any") {
            getProducts().then((res) => {
                setProducts(res);
                setFilteredProducts(res);
            }).catch((err) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            });
        } else if (filters.city !== "any" && filters.startDate === "any" && filters.endDate === "any") {
            getProductsFilteredByCity(filters.city).then((res) => {
                setProducts(res);
                setFilteredProducts(res);
            }).catch((err) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            });
        } else if (filters.city !== "any" && filters.startDate !== "any" && filters.endDate !== "any") {
            findProductByDateAndCity(filters.city, filters.startDate, filters.endDate).then((res) => {
                setProducts(res);
                setFilteredProducts(res);
            }).catch((err) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            });
        } else if (filters.city === "any" && filters.startDate !== "any" && filters.endDate !== "any") {
            findProductByDate(filters.startDate, filters.endDate).then((res) => {
                setProducts(res);
                setFilteredProducts(res);
            }).catch((err) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            });
        }

    }, [filters]);

    const handleSelectCategory = (event) => {
        let flag = false;
        for (const i in categories) {
            if (categories[i] === event.target.value) {
                flag = true;
                break;
            }
        }
        if (flag) {
            setCategories(
                categories.filter((name) => name !== event.target.value)
            );
            for (let i = 0; i < categoriesList.length; i++) {
                if(categoriesList[i].name === event.target.value){
                    categoriesList[i].checked = false;
                }
            }
        } else {
            setCategories(categories.concat(event.target.value));
            for (let i = 0; i < categoriesList.length; i++) {
                if(categoriesList[i].name === event.target.value){
                    categoriesList[i].checked = true;
                }     
            }
        }

    }

    const handleSelectFeature = (event) => {
        let flag = false;
        for (const i in features) {
            if (features[i] === event.target.value) {
                flag = true;
                break;
            }
        }
        if (flag) {
            setFeatures(
                features.filter((name) => name !== event.target.value)
            );
            for (let i = 0; i < featuresList.length; i++) {
                if(featuresList[i].value === event.target.value){
                    featuresList[i].checked = false;
                }     
            }
        } else {
            setFeatures(features.concat(event.target.value));
            for (let i = 0; i < featuresList.length; i++) {
                if(featuresList[i].value === event.target.value){
                    featuresList[i].checked = true;
                }     
            }
        }
    }

    useEffect(() => {
        if ((categories.length === 0) && (features.length === 0)) {
            setFilteredProducts(products);
        } else if (categories.length > 0 && (features.length === 0)) {
            setFilteredProducts(products.filter((product) => categories.includes(product.category.title)));
        } else if (categories.length === 0 && (features.length > 0)) {
            setFilteredProducts(products.filter((product) => {
                const productFeatures = [];
                const claves = Object.keys(product.features);
                for (let i = 0; i < claves.length; i++) {
                    let clave = claves[i];
                    if (product.features[clave]) {
                        productFeatures.push(clave);
                    }
                }
                let checker = (arr, target) => target.every(v => arr.includes(v));
                return checker(productFeatures, features);
            }));
        } else {
            setFilteredProducts(products.filter((product) => {
                const productFeatures = [];
                const claves = Object.keys(product.features);
                for (let i = 0; i < claves.length; i++) {
                    let clave = claves[i];
                    if (product.features[clave]) {
                        productFeatures.push(clave);
                    }
                }
                let checker = (arr, target) => target.every(v => arr.includes(v));
                return checker(productFeatures, features) && categories.includes(product.category.title);
            }));
        }
        setPag(1);
    }, [categories, features])

    return (
        <>
            <div className='gv-search-result-container'>
                <>
                    {dimensions.width < 468 && showFilterMenu &&
                        <div className='gv-filter-menu-container-mobile'>
                            <div style={{ position: "relative" , width: "100%"}}>
                                <FontAwesomeIcon
                                    onClick={handleOpenFilterMenu}
                                    icon={faXmark}
                                    style={{
                                        position: "absolute",
                                        fontSize: "1.8rem",
                                        color: "var(--color2)",
                                        right: 0,
                                        top: "20rem",
                                        zIndex: 10001,
                                        cursor: "pointer"
                                    }}
                                />
                                <div className='gv-filters-container' style={{ paddingTop: "23rem", width:"100%" }}>
                                    <h2>Filtrar por:</h2>
                                    <div className='gv-filters-group' onChange={handleSelectCategory}>
                                        <h3>Categorias</h3>
                                        {categoriesList.map((category, index) => (<CheckBox title={category.name} value={category.name} uniqueKey={index} checked={category.checked}/>))}
                                    </div>
                                    <div className='gv-filters-group' onChange={handleSelectFeature}>
                                        <h3>Caracteristicas</h3>
                                        {featuresList.map((feature, index) => (<CheckBox title={feature.name} value={feature.value} uniqueKey={index * 100} checked={feature.checked}/>))}
                                    </div>
                                    <div className='gv-filters-group'>
                                        <div className='unc-link' onClick={handleClearFilters}>
                                            Limpiar filtros
                                        </div>
                                        <div className='unc-link' onClick={handleOpenFilterMenu}>
                                            Aplicar
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </>
                {dimensions.width >= 468 &&
                    <div className='gv-filters-container'>
                        <h2>Filtrar por:</h2>
                        <div className='gv-filters-group' onChange={handleSelectCategory}>
                            <h3>Categorias</h3>
                            {categoriesList.map((category, index) => (<CheckBox title={category.name} value={category.name} uniqueKey={index} checked={category.checked}/>))}
                        </div>
                        <div className='gv-filters-group' onChange={handleSelectFeature}>
                            <h3>Caracteristicas</h3>
                            {featuresList.map((feature, index) => (<CheckBox title={feature.name} value={feature.value} uniqueKey={index * 100} checked={feature.checked}/>))}
                        </div>
                        <div className='gv-filters-group'>
                            <div className='unc-link' onClick={handleClearFilters}>
                                Limpiar filtros
                            </div>
                        </div>
                    </div>}
                <div className="gv-products-found-container">
                    <h2>{`Encontramos ${filteredProducts.length} propiedades para tí ${filters.city === "any" ? "" : `en ${filters.city}`}`}</h2>
                    {dimensions.width < 468 &&
                        <div className='gv-button-filters' onClick={handleOpenFilterMenu}>
                            <p>Filtros</p>
                            <FontAwesomeIcon icon={faFilter} fontSize="0.8rem" className='gv-icon-filters'/>
                        </div>}
                    {isLoading ? <Spinner height={"300px"} /> :
                        <ul className="gv-cards-products">
                            {filteredProducts
                                .slice((pag - 1) * porPag, (pag - 1) * porPag + porPag)
                                .map((product, index) => (
                                    <li className="gv-card" key={index}>
                                        <ProductCard product={product} />
                                    </li>
                                ))}
                        </ul>
                    }
                    {filteredProducts.length > 0 ? <Pager pag={pag} setPag={setPag} maxPag={maxPag} /> : <NothingHere />}
                </div>
            </div>
        </>
    )
}

export default Results;