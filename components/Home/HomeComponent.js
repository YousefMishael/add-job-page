import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Job from "../Job/Job";
import { useGlobalContext } from "../../Utils/Utils";
import JobDialogBody from "./JobDialogBody";
import DialogActions from "./DialogActions";
import { request } from "../../Utils/Utils";
import Pagination from "../Pagination/Pagination";
import { useRouter } from "next/router";
import useDebounce from "../../Utils/DebounceUtil";
import { FilterContent } from "../Filter/FilterContent";

export default function HomeComponent() {
  const [jobTitle, setJobTitle] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const globalContext = useGlobalContext();
  const router = useRouter();
  const debouncedjobTitle = useDebounce(jobTitle, 1000);

  const indexOfLastPost = jobsPerPage * currentPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currPageJobs = allJobs?.slice(indexOfFirstPost, indexOfLastPost);

  function paginate(num) {
    setCurrentPage(num);
  }

  function onChange(e) {
    setJobTitle(e.target.value);
  }

  async function submitPost(formDetails) {
    //validate entered details
    if (Object.keys(formDetails).length === 0) return;
    for (let i in FilterContent)
      if (
        formDetails[FilterContent[i].filterBy] === "" ||
        typeof formDetails[FilterContent[i].filterBy] === "undefined"
      )
        return;
    if (formDetails["jobTitle"] === "" || formDetails["description"] === "")
      return;

    const resp = await request("/api/action/add-post", "POST", formDetails);
    //job added successfully, close dialog and reset fields values
    if (resp.status === 200) {
      let obj = {};
      obj["jobTitle"] = "";
      obj["description"] = "";
      FilterContent.forEach((filter) => {
        obj[filter.filterBy] = "";
      });
      let _jobs = resp.data;
      globalContext.setGlobalState({
        ...globalContext.globalState,
        posts: _jobs,
        dialogContent: obj,
      });

      showDialog();
    }
  }

  function showDialog() {
    globalContext?.globalState?.toggleDialog(
      "Add New Job Post",
      <JobDialogBody submitPost={submitPost} />,
      <DialogActions submitPost={submitPost} />
    );
  }

  useEffect(() => {
    setAllJobs(globalContext.globalState?.posts);
  }, [globalContext.globalState]);

  useEffect(() => {
    let queryString = new URLSearchParams(router.query);

    if (queryString.has("jobTitle"))
      queryString.set("jobTitle", debouncedjobTitle);
    else if (debouncedjobTitle)
      queryString.append("jobTitle", debouncedjobTitle);

    if (!debouncedjobTitle) {
      queryString.delete("jobTitle");
    }

    let url;
    if (!debouncedjobTitle) url = "/api/action/get-all";
    else url = "/api/action/search?" + queryString.toString();

    const fetchData = async () => {
      let resp = await request(url, "GET");
      if (resp.status === 200) setAllJobs(resp.data);
    };

    fetchData();
  }, [debouncedjobTitle]);

  //get all jobs from context to rerender and showing items on screen
  useEffect(() => {
    setAllJobs(globalContext.globalState?.posts);
  }, [globalContext.globalState]);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.searchWrapper}>
        <input
          placeholder="Search By Job Title"
          value={jobTitle}
          onChange={onChange}
        />
        <button onClick={showDialog}>Add New Job</button>
      </div>
      <div>
        {currPageJobs?.map((post) => (
          <Job key={post.id} job={post} />
        ))}
      </div>
      <div className={styles.pagginationContainer}>
        <Pagination
          jobsPerPage={jobsPerPage}
          totalJobs={allJobs?.length}
          paginate={paginate}
          currPage={currentPage}
        />
      </div>
    </div>
  );
}
