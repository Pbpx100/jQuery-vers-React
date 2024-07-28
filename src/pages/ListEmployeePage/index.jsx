/* react */
import React, { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
/* redux  */
import { useSelector } from 'react-redux'
import { selectEmployees } from "../../redux/selector"
/* employee columns     */
import { employeeColumns } from '../../components/Table/employeeColumns'
/* css  */
import styles from './listEmployeePage.module.css'


/**
 * Const Table import the component table with lazy for optimize perf.
 *  Lazy call the component when is necessary
 */
const Table = lazy(() => import("../../components/Table/Table"))


/**
 * @function ListEmployeePage
 * @export
 * @description List employee page 
 * @return {HTMLElement} component generated HTML
 */
export default function ListEmployeePage() {

    //// Use Selector for extract: employee (state)
    const employeState = useSelector(selectEmployees)
    //console.log("state employee:",employeState)

    /* hook useMemo for optimize the react speed. useMemo store
     a value in the memory and not re-excute if the value not change */
    const columns = React.useMemo(() => employeeColumns, [])
    const data = React.useMemo(() => employeState, [employeState])

    return (
        <main>
            <div className={styles.tableContainer}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Table columns={columns} data={data} />
                </Suspense>
            </div>

            <div className={styles.btnContainer}>
                <Link to="/"><button>Home</button></Link>
            </div>

        </main>
    )
}