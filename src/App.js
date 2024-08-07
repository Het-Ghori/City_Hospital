import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { Provider } from 'react-redux';
import PrivateRoute from './routes/PrivateRoute';
import { SnackbarProvider } from 'notistack'
import Alert from './user/component/Alert';
import { ThemeProvider } from './user/context/ThemeContext';
import { persistor, store } from './user/redux/store';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >

      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
        <PersistGate persistor={persistor}>
        <Alert />
        <ThemeProvider>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<PrivateRoute />} >
              <Route path="*" element={<AdminRoutes />} />
            </Route>
          </Routes>
        </ThemeProvider>
        </PersistGate>
         </SnackbarProvider>
      </Provider>
    </SnackbarProvider>

  );
}

export default App;



