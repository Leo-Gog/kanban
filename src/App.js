import Kanban from "./kanban";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  body {
    background-color: #f2f2f2;
    color: #343434;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Kanban />
    </>
  );
}

export default App;
