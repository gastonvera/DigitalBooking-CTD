import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { caracteristicas } from "../../utilities/filtersList";
import getCities from '../../services/cities.service';
import getCategory from '../../services/categories.service';
import { postProduct } from '../../services/products.service';
import { useModal } from '../../hooks/useModal';
import ModalProduct from './ModalProduct';
//fontwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft, faX, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

//style.css
import "./createProduct.css";

const hours = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00"
];

const CreateProduct = () => {
  const [isOpenModalSuccess, OpenModalSuccess, closeModalSucess] = useModal(false);
  const navigate = useNavigate();
  const goBack = () => { navigate(-1); };
  const [houses, setHouses] = useState([]); //static search
  const [category, setCategory] = useState([]);
  const [formImg, setFormImg] = useState([]);
  const [alert, setAlert] = useState('');


  const [formPolicy, setFormPolicy] = useState({
    houseRules: '',
    healthAndSecurity: '',
    cancelPolicy: ''
  });

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    referencias: '',
    category: '',
    features: {
      pool: false,
      grill: false,
      security: false,
      elevator: false,
      airConditioning: false,
      gym: false,
      laundry: false,
      sauna: false,
      suitableProfessional: false,
      disabledAccess: false,
      furnished: false,
      bright: false,
      pets: false,
      comercialUse: false,
      electricity: false,
      naturalGas: false,
      water: false,
      heating: false,
      wifi: false
    },
    images: [],
    cities: {},
    policy: {},
    latitude: '',
    longitude: '',
    checkInRange_list: [],
    address: '',
    pricePerNight: ''
  });

  const [formImg1, setFormImg1] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    getCities().then((res) => {
      setHouses(res);
      return res;
    });

    getCategory().then((respuest) => {
      setCategory(respuest);
      return respuest;
    });
  }, []);



  const handleRemove = (id) => {
    const urlDelete = formImg.filter((i) => i.url !== id);
    setFormImg(urlDelete);
  }

  const handleChangePolicy = (e) => {
    const { name, value } = e.target;
    setFormPolicy({ ...formPolicy, [name]: value });
  };

  const handleChangeCheckbox = (e) => {
    formValues.features[e.target.value] = e.target.checked;
    setFormValues(formValues);
  };

  const handleChangeHour = (e) => {
    formValues.checkInRange_list.push(e.target.value);
    setFormValues(formValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };

  //url
  const handleChangeImg = (e) => {
    const { name, value } = e.target;
    formImg1.title = formValues.name;
    setFormImg1({ ...formImg1, [name]: value });
  };

  const handleUrl = () => {
    setFormImg([...formImg, formImg1]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValues.policy = formPolicy;
    formValues.images = formImg;
    formValues.description = [formValues.description];
    formValues.category = { id: formValues.category };
    formValues.cities = { id: formValues.cities };
    formValues.policy.houseRules = [formValues.policy.houseRules];
    formValues.policy.healthAndSecurity = [formValues.policy.healthAndSecurity];
    formValues.policy.cancelPolicy = [formValues.policy.cancelPolicy];

    const { name, address, description, pricePerNight, referencias, latitude, longitude, policy, checkInRange_list, images } = formValues;
    let validate = !name.length || !address.length || !description.length || !pricePerNight.length || !referencias.length || !latitude.length || !longitude.length ||
      !policy.length || !checkInRange_list.length || !images.length;

    //VALIDAR CAMPOS VACIOS
    // if (validate === true) {
    //   setAlert('los campos no pueden ir vacios');
    //   return;
    // };

    // if (formValues.images.length < 5) {
    //   setAlert('no pueden haber menos de 5 imagenes');
    //   return;
    // };

  
    postProduct(formValues)
    OpenModalSuccess()
    console.log("exito");

    // setAlert();
  };

  return (
    <div className="unc-create-container">
      <div className="unc-create-admin">
        <h2>Administración</h2>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="unc-icon-back"
          onClick={goBack}
        />
      </div>
      <div className="unc-create-product">
        <h2 className="unc-create-title">Crear Propiedad</h2>
        <div className="unc-product-container">
          <form className="unc-form-product" onSubmit={handleSubmit}>
            <div className="unc-create-inputs">
              <div className="unc-create-input">
                <p>Nombre de la propiedad</p>
                <input type="text" name="name" value={formValues.name} onChange={handleChange} />
              </div>
              <div className="unc-create-input">
                <p>Categoria</p>
                <select name="category" value={formValues.category} onChange={handleChange}>
                  <option value=''>Elige una opción</option>
                  {
                    category.map((opcion, idx) => (
                      <option key={idx} value={opcion.id}>{opcion.title}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="unc-create-inputs">
              <div className="unc-create-input">
                <p>Dirección</p>
                <input type="text" name="address" value={formValues.address} onChange={handleChange} />
              </div>
              <div className="unc-create-input">
                <p>Ciudad</p>
                <select name="cities" value={formValues.cities} onChange={handleChange}>
                  <option value='default'>Elige una opción</option>
                  {
                    houses.map((opcion, idx) => (
                      <option key={idx} value={opcion.id}>{opcion.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="unc-create-inputs">
              <div className="unc-create-input">
                <p>Precio por noche</p>
                <input type="text" name="pricePerNight" value={formValues.pricePerNight} onChange={handleChange} />
              </div>
              <div className="unc-create-input">
                <p>Distacia</p>
                <input type="text" name="referencias" value={formValues.referencias} onChange={handleChange} />
              </div>
            </div>
            <div className="unc-create-inputs">
              <div className="unc-create-input">
                <p>Latitud</p>
                <input type="text" name="latitude" value={formValues.latitude} onChange={handleChange} />
              </div>
              <div className="unc-create-input">
                <p>longitude</p>
                <input type="text" name="longitude" value={formValues.longitude} onChange={handleChange} />
              </div>
            </div>
            <div>
              <h2 className="unc-create-title">Agregar horario de entrada</h2>
              <div className="unc-create-icons">
                {
                  hours.map((hour, idx) => (
                    <div className="unc-create-icon" key={idx}>
                      <div className='gv-checkbox-container unc-icons-product'>
                        <label className='gv-checkbox-label' >
                          <input
                            type="checkbox"
                            className='gv-checkbox-input'
                            value={hour}
                            onChange={handleChangeHour}
                          />
                          <span className='gv-checkbox-span'></span>
                        </label>
                        <p>{hour}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="unc-create-input">
              <p className="unc-create-parr">Descripción</p>
              <textarea
                name="description"
                value={formValues.description} onChange={handleChange}
                cols="30"
                rows="10"
                placeholder="Escribe aqui"
              />
            </div>
            <div>
              <h2 className="unc-create-title">Agregar atributos</h2>
              <div className="unc-create-icons">
                {caracteristicas.map((icon, idx) => (
                  <div className="unc-create-icon" key={idx}>
                    <div className='gv-checkbox-container unc-icons-product'>
                      <label className='gv-checkbox-label' >
                        <input
                          type="checkbox"
                          className='gv-checkbox-input'
                          value={icon.value}
                          onChange={handleChangeCheckbox}
                        />
                        <span className='gv-checkbox-span'></span>
                      </label>
                      <p>{icon.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h2 className="unc-create-title">Politicas del producto</h2>
            <div className="unc-create-politic">
              <div className="unc-create-politic-card">
                <h3>Normas de la casa</h3>
                <div className="unc-create-input">
                  <span>Descripción</span>
                  <textarea
                    value={formPolicy.houseRules} onChange={handleChangePolicy}
                    name="houseRules"
                    cols="30"
                    rows="10"
                    placeholder="Escribe aqui"
                  />
                </div>
              </div>
              <div className="unc-create-politic-card">
                <h3>Salud y seguridad</h3>
                <div className="unc-create-input">
                  <span>Descripción</span>
                  <textarea
                    value={formPolicy.healthAndSecurity} onChange={handleChangePolicy}
                    name="healthAndSecurity"
                    cols="30"
                    rows="10"
                    placeholder="Escribe aqui"
                  />
                </div>
              </div>
              <div className="unc-create-politic-card">
                <h3>Políticas de cancelación</h3>
                <div className="unc-create-input">
                  <span>Descripción</span>
                  <textarea
                    value={formPolicy.cancelPolicy} onChange={handleChangePolicy}
                    name="cancelPolicy"
                    cols="30"
                    rows="10"
                    placeholder="Escribe aqui"
                  />
                </div>
              </div>
            </div>
            <div className='unc-create-img'>
              <h2 className="unc-create-title">Cargar imágenes</h2>
              <div className="unc-create-icons">
                <div className='unc-create-url'>
                  <input type="text" name="url" value={formImg1.url} onChange={handleChangeImg} placeholder="insertar https://" />
                  <span className='unc-create-btn' onClick={handleUrl}>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
              </div>
              {
                formImg.map((i, idx) => (
                  <div className="unc-create-icons unc-url" key={idx}>
                    <div className='unc-create-url-span'>
                      <span className='unc-create-span'>{i.url}</span>
                      <span className='unc-create-x' onClick={() => handleRemove(i.url)}>
                        <FontAwesomeIcon icon={faX} />
                      </span>
                    </div>
                  </div>
                ))
              }
              <button className='unc-create-submit'>Crear</button>
            </div>
            {/* {alert === '' ? ''
            : <div className='unc-create-alert'>
              {alert}
            </div>
          } */}

          </form>
          <ModalProduct isOpen={isOpenModalSuccess} closeModal={closeModalSucess} success={closeModalSucess}>
            <FontAwesomeIcon className="plc-modal-icon-success" icon={faCircleCheck} />
            <div className='plc-modal-text-container'>
              <h3>¡Muchas gracias!</h3>
              <h4>Su ha creado correctamente la propiedad.</h4>
            </div>
          </ModalProduct>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
