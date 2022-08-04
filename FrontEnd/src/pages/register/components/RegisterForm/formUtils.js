export const initialForm = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export let styles = {
  fontWeight: "bold",
  color: "#FF0000",
  fontSize: "14px",
  textAlign: "end",
  position: "absolute",
  bottom: "-20px",
  right: "0px"
};

export const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-zA-Z]+[/.]\w{2,}$/;
  let regexPassword = /^.{6,}$/;

  if (!form.name.trim()) {
    errors.name = "Campo requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "Caracteres no válidos";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Campo requerido";
  } else if (!regexName.test(form.lastName.trim())) {
    errors.lastName = "Caracteres no válidos";
  }

  if (!form.email.trim()) {
    errors.email = "Campo requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El formato es incorrecto";
  }

  if (!form.password.trim()) {
    errors.password = "Campo requerido";
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password = "Se necesitan mínimo 6 caracteres";
  }

  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "Campo requerido";
  } else if (form.confirmPassword.trim() !== form.password.trim()) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  } else if (!regexPassword.test(form.confirmPassword.trim())) {
    errors.confirmPassword = "Se necesitan mínimo 6 caracteres";
  }

  return errors;
};

