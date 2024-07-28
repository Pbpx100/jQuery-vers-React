/* react  */
import React from "react"
/*  react-table  */
import { useAsyncDebounce } from 'react-table'


/**
  * @function GlobalFilter
  * @export
  * @description  Define a default UI for GlobalFiltering 
*/
export default function GlobalFilter({
    preGlobalFilteredRows,
    GlobalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(GlobalFilter)
    // The useAsyncDebounce add little delay 
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} entries....`}
            />
        </span>
    )
}