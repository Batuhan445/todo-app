import React from "react"

interface ClearCompletedProps {
    onClearCompleted: () => void
}

const clearCompleted: React.FunctionComponent<ClearCompletedProps> = ({onClearCompleted}) => {
    return (
    <button 
    className="border px-4 py-2 rounded border-emerald-600 bg-emerald-600 text-white" 
    onClick={onClearCompleted}>
        Tamamlananları Temizle
    </button>
    )

}


export default clearCompleted