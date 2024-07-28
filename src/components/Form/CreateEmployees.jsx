import React from 'react'
import { useState } from "react"
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import { departmentsList } from '../../data/department.js'
import { statesList } from '../../data/states.js'
import PropTypes from 'prop-types'
import styles from './createEmployees.module.css'
import { useDispatch } from 'react-redux'
import { addEmployee } from "../../redux/employee.js"
import Modal from '../Modal/index.jsx';


export default function CreateEmployees() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState()
    const [startDate, setStartDate] = useState("")

    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [selectedState, setSelectedState] = useState(statesList[0])
    const [zipCode, setZipCode] = useState()

    const [selectedDepartment, setSelectedDepartment] = useState(departmentsList[0])

    const [showModal, setShowModal] = useState(false)

    /*  Send the action */
    const dispatch = useDispatch()

    // Style the modal
    const modal_styles = {
        "backgroundColor": "#6E8414",
        "borderRadius": 10,
        "boxShadow": "rgb(5 60 9) 0px 0px 0px 2px",
        "color": "white",
        "fontSize": 50,
        "height": "fit-content",
        "padding": "20px 50px",
        "width": "fit-content",
        "cursor": "pointer"
    }

    /**
     * @function selectDateBirthHandler
     * @description  select Date birth
     * @param {object} event - date birth
    */
    const selectDateBirthHandler = (event) => {
        setDateOfBirth(event)
    }
    selectDateBirthHandler.prototype = {
        event: PropTypes.object.isRequired,
    }

    /**
     * @function selectDateStartHandler
     * @description  select start date handler
     * @param {object} event - start date 
    */
    const selectDateStartHandler = (event) => {
        setStartDate(event)
    }
    selectDateStartHandler.prototype = {
        event: PropTypes.object.isRequired,
    }

    /**
     * @function reset
     * @description  formulaire reset
     * 
    */
    const reset = () => {
        document.getElementById("createForm").reset()
        setDateOfBirth("")
        setStartDate("")
    }

    /**
    * @function handleSubmit
    * @description  handle submit 
    * @param {object} event - form event
   */
    const handleSubmit = (event) => {
        event.preventDefault()

        let currentDateOfBirth = ""
        let currentStartDate = ""

        //  date format
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' }

        if (dateOfBirth) {
            currentDateOfBirth = dateOfBirth.toLocaleDateString("en-US", options)
        }

        if (startDate) {
            currentStartDate = startDate.toLocaleDateString("en-US", options)
        }

        let currentEmployee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: currentDateOfBirth,
            startDate: currentStartDate,
            street: street,
            city: city,
            state: selectedState.value,
            stateAbbrev: selectedState.abbreviation,
            zipCode: zipCode,
            department: selectedDepartment.value
        }

        // add employee store(redux) 
        dispatch(addEmployee(currentEmployee))


        // currentEmployee reset
        currentEmployee = {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            startDate: "",
            street: "",
            city: "",
            state: "",
            stateAbbrev: "",
            zipcode: "",
            department: ""
        }

        //After submit show modal
        setShowModal(true)
        reset()
    }
    handleSubmit.prototype = {
        event: PropTypes.object.isRequired,
    }


    return (
        <div>
            <form onSubmit={handleSubmit} id="createForm" >

                <div className={styles.createForm}>
                    <fieldset className={styles.adressContainer}>
                        <legend>Personal Data</legend>


                        <div className={styles.informationsContainer}>
                            <div className={styles.informationsContainer__firstName}>
                                <label htmlFor="firstName">First name</label>
                                <p>
                                    <input className={styles.input}
                                        autoComplete="off"
                                        id="firstName"
                                        name="firstName"
                                        aria-label="firstName"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="first name"
                                        type="text"
                                    />
                                </p>
                            </div>
                            <div className={styles.informationsContainer__lastName}>
                                <label htmlFor="lastName">Last name</label>
                                <p>
                                    <input autoComplete="off"
                                        id="lastName"
                                        name="lastName"
                                        aria-label="lastName"
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="last name"
                                        type="text"
                                    />
                                </p>
                            </div>
                            <div className={styles.informationsContainer__firstName}>
                                <label htmlFor="dateBirth">Date of Birth</label>
                                <div>
                                    <DatePicker
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="mm/dd/yyyy"
                                        selected={dateOfBirth}
                                        onChange={selectDateBirthHandler}
                                    />
                                </div>
                            </div>
                            <div className={styles.informationsContainer__lastName}>
                                <label htmlFor="startDate">Start Date</label>
                                <div>
                                    <DatePicker
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="mm/dd/yyyy"
                                        selected={startDate}
                                        onChange={selectDateStartHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className={styles.adressContainer}>
                        <legend>Address</legend>
                        <div className={styles.informationsContainer__firstName}>
                            <label htmlFor="street">Street</label>
                            <p>
                                <input autoComplete="off"
                                    id="street"
                                    name="street"
                                    aria-label="street"
                                    onChange={(e) => setStreet(e.target.value)}
                                    placeholder="street"
                                    type="text"
                                />
                            </p>
                        </div>
                        <div className={styles.informationsContainer__lastName}>
                            <label htmlFor="city">City</label>
                            <p>
                                <input autoComplete="off"
                                    id="city"
                                    name="city"
                                    aria-label="street"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="city"
                                    type="text"
                                />
                            </p>
                        </div>
                        <div className={styles.informationsContainer__select}>
                            <label htmlFor="states">State</label>
                            <Select
                                value={selectedState}
                                defaultValue={selectedState}
                                onChange={setSelectedState}
                                options={statesList}
                                id="states"
                                name="states"
                                aria-label="state"
                                className={styles.select}

                            />
                        </div>
                        <div className={styles.informationsContainer__lastName}>
                            <label htmlFor="zipCode">Zip Code</label>
                            <p>
                                <input autoComplete="off"
                                    type="number"
                                    id="zipCode"
                                    name="ZipCode"
                                    aria-label="street"
                                    placeholder="zip code"
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </p>
                        </div>
                    </fieldset>
                    <div className={styles.departmentContainer}>
                        <div className={styles.informationsContainer__select}>
                            <label htmlFor="department">Department</label>
                            <Select
                                value={selectedDepartment}
                                defaultValue={selectedDepartment}
                                onChange={setSelectedDepartment}
                                options={departmentsList}
                                id="department"
                                name="department"
                                aria-label="department"
                                className={styles.select}
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.btnContainer}>
                    <button id="submit" type="submit">Save</button>
                </div>

                <div className={styles.ModalContainer}>
                    <Modal
                        id="modalEmployeeCreated"
                        showModal={showModal}
                        closeModal={() => setShowModal(false)}
                        parameter={modal_styles}
                        message="Employee Created !"
                    />
                </div>
            </form>
        </div>
    )
}