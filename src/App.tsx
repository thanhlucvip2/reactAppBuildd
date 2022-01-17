import { useEffect, useState } from "react";
import "./App.css";
export default function App(props: {}) {
  const [data, setData] = useState("");
  const [listItem, setListItem] = useState(
    localStorage.getItem("data")
      ? (JSON.parse(localStorage.getItem("data") ?? "") as {
          name: string;
          id: number;
        }[])
      : ([] as { name: string; id: number }[])
  );
  // useEffect(() => {
  //   if (localStorage.getItem("data")) {
  //     setListItem(JSON.parse(localStorage.getItem("data") ?? ""));
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(listItem));
  // }, [listItem]);
  useEffect(() => {});
  function changeData(event: any) {
    setData(event.target.value);
  }
  function onAddData() {
    if (data === "") {
      return;
    }
    setListItem((prev) => {
      const newData = [
        ...prev,
        { name: data, id: Math.floor(Math.random() * 1000000) },
      ];
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });

    setData("");
  }
  function onClearDAta(id: number) {
    const newData = listItem.filter((a) => {
      return a.id !== id;
    });
    setListItem((prev) => {
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });
  }
  const [render, setRender] = useState(false);
  return (
    <div className="container">
      <input className="input" onChange={changeData} value={data} />
      <button className="button" onClick={onAddData}>
        Add
      </button>
      <hr />
      <ul>
        {listItem.map((a, b) => {
          return (
            <li key={b}>
              {a.name} <button onClick={() => onClearDAta(a.id)}>X</button>
            </li>
          );
        })}
      </ul>

      <button onClick={() => setRender(!render)}>button</button>

      {render && <Test />}
    </div>
  );
}
function Test() {
  useEffect(() => {
    console.log("didMount");
    return () => {
      console.log("willMount");
    };
  }, []);
  return (
    <div>
      <input />
    </div>
  );
}
