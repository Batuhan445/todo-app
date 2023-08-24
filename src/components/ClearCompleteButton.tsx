import React from "react"

interface ClearCompletedProps {
    onClearCompleted: () => void
}

const clearCompleted: React.FunctionComponent<ClearCompletedProps> = ({onClearCompleted}) => {

    const deleteAllTodoAlert = () => {
        if (window.confirm("Birden fazla listeyi silmek üzeresiniz. Emin misiniz?")) {
            onClearCompleted()
            setTimeout (() => {
                alert("Listeler başarıyla silindi");
              }, 100)
        }
    }


    return (
    <button 
    className="border px-4 py-2 rounded border-emerald-600 bg-emerald-600 text-white" 
    onClick={deleteAllTodoAlert}>
        Tamamlananları Temizle
    </button>
    )

}


export default clearCompleted