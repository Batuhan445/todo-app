import React from "react"

interface ClearCompletedProps {
    onClearCompleted: () => void
}

const clearCompleted: React.FunctionComponent<ClearCompletedProps> = ({onClearCompleted}) => {
    return (
    <button 
    className="border px-2 py-1 rounded bg-emerald-600 text-white" 
    onClick={onClearCompleted}>
        Tamamlananları Temizle
    </button>
    )

}


export default clearCompleted