import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import useUser from "../../../../hooks/useUser";
import { useStore } from "../../../../store/StoreProvider";

export default function LoginForm({ bookTriedWithoutLogin, setBookTriedWithoutLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //El context del usuario
  const {login} = useUser();
  const {isLogged} = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);

  }

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const {stateLogin} = login({email, password});
    if(stateLogin === "error"){
      swal("Lamentablemente no ha podido iniciar sesión. Por favor, intente más tarde");
    } else{
      setBookTriedWithoutLogin(false);
    }
  };

  //Si el usuario ya se logeo, lo redirecciona al home
  useEffect(() => {
    if (isLogged) return navigate("/");
  }, [isLogged, navigate]);

  let styles = {
    fontWeight: "bold",
    color: "#FF0000",
    fontSize: "14px",
    textAlign: "end",
    position: "absolute",
    bottom: "-20px",
    right: "0px"
  };

  return (
    <div className="gv-container-login">
      <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
        {
          bookTriedWithoutLogin &&
          <div className="plc-reservation-warning">
            <FontAwesomeIcon className="plc-reservation-warning-icon" icon={faCircleExclamation} />
            <p>Para realizar una reserva necesitas esta logueado</p>
          </div>
        }
        <h2>Iniciar sesión</h2>
        <div className="gv-input-container-login">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            className="gv-input-login"
            {...register("email", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "El formato no es correcto",
              },
            })}
          />
          <label htmlFor="email" className="gv-label-login">Email</label>
          {errors.email && <p style={styles}>{errors.email.message}</p>}
        </div>
        <div className="gv-input-container-login">
          <input
            type={showPassword ? "text" : "password"}
            id="pwd"
            name="pwd"
            placeholder=" "
            className="gv-input-login"
            {...register("password", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <label htmlFor="pwd" className="gv-label-login">Contraseña</label>
          {showPassword ? <FontAwesomeIcon className="faEyeSlashIcon" icon={faEyeSlash} onClick={handleClickShowPassword} /> : <FontAwesomeIcon className="faEyeSlashIcon" icon={faEye} onClick={handleClickShowPassword} />}
          {errors.password && (
            <p style={styles}>{errors.password.message}</p>
          )}
        </div>

        <div className="unc-submit">
          <button type="submit">Ingresar</button>
          <span className="plc-span-form">
            ¿Aún no tienes cuenta?
            <Link className="anchor-link" to={"/register"}>  Registrate</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
