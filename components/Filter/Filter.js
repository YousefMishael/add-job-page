import { useEffect, useState } from "react";
import { FilterContent } from "./FilterContent";
import styles from "../../styles/Filter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../../Utils/DebounceUtil";
import { request, useGlobalContext } from "../../Utils/Utils";

export default function Filter() {
  const [filterContent, setFilterContent] = useState(FilterContent);
  const [sideBar, toggleSideBar] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const globalContext = useGlobalContext();
  const debouncedFilter = useDebounce(searchUrl, 1000);

  function changeTransformSideBar() {
    toggleSideBar(!sideBar);
  }

  function addFilter(e) {
    let queryString = new URLSearchParams({});
    //generate query string and toggle checkbox value
    let _filterContent = JSON.parse(JSON.stringify(filterContent));
    _filterContent.forEach((filter) => {
      filter.filters.forEach((f) => {
        if (f.name === e.target.name) f.isSelected = !f.isSelected;

        if (f.isSelected) queryString.append(filter.filterBy, f.name);
      });
    });

    setFilterContent(_filterContent);

    let url;
    if (queryString.toString() === "") url = "/api/action/get-all";
    else url = "/api/action/search?" + queryString.toString();
    setSearchUrl(url);
  }

  useEffect(() => {
    async function fetchData() {
      let resp = await request(debouncedFilter, "GET");
      if (resp.status === 200)
        globalContext.setGlobalState({
          ...globalContext.globalState,
          posts: resp.data,
        });
    }

    if (debouncedFilter) fetchData();
  }, [debouncedFilter]);

  return (
    <>
      <div className={`${styles.container} ${sideBar ? styles.active : ""}`}>
        {filterContent?.map((filter) => {
          return (
            <div className={styles.filterBy} key={filter.id}>
              <h3>{filter.filterBy}</h3>
              {filter.filters.map((item) => {
                return (
                  <div key={item.id}>
                    <label className={styles.checkMarkContainer}>
                      {item.name}
                      <input
                        type="checkbox"
                        name={item.name}
                        value={item.isSelected}
                        onChange={addFilter}
                        checked={item.isSelected}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <span
        className={`${styles.toggleBtn} ${sideBar ? styles.active : ""}`}
        onClick={changeTransformSideBar}
      >
        <FontAwesomeIcon icon={faFilter} />
      </span>
    </>
  );
}
