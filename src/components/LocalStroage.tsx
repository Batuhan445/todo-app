interface todoListesi {
  id: number;
  başlık: any;
  tamamlandı: boolean;
  oluşturmaTarihi: string;
}

export function saveListToLocalStorage(liste: todoListesi[]) {
  localStorage.setItem("todoList", JSON.stringify(liste));
}

export function loadListFromLocalStorage(): todoListesi[] | null {
  const storedList = localStorage.getItem("todoList");
  if (storedList) {
    return JSON.parse(storedList);
  }
  return null;
}