
import React from 'react'
import { Button } from 'semantic-ui-react'
import { ContextProvider } from "../../utils/ServerIO2";
export default function Terapia(props) {

    /*let bat = spawn.spawn("cmd.exe", [
        "/c",          // Argument for cmd.exe to carry out the specified script
        "C:\\Users\\emili\\Desktop\\PythonSocketIO\\app.py", // Path to your file
        "argument1",   // First argument
        "argumentN"    // n-th argument
    ]);*/
    console.log(props)
    return (
        <ContextProvider>
            <div>
                <h2>Momentaneamente pruba</h2>
            </div>
            </ContextProvider>
       
    )
}