import React, {Component} from 'react';

import _ from 'lodash'
import ReactPaginate from 'react-paginate'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Loader from '../Loader/Loader'
import Table from '../Table/Table'
import TableSearch from '../TableSearch/TableSearch'

export default class ClientsTable extends Component {

    state = {
        isLoading: true, // 1 - Грузится/не грузится (тру, тк массив пустой изначально и его назо загрузить из апи)
        clientsArray: [], // 1 - массив пользователей (изначально пуст),
        sortDirection: 'asc', // направление сортировки (по умол asc),
        sortField: '', // сортируем поле id по умолч
        sortIcon: '', // икока сортировки
        client: null, // чтобы при клике на клиента открывались его детали
        currentPage: 0, // номер страницы для пагинации
        search: '', // отображение для поисковика
    };

    // 1 - подключение к API, где после отрисовки ДОМа (ЖЦ) получаем массив пользователей
    async componentDidMount() {
        const response = await fetch(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`);
        const data = await response.json();
        // записываем в стейт массив, полученный из апи => статус фолс
        this.setState({
            isLoading: false,
            clientsArray: data
        })
    }

    // 2 - сортировка. сперва отловили клик по шапке (sortField)
    onSort = (sortField) => {
        // копия массива
        let clonedArray = this.state.clientsArray.concat();
        // определение направления
        const sortType = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        // устанавливаем иконку стрелочки в зависимости от направления сортировки
        this.setState({
            sortIcon: this.state.sortDirection === 'asc' ? (<ArrowDropUpIcon />) : (<ArrowDropDownIcon />)
        });
        // отсортированный массив - получаем сортировкой из Лодаш, в аргументах: массив, поле (шапка), направление
        const orderedArray = _.orderBy(clonedArray, sortField, sortType);
        // записываем в стэйт новые значения
        this.setState({
            // меняем исх-й массив на отсортированныей
            clientsArray: orderedArray,
            sortDirection: sortType,
            // запоминаем поле, которое сортировали
            sortField: sortField
        });
    };

    // 3 - выбор клиента для отображения деталей
    onClientSelect = client => {
        console.log(client);
        this.setState({
            client: client
        });
    };

    // 6 - пагинация - переключение по страницам
    handlePageClick = ({selected}) => {
        this.setState({
            currentPage: selected
        })
    };

    // 7 - поисковик, учитываем сброс на первую страницу
    searchHandler = search => {
        console.log(search);
        this.setState({
            search: search,
            currentPage: 0,
        })
    };
    getFilteredArray() {
        const {clientsArray, search} = this.state;
        if(!search) {
            return clientsArray;
        }
        return clientsArray.filter(item => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
            || item['lastName'].toLowerCase().includes(search.toLowerCase())
            || item['email'].toLowerCase().includes(search.toLowerCase())
        })
    }


    render() {
        const pageSize = 20; // кол-во отображаемых строк массива на странице
        // 7 - формируем массив относительно отфильтрованных данных
        // добавляем эту переменную в строку ниже вместо this.state.clientsArray,
        // тк надо отображать искомые элементы массива
        const filteredArray = this.getFilteredArray();
        // 8 - получение количества пагинируемыхс траниц
        const pageCount = Math.ceil(filteredArray.length/pageSize);
        // 6а - пагинация - отображение по 20 штук на странице - метод чанк принимает два аргумента
        // массив и кол-во отображаемых элементов массива, и обращаемся к его индексу
        const displayedArrayPart = _.chunk(filteredArray, pageSize)[this.state.currentPage];

        return(
            <div className='container'>
                {
                    this.state.isLoading
                        ? <Loader />
                        : <React.Fragment>
                            <TableSearch
                                onSearch={this.searchHandler}
                            />
                            <Table
                                clientsArray={displayedArrayPart}
                                onSort={this.onSort}
                                sortDirection={this.state.sortDirection}
                                sortField={this.state.sortField}
                                sortIcon={this.state.sortIcon}
                                onClientSelect={this.onClientSelect}
                            />
                        </React.Fragment>
                }

                {
                    this.state.clientsArray.length > pageSize
                        ?   <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}

                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-item'
                                nextClassName='page-item'
                                previousLinkClassName='page-link'
                                nextLinkClassName='page-link'

                                forcePage={this.state.currentPage}
                            />
                        : null
                }
            </div>
        )
    }
}