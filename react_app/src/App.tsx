import Card, { CardBody } from "./components/Card";
import List from "./components/List";
//Componente raiz
function App() {
  const list = ["Gundam", "Guncannon", "Guntank"];
  const handleSelect = (element: string) => {
    console.log("imprimiendo ", element);
  };

  const handleSelect2 = (element: string) => {
    console.log("mostrando ", element);
  };
  return (
    <Card>
      <CardBody title="Hola mundo" text="Este es el texto" />
      <List data={list} onSelect={handleSelect} />
      <List data={list} onSelect={handleSelect2} />
    </Card>
  );
}

export default App;
