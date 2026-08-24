import Card, { CardBody } from "./components/Card";
import List from "./components/List";
//Componente raiz

function App() {
  const list: string[] = [];
  const handleSelect = (element: string) => {
    console.log("imprimiendo ", element);
  };

  const handleSelect2 = (element: string) => {
    console.log("mostrando ", element);
  };

  return (
    <Card>
      {/* Renderizado condicional*/}

      <CardBody title="Hola mundo" text="Este es el texto" />
      {list.length !== 0 ? (
        <List data={list} onSelect={handleSelect} />
      ) : (
        "No hay contenido"
      )}
    </Card>
  );
}

export default App;
