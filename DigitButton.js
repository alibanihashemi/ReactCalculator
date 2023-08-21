
import { ACTIONS } from './App.js'

export default function DigitButton({ dispatch, digit,className }) {
    return (
        
        <button
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })} className={className }> {digit} </button>
    )
}