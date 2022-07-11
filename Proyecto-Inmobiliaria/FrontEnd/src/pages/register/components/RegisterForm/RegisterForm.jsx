import React, { useState, useEffect } from "react";
import { useForm } from "../../../../hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./registerForm.css";
import { Link } from "react-router-dom";
import { validationsForm, initialForm, styles } from "./formUtils.js"
import { postUser } from "../../../../services/user.service";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import { useStore } from "../../../../store/StoreProvider";
import Spinner from "../../../../components/spinner/Spinner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );
  const { login } = useUser();
  const { isLogged } = useStore(); 

  const handlePost = () => {
    if (noErrors(errors)) {
      setIsLoading(true);
      postUser(form).then((res) => {
        if (res.status != 201) {
          swal("Lamentablemente no ha podido registrarse. Por favor, intente más tarde");
          setIsLoading(false);
        } else {
          const email = form.email;
          const password = form.password;
          const { stateLogin } = login({ email, password });
          setIsLoading(false);
          if (stateLogin === "error") {
            setIsLoading(false);
            swal("Lamentablemente no ha podido iniciar sesión. Por favor, intente más tarde");
          }
        }
      })

    }
  }

  

  useEffect(() => {
    if (isLogged) {
      return navigate("/");
    }
  }, [isLogged]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  }

  const noErrors = (errors) => {
    let resp = false;
    if (Object.keys(errors).length === 0) {
      resp = true;
    }
    return resp
  }

  return (
    <>
      {isLoading ? <Spinner height={"90vh"}/> :
        <div className="principalRegister">
        <form className="formRegister" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>
          <div className="gv-input-container-register">
            <input
              className="gv-input-register"
              type="text"
              name="name"
              id="name"
              placeholder=" "
              value={form.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label htmlFor="name" className="gv-label-register">Nombre</label>
            {errors.name && <p style={styles}>{errors.name}</p>}
          </div>
          <div className="gv-input-container-register">
            <input
              className="gv-input-register"
              type="text"
              name="lastName"
              id="lastname"
              placeholder=" "
              value={form.lastname}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label htmlFor="lastName" className="gv-label-register">Apellido</label>
            {errors.lastName && <p style={styles}>{errors.lastName}</p>}
          </div>
          <div className="gv-input-container-register">
            <input
              className="gv-input-register"
              type="email"
              name="email"
              id="email"
              placeholder=" "
              value={form.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label htmlFor="email" className="gv-label-register">Correo electrónico</label>
            {errors.email && <p style={styles}>{errors.email}</p>}
          </div>
          <div className="gv-input-container-register">
            <div className="unc-password">
              <input
                className="gv-input-register"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder=" "
                value={form.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label htmlFor="password" className="gv-label-register">Contraseña</label>
              {showPassword ? <FontAwesomeIcon className="faEyeSlashIcon" icon={faEyeSlash} onClick={handleClickShowPassword} /> : <FontAwesomeIcon className="faEyeSlashIcon" icon={faEye} onClick={handleClickShowPassword} />}
            </div>
            {errors.password && <p style={styles}>{errors.password}</p>}
          </div>
          <div className="gv-input-container-register">
            <div className="unc-password">
              <input
                className="gv-input-register"
                type={showPasswordConfirmation ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder=" "
                value={form.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword" className="gv-label-register">Confirmar contraseña</label>
              {showPasswordConfirmation ? <FontAwesomeIcon className="faEyeSlashIcon" icon={faEyeSlash} onClick={handleClickShowPasswordConfirmation} /> : <FontAwesomeIcon className="faEyeSlashIcon" icon={faEye} onClick={handleClickShowPasswordConfirmation} />}
            </div>
            {errors.confirmPassword && (
              <p style={styles}>{errors.confirmPassword}</p>
            )}
          </div>

          <div className="unc-submit">
            <button type="submit" onClick={handlePost}>Crear cuenta</button>
            <span className="plc-span-form">
              ¿Ya tienes una cuenta?
              <Link className="anchor-link" to={"/login"}>  Iniciar Sesión</Link>
            </span>
          </div>
        </form>
      </div>}
    </>
  );
}
