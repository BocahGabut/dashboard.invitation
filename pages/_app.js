import '../styles/bootstrap.min.css';
// import '../styles/app.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../styles/app.min.css';
import '../styles/app.scss';
import '../styles/dataTable.scss';
import '../styles/globals.css';
import '../styles/icons.min.css';

function MyApp({
  Component,
  pageProps
}) {
  return <Component {
    ...pageProps
  }
  />
}

export default MyApp