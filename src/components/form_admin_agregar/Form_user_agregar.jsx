import '../../assets/css/modales_dashboard.css';
import Swal from 'sweetalert2';
import { useRef, useEffect } from "react";
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function Form_user_agregar({ show, onClose, fetchApi }) {
    const modalRef = useRef(null);

    // esto detecta los click que hay fuera del modal y lo cierra
    const ParaModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener("mousedown", ParaModal);
        } else {
            document.removeEventListener("mousedown", ParaModal);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, onClose]);


    const handleSubmit = (event) => {
        event.preventDefault();


        const name = event.target.elements.name.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const role = event.target.elements.role.value;

        const data = {
            name,
            lastName,
            email,
            password,
            role
        };

        axios.post('http://localhost:4000/api/users/', data)
            .then(() => {
                Swal.fire({
                    title: "Usuario añadido",
                    icon: "success",
                    confirmButtonColor: "green",
                    confirmButtonText: "OK"
                });

                onClose();
                fetchApi();
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: "Error: " + error,
                    confirmButtonColor: "green",
                    confirmButtonText: "OK"
                });
                console.error('Error al añadir usuario:', error);
            });
    };


    if (!show) return null;

    return (
        <div className="modal_overlay">
            <div className="modal_content" ref={modalRef}>
                <form className='formulario_inputs_dashboard' onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <input required maxLength="40" className='inputs_datos_dashboard' name='name' type="text" />
                    <br />
                    <label>Apellidos</label>
                    <input required maxLength="40" className='inputs_datos_dashboard' name='lastName' type="text" />
                    <br />
                    <label>Email</label>
                    <input required maxLength="100"  className='inputs_datos_dashboard' name='email' type="email" />
                    <br />
                    <label>Contraseña</label>
                    <input required maxLength="255" className='inputs_datos_dashboard' name='password' type="password" />
                    <br />
                    <label>Rol</label>
                    <select required className='inputs_datos_dashboard' name='role'>
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button type="submit">Añadir</button>
                </form>
            </div>
        </div>
    );
}

export default Form_user_agregar;
