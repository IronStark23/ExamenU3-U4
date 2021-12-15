import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import Products from './Products';

function Admin(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(auth.currentUser){
            console.log('Usuario activo')
            setUser(auth.currentUser)
        }
        else{
            console.log('Usuario desactivo')
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            <h1>Pagina de administracion</h1>
            {
                user && (
                    <Products user={user}/>
                )
            }
        </div>
    )
}

export default withRouter (Admin)