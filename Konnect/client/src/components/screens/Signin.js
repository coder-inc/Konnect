import React from 'react' ;
import {Link} from 'react-router-dom'

const Signin = () =>{
    return (
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>Konnect</h2>
                <input 
                    type='text'
                    placeholder='Email ID'
                />
                <input 
                    type='text'
                    placeholder='Password'
                />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                    Signin
                </button>
                <h5>
                    <Link to='/signup'>Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin ;