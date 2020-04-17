import React from 'react';
import classes from './Table.module.css'
import {withRouter} from 'react-router-dom'

const Table = (props) => {

    if (!props.clientsArray) {
        return <h4 style={{color: 'var(--warning-color)', marginBottom: '30px'}}>This client is not found!</h4>;
    }

    return (
        <div className={classes.table}>
            <table className='table'>
                <thead className={classes.thead}>
                    <tr>
                        {/* Сортировка*/}
                        <th onClick={() => props.onSort('id')}
                            className={classes.columnSort}
                            title="Click here to sort">
                            ID {props.sortIcon}
                        </th>
                        <th onClick={() => props.onSort('firstName')}
                            className={classes.columnSort}
                            title="Click here to sort">
                            First Name {props.sortIcon}
                        </th>
                        <th onClick={() => props.onSort('lastName')}
                            className={classes.columnSort}
                            title="Click here to sort">
                            Last Name {props.sortIcon}
                        </th>
                        <th className={classes.column}>
                            Email
                        </th>
                        <th className={classes.column}>
                            Phone
                        </th>
                    </tr>
                </thead>

                <tbody>
                {/* 1 - из пропсов с сервера приходит массив пользователей */}
                {props.clientsArray.map(client => (
                    <tr
                        key={client.id + client.phone}
                        className={classes.row}
                        // 3 - выводим данные пользователя по клику на строку
                        onClick={() => {
                            props.history.state = {
                                firstName: client.firstName,
                                lastName: client.lastName,
                                description: client.description,
                            };
                            props.history.push('/clients/' + client.id);
                            props.history.push({
                                state: {
                                    name: `${client.firstName} ${client.lastName}`,
                                    description: client.description,
                                    address: client.address.streetAddress,
                                    city: client.address.city,
                                    state: client.address.state,
                                    zip: client.address.zip,
                                }
                            });
                        }}
                    >
                        <td>{client.id}</td>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
};

export default withRouter(Table);
