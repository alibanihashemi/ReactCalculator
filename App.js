
import "./styles.css"
import React, { useReducer, useState } from 'react'
import DigitButton from './DigitButton.js'
import OperationButton from './OperationButton.js'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete_digit',
    EVALUATE:'evaluate'

}

function reducer(state, { type, payload }) {

    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            if (payload.digit === "." && state.currentOperand.includes(".")) {
                return state
            }

            if (state.operation === null && state.check === false) {
                return state
            }
       
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.DELETE_DIGIT:
            return {
                ...state,
                currentOperand: state.currentOperand.length>0 ? state.currentOperand.slice(0, -1):'',
            }
        case ACTIONS.CHOOSE_OPERATION:
            if (state.previousOperand == null && state.currentOperand == null) {
                return state
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }

            return {
                ...state,
                operation: payload.operation,
                previousOperand: state.currentOperand ? calculate(state.currentOperand, state.previousOperand, payload.operation) : state.previousOperand,
                check: state.currentOperand ? true : false,
                currentOperand: null,
            }
        case ACTIONS.EVALUATE:
            if (state.previousOperand == null || state.operation==null || state.currentOperand == null) {
                return state
            }
            return {
                
                previousOperand: calculate(state.currentOperand, state.previousOperand, state.operation),
                currentOperand:'',
                operation: null,
                check: false
                

            }
           
            

    }
}

function calculate(currentOperand, preveiousOperand, operation) {
    let curr = parseFloat(currentOperand)
    let prev = parseFloat(preveiousOperand)
    let result = ""
    switch (operation) {
        case "+":
            result = curr + prev
            return result
        case "-":
            result = prev - curr 
            return result
        case "*":
            result = curr * prev
            return result
        case "/":
            result = prev / curr
            return result
    }

}


function App() {
    const [{ currentOperand, previousOperand, operation, check }, dispatch] = useReducer(reducer, { currentOperand:'',check:true })
    
    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand} {operation}</div>
                <div className="current-operand">{currentOperand }</div>

            </div>
            <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR}) }>AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
            <OperationButton operation="/" dispatch={dispatch} />
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton operation="*" dispatch={dispatch} />
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton operation="+" dispatch={dispatch} />
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton operation="-" dispatch={dispatch} />
            <DigitButton digit="." dispatch={dispatch} />
            <DigitButton digit="0" dispatch={dispatch} />
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>


        </div>

        )
}

export default App