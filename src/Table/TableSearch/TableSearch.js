import React, {useState} from 'react'


export default (props) => {

    const [value, setValue] = useState('');

    const valueChangeHandler = event => {
        setValue(event.target.value)
    };


    return (
        <div
            className="input-group mb-3 mt-3"
            style={{width: '400px'}}
        >
            <input
                type="text"
                className="form-control"
                placeholder="Clients search"
                value={value}
                onChange={valueChangeHandler}
            />

            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => props.onSearch(value)}
                >Search</button>
            </div>
        </div>

    )
};