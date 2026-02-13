import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TabsContainer from './common/components/TabsContainer';
import UsersPage from './pages/UsersPage';
import BookmarksPage from './pages/BookmarksPage';
import UserDetailsPage from './pages/UserDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">GitHub Users Explorer</h1>
          </header>

          <Routes>
            <Route element={<TabsContainer />}>
              <Route path="/" element={<UsersPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Route>
            <Route path="/user/:login" element={<UserDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
