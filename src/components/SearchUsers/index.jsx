const SearchUsers = ({ search, setSearch }) => {
  return (
    <div>
      <label>Search:</label>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default SearchUsers;
