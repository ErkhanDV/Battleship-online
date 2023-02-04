import Header from '../header/Header';
import Footer from '../footer/Footer';
import Background from '../background/Background';

import './App.scss';

import AppRouter from '../router/AppRouter';

const App = () => {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
      <Background />
    </div>
  );
};

export default App;
