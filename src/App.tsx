import { Button, Card, CardActions, CardContent, Grid2 } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import SideMenu from './components/template/SideMenu';
import FormXmlEditor from './form-xml-editor'; // Import the new component

function App() {

  const [sideMenuWidth, setSideMenuWidth] = useState(60)

  return (
    <BrowserRouter>
      <SideMenu width={sideMenuWidth} setWidth={setSideMenuWidth} />
      <main style={{
        marginLeft: `${sideMenuWidth}px`,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
      }}>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        <Routes>
          <Route path="/form-xml-editor" element={<FormXmlEditor />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function Index() {
  return (
    <>
      <h1>Home</h1>
      <p>
        Welkom bij de Medicore Tools. We maken het gebruik van Medicore hiermee nog gemakkelijker!
      </p>
      <p>
        <b>Disclaimer:</b> dit is ontwikkeld buiten Medicore om en is niet gelieerd aan Medicore.
        <br />
        Deze site is gemaakt door <a href='https://www.linkedin.com/in/dennis-rosenbaum/' target='_blank' rel='noreferrer'>Dennis Rosenbaum</a> vanuit <a href='https://www.dem-it.nl' target='_blank' rel='noreferrer'>Dem IT</a> en is Open Source beschikbaar via <a href='https://github.com/dem-it/medicore-tools' target='_blank' rel='noreferrer'>GitHub</a>.
        <br />
        <b>Issues of problemen:</b> <a href='https://github.com/dem-it/medicore-tools/issues' target='_blank' rel='noreferrer'>Meld al je problemen en vragen hier.</a>
      </p>
      <hr />
      <Grid2 container spacing={2}>
        <Grid2>
          <Card>
            <CardContent>
              <h2>Formulier XML editor</h2>
              <p>
                Pas een Medicore formulier gemakkelijk aan door middel van drag en drop.
              </p>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/form-xml-editor">
                Ga naar de Form XML Editor
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      </Grid2>

    </>
  )
}

export default App;
