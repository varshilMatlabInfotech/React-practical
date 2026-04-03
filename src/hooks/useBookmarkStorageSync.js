import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { syncBookmarksFromStorage } from 'actions/bookmarkActions';
import { BOOKMARKS_STORAGE_KEY } from 'constants/github';

export function useBookmarkStorageSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== BOOKMARKS_STORAGE_KEY || e.newValue == null) return;
      try {
        const users = JSON.parse(e.newValue);
        if (Array.isArray(users)) {
          dispatch(syncBookmarksFromStorage(users));
        }
      } catch {
        alert('Error parsing bookmarks from storage');
        alert(e);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [dispatch]);
}
