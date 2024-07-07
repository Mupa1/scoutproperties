import { ImSpinner2 } from 'react-icons/im';

const Loader = () => (
  <div className="flex-center w-full">
    <ImSpinner2 className="animate animate-spin" size="24" /> Loading...
  </div>
);

Loader.displayName = 'Loader';

export { Loader };
