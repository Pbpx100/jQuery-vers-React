import React from "react"
/* form component */
import CreateForm from "../../components/Form/CreateEmployees"

/**
 * @function CreateEmployeePage
 * @export
 * @description Create employee page 
 * @return {HTMLElement} component generated HTML
 */
export default function CreateEmployeePage() {

    return (
        <main>
            <CreateForm />
        </main>
    )
}