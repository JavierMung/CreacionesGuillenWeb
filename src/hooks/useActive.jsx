import { useState } from "react";

function useActive() {

    const [active, setActive] = useState(true)

    const handleActive = () => { setActive(!active) }
    return { active, handleActive }
}

export default useActive;