
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function Login() {
    const [value, setValue] = useState<string>('');

    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
                <InputText id="username" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                <label htmlFor="username">Username</label>
            </span>
        </div>
    )
}
        