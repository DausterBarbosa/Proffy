import React, {SelectHTMLAttributes} from "react";

import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select:React.FC<SelectProps> = ({label, name, options, ...rest}) => {
    return (
        <div className="select">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione</option>
                {
                    options.map(opt => {
                        return <option 
                            key={opt.value}
                            value={opt.value}
                            disabled={opt.value === "-1" || opt.value === "default"}
                            hidden={opt.value === "-1" || opt.value === "default"}
                        >
                            {opt.label}
                        </option>
                    })
                }
            </select>
        </div>
    );
}

export default Select;