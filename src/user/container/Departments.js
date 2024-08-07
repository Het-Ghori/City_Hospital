import React, { useEffect } from 'react';
import TitleBox from '../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../UI/loader/Loader'
import ErrorMsg from '../UI/errorMsg/ErrorMsg';
import { fetchDepartment } from '../redux/slice/DepartmentSlice';

function Departments(props) {
    const dispatch = useDispatch();
    const departmentState = useSelector((state) => state.department);

    useEffect(() => {
        dispatch(fetchDepartment());
    }, []);
    return (
        <>
            {
                departmentState.loading ? <Loader style={{ height: 'calc(100vh - 138px)' }} /> :
                    departmentState.error ? <ErrorMsg style={{height: 'calc(100vh - 138px)'}} text={departmentState.error}/> :
                    <main>
                        <section id="departments" className="departments">
                            <div className="container">
                                <TitleBox titleText='Departments' />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <ul className="nav nav-tabs flex-column">
                                            {
                                                departmentState.department.map((val, i) => {
                                                    return (
                                                        <li key={val.id} className='nav-item'>
                                                            <a className={i === 0 ? 'nav-link active show' : 'nav-link'} data-bs-toggle="tab" href={`#tab-${i + 1}`}>{val.name}</a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="col-lg-9 mt-4 mt-lg-0">
                                        <div className="tab-content">
                                            {
                                                departmentState.department.map((val, i) => {
                                                    return (
                                                        <div key={val.id} className={i === 0 ? 'tab-pane active show' : 'tab-pane'} id={`tab-${i + 1}`}>
                                                            <div className='row'>
                                                                <div className="col-lg-8 details mt-lg-0 mt-4 order-2 order-lg-1">
                                                                    <h3>{val.name}</h3>
                                                                    <p className="fst-italic">{val.desc}</p>
                                                                </div>
                                                                <div className="col-lg-4 text-center order-1 order-lg-2">
                                                                    <img src={val.prec} alt="img" className="img-fluid" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
            }
        </>
    );
}

export default Departments;