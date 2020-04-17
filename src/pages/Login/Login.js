import React from 'react'

export default (props) => {

    return (
        <div className='container'>
            <h1 className='global_h1'>Log in</h1>

                <div style={{width: '400px', margin: '0 auto'}}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={props.onLogin}
                    >Login</button>
                </div>
        </div>
    )
};
