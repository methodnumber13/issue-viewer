import './App.css';
import { Routes } from './routes';
import { Layout } from './components';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
};

export default App;
