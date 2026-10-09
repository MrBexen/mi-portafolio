type props = {
  titulo: string;
};

function MyButton({ titulo }: props) {
  return <button>{titulo}</button>;
}

export default MyButton;
