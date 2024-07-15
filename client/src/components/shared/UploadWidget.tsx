import React, { createContext, useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

import { UploadWidgetProps } from '@/types';

const CloudinaryScriptContext = createContext<{ loaded: boolean } | undefined>(
  undefined,
);

const UploadWidget: React.FC<UploadWidgetProps> = ({ uwConfig, setAvatar }) => {
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
            // result.info - image info
            setAvatar(result.info.secure_url);
          }
        },
      );

      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        <FiUpload />
        Change Photo
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
