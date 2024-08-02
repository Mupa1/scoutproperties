import React, { createContext, useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

import { UploadWidgetProps } from '@/types';

import { Button } from '../ui';

const CloudinaryScriptContext = createContext<{ loaded: boolean } | undefined>(
  undefined,
);

const UploadWidget: React.FC<UploadWidgetProps> = ({ uwConfig, setState }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById('uw') as HTMLScriptElement;
      if (!uwScript) {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = (event: React.MouseEvent) => {
    event.preventDefault();

    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (error) {
            console.error('Upload Widget Error:', error);
            alert(
              'Error initializing upload widget. Please check your configuration.',
            );
            return;
          }

          if (result && result.event === 'success') {
            setState((prev) => [...prev, result.info.secure_url]);
          }
        },
      );

      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        variant="inverted"
        className="border-0 ring-1 ring-inset ring-black/10"
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
      >
        <FiUpload />
        Upload Image
      </Button>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
