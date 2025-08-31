import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from '../../components/layout/Header/Header';

import ProfilePage from '../../pages/profile/ProfilePage';
import ProductsPage from '../../pages/products/ProductsPage';
import OperationsPage from '../../pages/operations/OperationsPage';
import CartPage from '../../pages/cart/CartPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';

import { NewProductModal, EditProductModal } from '../../pages/modals/ProductModals';
import { NewOperationModal, EditOperationModal } from '../../pages/modals/OperationModals';

type ModalState = { backgroundLocation?: Location } | undefined;

/** Какие пути считаем «модальными» */
const isModalPath = (pathname: string) =>
  pathname.startsWith('/products/new') ||
  pathname.startsWith('/operations/new') ||
  /\/products\/[^/]+\/edit$/.test(pathname) ||
  /\/operations\/[^/]+\/edit$/.test(pathname);

const MainRoutes: React.FC = () => {
  const location = useLocation();
  const state = location.state as ModalState;
  const background = state?.backgroundLocation;

  return (
    <>
      <Header />
      <div style={{ padding: '8px 12px' }}>
        {/* Фон: если есть backgroundLocation — рисуем его, иначе текущий location */}
        <Routes location={background ?? location}>
          {/* Главные страницы */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* ВАЖНО: проксируем модальные пути на их базовые страницы,
             чтобы не улетать в 404 при прямом заходе */}
          <Route path="/products/new" element={<ProductsPage />} />
          <Route path="/products/:id/edit" element={<ProductsPage />} />
          <Route path="/operations/new" element={<OperationsPage />} />
          <Route path="/operations/:id/edit" element={<OperationsPage />} />
          
          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {/* Модальные маршруты: рисуем ТОЛЬКО на модальных урлах */}
        {isModalPath(location.pathname) && (
          <Routes>
            <Route path="/products/new" element={<NewProductModal />} />
            <Route path="/products/:id/edit" element={<EditProductModal />} />
            <Route path="/operations/new" element={<NewOperationModal />} />
            <Route path="/operations/:id/edit" element={<EditOperationModal />} />
          </Routes>
        )}
      </div>
    </>
  );
};

const AppRouter: React.FC = () => (
  <HashRouter>
    <MainRoutes />
  </HashRouter>
);

export default AppRouter;