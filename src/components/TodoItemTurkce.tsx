import React, { useState } from "react";

interface TodoItemDeğişkenleri {
    todo: string
    todoDüzenleme: (todoGüncellendi: string) => void
    todoSilme: () => void
}

const TodoItemleri: React.FunctionComponent<TodoItemOzellikleri> = ({todo, todoDüzenleme, todoSilme}) => {

    const  [liste, setListe] = useState()
    const  [yeniBaşlık, setYeniBaşlık] = useState("")

    const yeniEkle = title => {
        setListe([...liste, {id: Date.now(), başlık: title, tamamlandı: false}])
    }


    return(
        <div>

        </div>
    )
}