import Card, { CardBody } from "./components/Card";
import Button from "./components/Button";
import List from "./components/List";
import { useState } from "react";
//Componente raiz

function App() {
  const [data, setData] = useState(["Gundam", "Guncannon", "Guntank"]);
  // const [isLoading, setIsLoading] = useState(false);
  // const handleClick = () => setIsLoading(!isLoading);

  // const list: string[] = ["Gundam", "Guncannon", "Guntank"];
  // const handleSelect = (element: string) => {
  //   console.log("imprimiendo ", element);
  // };

  // const handleSelect2 = (element: string) => {
  //   console.log("mostrando ", element);
  // };

  // return (
  //   <Card>
  //     {/* Renderizado condicional*/}

  //     <CardBody title="Hola mundo" text="Este es el texto" />
  //     {list.length !== 0 ? (
  //       <List data={list} onSelect={handleSelect} />
  //     ) : (
  //       "No hay contenido"
  //     )}
  //     <Button isLoading={isLoading} onClick={handleClick}>
  //       Hola Mundo
  //     </Button>
  //   </Card>
  // );

  //agregar elementos a la lista
  const addMinion = () => setData([...data, "Minion"]);
  const delMinion = () => setData(data.slice(0, -1));
  return (
    <Card>
      <Button onClick={addMinion}>Agregar</Button>
      <Button onClick={delMinion}>Eliminar</Button>
      <List data={data} />
    </Card>
  );
}

export default App;
