import React, { Component } from "react";
import classes from './Person.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'

class Person extends Component {

    constructor(props) {
        super(props)
        this.elementRef = React.createRef();
    }

    static contextType = AuthContext;
    
    componentDidMount() {
        console.log('[Person.js] ',this.context)
        console.log(this.elementRef)
        this.elementRef.current.focus()
        // document.querySelector('input').focus();
    }
    
    render()
    {
        console.log(`[Person.js] Render hook called.`)
        return (
                <Auxiliary>
                   
                        {this.context.authenticated?<p>Authenticated</p>:<p>Please Login</p>}
                   
                    <p  onClick={this.props.click}>I am {this.props.name}, my age is {this.props.age} </p>
                    {this.props.children}
                    <input 
                        type="text" 
                        onChange={this.props.change} 
                        value={this.props.name} 
                        // ref={(el)=>this.ele=el}
                        ref={this.elementRef}
                    />
                </Auxiliary>
        )
            
        

    }
    // let random = Math.random();
    // if(random > 0.7) {
    //     throw new Error('some error occured in person component.');
    // }
    
    
}

Person.propTypes = {
    click:PropTypes.func,
    name:PropTypes.string,
    age:PropTypes.number,
    change:PropTypes.func
}

export default withClass(Person,classes.Person);