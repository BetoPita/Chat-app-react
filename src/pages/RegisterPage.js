import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import  Swal  from "sweetalert2";
export const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email, password } = form;
    const resp = await register(nombre, email, password);
    console.log(resp);
    if (!resp.exito) {
      Swal.fire("Error", resp.mensaje, "error");
    }
  };
  const todoOk = () => {
    return form.email.length > 0 &&
      form.password.length > 0 &&
      form.nombre.length > 0
      ? true
      : false;
  };
  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={onChange}
          value={form.nombre}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
          value={form.email}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={form.password}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!todoOk()}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
