import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import CardFolder from 'common/enums/Card';
import SearchBar from 'common/enums/SearchBar';

const ITEMS_PER_PAGE = 5;

const Bookmark = () => {
  const [bookmarkData, setBookmarkData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('Bookmark')) || [];
    setBookmarkData(storedBookmarks);
  }, []);

  const handleRemoveBookmark = (user) => {
    const updatedBookmarks = bookmarkData.filter((item) => item.id !== user.id);
    setBookmarkData(updatedBookmarks);
    localStorage.setItem('Bookmark', JSON.stringify(updatedBookmarks));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredBookmarks = bookmarkData.filter((item) => item.login.toLowerCase().includes(searchTerm));

  const pageCount = Math.ceil(filteredBookmarks.length / ITEMS_PER_PAGE);
  const paginatedData = filteredBookmarks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div style={{ padding: '20px' }}>
      {SearchBar(handleSearchChange, searchTerm)}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredBookmarks.length === 0 ? (
          <Typography variant="body1">No bookmarks found</Typography>
        ) : (
          paginatedData.map((data) => CardFolder(data, handleRemoveBookmark, 'remove'))
        )}
      </div>

      {filteredBookmarks.length > ITEMS_PER_PAGE && (
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  );
};

export default Bookmark;
