import { Input } from "antd"
const Search = ({searchText,onHandleSearch}) => {
    return (<div className="search-wrap p-5">
        <Input type="text" placeholder="search by name" value={searchText} onChange={onHandleSearch}/>
    </div>)
}
export default Search;