import React,{ useState } from "react";
import './App.css';
import Person from "./Person/Person";
const App = () => {
    const [ persornState, setPersonState] = useState({
        persons: [
            { name: "bhavesh", age: "27" },
            { name: "suresh", age: "26" },
            { name: "kapil", age: "29" }
        ],
    })

    const [otherState, setOtherState] = useState({
        otherThing: "this is the other thing"
    })


    console.log(persornState, otherState)
    const swithNameHandler = () => {
        
        // persornState.persons[0].name = 'hero';
        setPersonState({
            persons: [
                { name: "state", age: "27" },
                { name: "suresh", age: "26" },
                { name: "kapil", age: "35" }
            ],
        })

    }

    return (
        <div className="App">
            <p>THis is my first react app.</p>
            <button onClick={swithNameHandler}>Swtich state</button>
            <Person name={persornState.persons[0].name} age={persornState.persons[0].age} />
            <Person name={persornState.persons[1].name} age={persornState.persons[1].age} />
            <Person name={persornState.persons[2].name} age={persornState.persons[2].age} > <p>This is also a some text</p> </Person>
        </div>
    );
}

export default App