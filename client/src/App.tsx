import { Route, Routes } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import Home from './pages/root/Home';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
