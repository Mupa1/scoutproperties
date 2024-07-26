import { Route, Routes } from 'react-router-dom';

import RequireAuthLayout from './layouts/RequireAuthLayout';
import RootLayout from './layouts/RootLayout';
import { NoMatch } from './pages/NoMatch';
import { CreateListing, Profile, UpdateProfile } from './pages/protected';
import {
  AboutPage,
  HomePage,
  ListingDetailsPage,
  ListingsPage,
  Signin,
  Signup,
} from './pages/root';

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/listings/:id" element={<ListingDetailsPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route element={<RequireAuthLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/listings/add" element={<CreateListing />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
};

export default App;
