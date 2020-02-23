import React, { useEffect,useRef,useContext } from 'react'
import classes from "./Cockpit.module.css";
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {

    const toggleBtnRef = useRef(null)
    const authContext = useContext(AuthContext);
    console.log(authContext);

    useEffect(()=>{
        console.log('[Cockpit.js] use effect called');
        toggleBtnRef.current.click()
    //    let timeOut = setTimeout(()=>{
    //         alert('Cockpit hello world.');
    //     },1000)
        return () =>{
            // clearTimeout(timeOut);
            console.log('[Cockpit.js] use effect return function');
        }
    },[])

    useEffect(()=>{
        console.log('[Cockpit.js] use effect  2nd called');
        return () =>{
            console.log('[Cokpit.js] clean use effect 2nd called')
        }
    })

    console.log(`[Cockpit.js] Render hook called.`)
    let buttonCss = '';
    if(props.toShowPersons)
    {
        buttonCss = classes.Red;    
    }
    
    return (
    <div className={classes.Cockpit}>
        <p>{props.title}</p>
        <button ref={toggleBtnRef} className={buttonCss} onClick={props.clicked}>Swtich state</button>
        {<button  onClick={authContext.login}>Login</button>}
    </div>
    )
}

export default React.memo(Cockpit);