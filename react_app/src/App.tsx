import Card, { CardBody } from "./components/Card";
import List from "./components/List";

function App() {
  const list = ["Gundam", "Guncannon", "Guntank"];
  return (
    <Card>
      <CardBody title="Hola mundo" text="Este es el texto" />
      <List data={list} />
    </Card>
  );
}

export default App;
