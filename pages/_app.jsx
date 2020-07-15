import React from 'react';
import { Header } from 'components/Header';

// this global CSS file imports css files at the component level
import './styles.css'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <div className="app-container">
      <div className="app-container__main-header">
        <Header />
      </div>
      <div className="app-container__main-content">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </div>
  );
}
