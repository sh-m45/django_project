import React, {useEffect, useState} from "react";
import {NotificationServices} from "../../services/NotificationServices";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Ripple} from 'primereact/ripple';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import {Button} from "primereact/button";


export default function Notification() {
    let notificationServices = new NotificationServices();
    let [notifications, setNotifications] = useState([]);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [first2, setFirst2] = useState(0);
    const [rows2, setRows2] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');


    useEffect(() => {
        notificationServices.get(JSON.parse(localStorage.getItem("userData")).user_id).then(data => {
            setNotifications(data.notifications);
        })
    }, []);


    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }

    const onCustomPage2 = (event) => {
        setFirst2(event.first);
        setRows2(event.rows);
    }

    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            } else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }

    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick}
                        disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple/>
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick}
                        disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple/>
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, {'p-disabled': true});

                return <span className={className} style={{userSelect: 'none'}}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple/>
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                {label: 10, value: 10},
                {label: 20, value: 20},
                {label: 50, value: 50},
                {label: 'All', value: options.totalRecords}
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange}/>;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="mx-3" style={{color: 'var(--text-color)', userSelect: 'none'}}>
                    Go to <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                                     onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
                </span>
            )
        }
    };
    const template2 = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                {label: 10, value: 10},
                {label: 20, value: 20},
                {label: 50, value: 50}
            ];

            return (
                <React.Fragment>
                    <span className="mx-1"
                          style={{color: 'var(--text-color)', userSelect: 'none'}}>Items per page: </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange}/>
                </React.Fragment>
            );
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center'}}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        }
    };
    const markNotificationAsRead = (data) => {
        notificationServices.update(data.id).then(data => {
            if (data.success === true) {
                console.log(JSON.parse(localStorage.getItem("userData")))
                notificationServices.get(JSON.parse(localStorage.getItem("userData")).user_id).then(data => {
                    setNotifications(data.notifications);
                });
            }
        })
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-check" className="p-button-rounded p-button-warning"
                        onClick={() => markNotificationAsRead(rowData)}/>
            </React.Fragment>
        );
    }

    return (
        <div className={"d-flex justify-content-center align-items-center h-100 w-100"}>
            <div className="card">
                <DataTable value={notifications} paginator responsiveLayout="scroll"
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}
                           rowsPerPageOptions={[10, 20, 50]}>
                    <Column field="id" header="ID" style={{width: '25%'}}></Column>
                    <Column field="message" header="Message" style={{width: '25%'}}></Column>
                    <Column field="creation_time" header="Created Time" style={{width: '25%'}}></Column>
                    <Column field="status" header="Status" style={{width: '25%'}}></Column>
                    <Column header="Actions" body={actionBodyTemplate} exportable={false}
                            style={{minWidth: '8rem'}}></Column>
                </DataTable>
            </div>
        </div>
    );
}