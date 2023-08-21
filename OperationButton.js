import { ACTIONS } from './App.js'

export default function OperationButton({ operation, dispatch, className}) {
   

    return (
        <button
            onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
            className={className}
        >
            {operation}
        </button>
        )
}