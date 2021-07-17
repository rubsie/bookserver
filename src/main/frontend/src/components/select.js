import React from "react";


export function MySelectMultiple(props) {
    const {required, value, onChange, children} = props;
    console.log({value});
    return <select className=" form-control mt-2"
                   aria-label="multiple select example"
                   multiple required={required}
                   value={value}
                   onChange={onChange}>
        <option> </option>
        {children}
    </select>;
}