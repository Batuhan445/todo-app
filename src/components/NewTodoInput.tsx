import React from "react"
interface NewTodoInputProps {
    value: string
    onChange: (newValue: string) => void
    onEnterKey: () => void
}

const newTodoInput: React.FunctionComponent<NewTodoInputProps> = ({value, onChange, onEnterKey}) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onEnterKey();
        }
      };


    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Yeni Todo Ekle"
            className="border outline-none px-3 py-4 rounded w-2/4"
            type="text"
        />
    )


}

export default newTodoInput