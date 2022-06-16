import { Container } from "./components/styles/Container.styled";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./components/styles/Global";
import content from "./content";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {

  const theme = {
    colors :{
      header : "#ebfbff",
      body : "#fff",
      footer : "#003333"
    },
    mobile:'900px'
  }
  return (
    <ThemeProvider theme={theme}>
    <>
     <GlobalStyles />
      <Header />
      <Container>

        {content.map((item) => {
          return (<Card key = {item.id} id={item.id} title={item.title} body={item.body} image={item.image} />)
        })}
        
      </Container>
      <Footer />
    </>
    </ThemeProvider>
  );
}

export default App;
