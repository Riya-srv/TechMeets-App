import { useState } from "react";

import Header from "./components/Header"
import useFetch from './useFetch.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Events from "./pages/Events"

function App() {
  const [searchEvent, setSearchEvent] = useState("");
  return (
    <>
    <Header searchEvent={searchEvent} setSearchEvent={setSearchEvent}/>
    <Events searchEvent={searchEvent} />
    </>
  )
}

export default App
