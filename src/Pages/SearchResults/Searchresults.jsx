import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SearchResultsItem, Loading} from "../../Components";
import style from "./searchresults.module.scss";
import UserContext from "../../Global/Auth/authContext";

const SearchResults = () => {
  const { state } = useLocation();
  const [items, setItems] = useState(state?.items);
  const [value, setValue] = useState("");
  const { user, loading, setLoading, auth } = useContext(UserContext);
  const navigate = useNavigate();

  const searchItems = async () => {
    try {
      if (!user) {
        return toast.error("Please Log In First", { autoClose: 1200 });
      }
      if (user.name === "") {
        return toast.error("Please Log In First", { autoClose: 1200 });
      }
      if (!value) {
        return toast.error("Search Field is Empty", { autoClose: 1200 });
      }
      setLoading(() => true);
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/items/search?name=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      console.log(data)

      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      if (data.msg.items.length === 0) {
        setLoading(() => false);
        return toast.info("No Results Found", { autoClose: 1200 });
      }
      setItems(() => data.msg.items);
      setLoading(() => false);
      return null;
    } catch (err) {
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchItems();
    }
  };
  useEffect(() => {
    if (!items) {
      navigate("/");
    }
  }, []);
  return (
    <div className={style.searchresultscontainer}>
      {loading === false ? (
        <div>
          <div className={style.header}>
            <div className={style.heading}>Search Results</div>
            <div className={style.searchcontainer}>
              <div className={style.searchbar}>
                <div className={style.inputbox}>
                  <input
                    type="text"
                    className={style.inputfield}
                    placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    tabIndex={0}
                  />
                </div>
                <div
                  className={style.iconcontainer}
                  aria-label="save"
                  onClick={searchItems}
                  onKeyDown={handleKeyPress}
                >
                  <img
                    src="/assets/searchicon.png"
                    alt="searchicon"
                    className={style.iconimg}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.columnheadingcontainer}>
            <div className={style.leftcolumn}>Name &uarr;</div>
            <div className={style.rightcolumn}>
              <div className={style.leftitem}>Uploaded At</div>
              <div className={style.rightitem}>Download</div>
            </div>
          </div>
          <div className={style.searchitemscontainer}>
            {items?.map((item) => (
              <SearchResultsItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SearchResults;
