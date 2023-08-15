import React from "react";

interface TodoDateProps {
  creationDate: string;
}

const TodoDate: React.FunctionComponent<TodoDateProps> = ({ creationDate }) => {

  return (
    
    <div className="border rounded px-2 py-1 bg-orange-400 text-white">
      Oluşturma tarihi : {creationDate}
    </div>
  );
};

export default TodoDate;