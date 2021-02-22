import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as yup from "yup";
import schema from '../validation/Schema';

const initialValues = {
    name: '',
    instructions: '',
    sizeofPizza: '',
    spinach: false,
    olive: false,
    bacon: false,
    onion: false
}

const initialErrors = {
    name: '',
    instructions: '',
    sizeofPizza: ''
}

export  const Form = () => {

    const [formState, setFormState] = useState(initialValues)
    const [orders, setOrders] = useState([])
    const [formErrors, setFormErrors] = useState(initialErrors)
    const [disabled, setDisabled] = useState(true)
    
    const formSubmit = () => {
        const newOrder = {
            name: formState.name,
            instructions: formState.instructions,
            sizeofPizza: formState.sizeofPizza,
            toppings: ['spinach', 'olive', 'bacon', 'onion'].filter(i => formState[i])
        }
        SendingOrder(newOrder)
    };

    const SendingOrder = newOrder => {
        axios.post('https://reqres.in/api/users', newOrder)
        .then(res => {
            setOrders([res.data, ...orders])
            setFormState(initialValues)
        })
        .catch(err => console.log(err.response));
    };

    const inputChange = (name, value) => {
        yup.reach(schema, name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,[name]: ''
            })
        })
        .catch((err) => {
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            })
          })

        setFormState({...formState, [name]: value})
    };
    
    useEffect(() => {
        schema.isValid(formState).then((valid) => {
          setDisabled(!valid);
        });
    }, [formState]);
    
    const onChange = e => {
        const {name, value, type, checked} = e.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        inputChange(name, valueToUse);
    };

    const onSubmit = e => {
        e.preventDefault()
        formSubmit()
    };
    
    return (
        <div>
         <form onSubmit={onSubmit}>           
            <label htmlFor="name">
              Customer's Name
              <input 
                type='text'
                name='name'
                value={formState.name}
                onChange={onChange}
               />
            <p className='error'>{formErrors.name}</p>
            </label>            
            <label htmlFor='sizeofPizza'>
                What pizza size do you want?
                <select id='size' name='sizeofPizza'onChange={onChange} value={formState.size}>
                    <option value=''>-- Choose a size --</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='extra large'>Extra Large</option>
                </select>
            <p class='error'>{formErrors.sizeofPizza}</p>    
            </label>       
            <label htmlFor='spinach'>
                Spinach
                <input
                    type="checkbox"
                    name="spinach"
                    checked={formState.spinach}
                    onChange={onChange}
                />
            </label>
            <label htmlFor='olive'>
                Olive
                <input
                    type="checkbox"
                    name="olive"
                    checked={formState.olive}
                    onChange={onChange}
                />
            </label>       
            <label htmlFor='bacon'>
                Bacon
                <input
                    type="checkbox"
                    name="bacon"
                    checked={formState.bacon}
                    onChange={onChange}
                />
            </label>      
            <label htmlFor='onion'>
                Onion
                <input
                    type="checkbox"
                    name="onion"
                    checked={formState.onion}
                    onChange={onChange}
                />
            </label>
            <div>       
            <label htmlFor='instructions'>
                Instructions
                <input 
                type='text'
                name='instructions'
                value={formState.instructions}
                onChange={onChange}
                />
            </label>
            </div> 
            <button disabled={disabled}>Submit</button>
            </form>

            <div>
                {orders.map(i => 
                 <div key={i.id}>
                    <p>Customer's Name: {i.name}</p>                    
                    <p>Size: {i.sizeofPizza}</p>
                    <p>Toppings: {i.toppings}</p>
                    <p>Instructions: {i.instructions}</p>                    
                 </div>)}
            </div>
        </div>
    )
};

export default Form;
