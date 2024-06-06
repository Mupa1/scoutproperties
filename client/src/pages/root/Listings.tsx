import Listings from '@/components/pages/Listings/Listings';
import { listingsData } from '@/lib/dummy-data';

const ListingsPage = () => {
  return <Listings listingsData={listingsData} />;
};

export default ListingsPage;
