import { useRef } from "react";

function FocusInput() {
    const inputREf = useRef(null);
    const handleFocus = ()=>{
        inputREf.current.focusFunction;
    };
    return(
        <div>
            <input type="text" placeholder="type something... " ref={inputREf}/>
            <button onClick={handleFocus}>Focus input</button>
        </div>
    );
}

export default FocusInput;