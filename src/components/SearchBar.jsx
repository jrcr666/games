const SearchBar = ({ value, onChange }) => (
  <input
    type='text'
    placeholder='Searching games...'
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;
