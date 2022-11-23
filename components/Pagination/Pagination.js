import styles from "../../styles/Home.module.css";
import btnStyles from "../../styles/Dialog.module.css";

export default function Pagination({
  jobsPerPage,
  totalJobs,
  paginate,
  currPage,
}) {
  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++)
    PageNumbers.push(i);

  let pNumsLength = PageNumbers.length;
  if (PageNumbers.length >= 6) {
    PageNumbers.splice(0, PageNumbers.length);

    switch (true) {
      case currPage - 3 >= 1 && currPage + 3 >= pNumsLength:
        PageNumbers.push(pNumsLength - 4);
        PageNumbers.push(pNumsLength - 3);
        PageNumbers.push(pNumsLength - 2);
        PageNumbers.push(pNumsLength - 1);
        PageNumbers.push(pNumsLength);
        break;
      case currPage - 3 > 1 && currPage + 3 < pNumsLength:
        PageNumbers.push(currPage - 2);
        PageNumbers.push(currPage - 1);
        PageNumbers.push(currPage);
        PageNumbers.push(currPage + 1);
        PageNumbers.push(currPage + 2);
        break;
      case currPage - 3 < 1:
        PageNumbers.push(1);
        PageNumbers.push(2);
        PageNumbers.push(3);
        PageNumbers.push(4);
        PageNumbers.push(5);
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.paginationWrapper}>
      {pNumsLength > 1 ? (
        <button
          className={`${btnStyles.btn} ${btnStyles.addBtn}`}
          onClick={() => paginate(currPage - 1)}
        >
          Previous
        </button>
      ) : (
        ""
      )}
      <ul className={styles.paginationList}>
        {PageNumbers.map((pNum) => (
          <li
            className={pNum === currPage ? styles.active : ""}
            key={pNum}
            onClick={() => paginate(pNum)}
          >
            {pNum}
          </li>
        ))}
      </ul>
      {pNumsLength > 1 ? (
        <button
          className={`${btnStyles.btn} ${btnStyles.addBtn}`}
          onClick={() => paginate(currPage + 1)}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
