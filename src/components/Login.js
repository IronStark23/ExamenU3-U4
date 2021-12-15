import React, {useState, useCallback} from "react";
import {auth, db} from '../firebase';
import { withRouter } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const [esRegistro, setEsRegistro] = useState(false)

    const enviardatos = e =>{
        e.preventDefault()

        if(!email.trim()){
            setError('Rellene el campo email');
            return
        }

        if(!pass.trim()){
            setError('Rellene el campo password');
            return
        }

        setError(null);

        if(esRegistro){
            registrar();
        }
        else{
            login1();
        }
    }

    const registrar = useCallback(async() => {
            try {
                const res = await auth.createUserWithEmailAndPassword(email, pass) 

                await db.collection(res.user.uid).add({
                    name: 'Bienvenido',
                    fecha: Date.now()
                })

                setEmail('')
                setPass('')
                setError(null)

                props.history.push('/admin')

            } catch (error) {
                console.log(error);
                if(error.code === 'auth/invalid-email'){
                    setError('La dirección de correo electrónico está mal formateada')
                }

                if(error.code === 'auth/email-already-in-use'){
                    setError('La dirección de correo electrónico ya está siendo utilizada por otra cuenta.')
                }
            }
        },
        [email, pass]
    )

    const login1 = useCallback(async() => {
            try {
                const res = await auth.signInWithEmailAndPassword(email, pass)

                setEmail('')
                setPass('')
                setError(null)
                props.history.push('/admin')

            } catch (error) {
                console.log(error)
                if(error.code === 'auth/user-not-found'){
                    setError('No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.')
                }

                if(error.code === 'auth/wrong-password'){
                    setError('La contraseña no es válida o el usuario no tiene contraseña.')
                }
            }
        },
        [email, pass] 
    )

    return (
        <div className="mt-5 container">
            <hr/>
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de Usuario' : 'Login de acceso'
                }
            </h3>
            
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={enviardatos}>
                        {
                            error ? (<div className="alert alert-warning">
                                        {error}
                                    </div>) : null
                        }
                        <input  type="email" className="form-control mb-2" placeholder="Ingrese Email" onChange = {e => setEmail(e.target.value)} value= {email} />
                        <input type="password" className="form-control mb-2" placeholder="Ingrese Contraseña minimo 6 caracteres" minlength="6" onChange = {e => setPass(e.target.value)} value= {pass} />
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-outline-dark" type="submit" >
                                Ingresar
                            </button>
                            <button className="btn btn-outline-danger" type="button" onClick = {() => setEsRegistro(!esRegistro)} >
                                {
                                    esRegistro ? '¿Ya Tienes Cuenta?' : '¿No tienes cuenta?'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter (Login)