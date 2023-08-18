import React from "react";

interface TodoDateProps {
  creationDate: string;
  editedDate: string
}

const TodoDate: React.FunctionComponent<TodoDateProps> = ({ creationDate, editedDate }) => {

  return (
    
    <div className="border rounded px-2 py-1 bg-orange-400 text-white text-center">
      Oluşturma Tarihi : {creationDate} <br/>
      {editedDate ? `Düzenleme Tarihi : ${editedDate}` : ""}
    </div>
  );
};

export default TodoDate;