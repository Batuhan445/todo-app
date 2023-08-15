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
            className="border outline-none px-2 py-1 rounded"
            type="text"
        />
    )


}

export default newTodoInput