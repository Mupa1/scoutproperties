import { Route, Routes } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import NoMatch from './pages/NoMatch';
import Home from './pages/root/Home';
import ListingsPage from './pages/root/Listings';

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
};

export default App;
