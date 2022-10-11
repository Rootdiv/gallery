import Layout from 'components/Layout';
import style from './Main.module.css';

import List from './List';
import PagePhoto from 'pages/PagePhoto';
import { Routes, Route } from 'react-router-dom';
import Page404 from 'pages/Page404';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/photo/:id" element={<PagePhoto />} />
        <Route path="/search" element={<List />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  </main>
);
