import styles from "../../styles/Job.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../Utils/Utils";
import DeleteDialogActions from "./DeleteDialogActions";
import DeleteDialogBody from "./DeleteDialogBody";
import JobDetailsBody from "./JobDetailsBody";

export default function Job({ job }) {
  const globalContext = useGlobalContext();

  function showDetailsDialog() {
    globalContext?.globalState?.toggleDialog(
      "Job Details",
      <JobDetailsBody job={job} />,
      ""
    );
  }

  function showDeleteDialog() {
    globalContext?.globalState?.toggleDialog(
      "Delete Job",
      <DeleteDialogBody />,
      <DeleteDialogActions id={job.id} showDialog={showDeleteDialog} />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.img}
          alt="Job Image"
          src={
            "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
        />
      </div>
      <div className={styles.detailsWrapper}>
        <div>
          <span className={styles.jobTitle}>{job.jobTitle}</span>
        </div>
        <div className={styles.headDetails}>
          <span>
            {job.City}, {job.Country}
          </span>
        </div>
        <div className={styles.headDetails}>
          <span>{job.Sector}</span>
        </div>
        <div className={styles.description}>
          <span>{job.description}</span>
        </div>
      </div>
      <div className={styles.actionWrapper}>
        <span className={styles.seeMore} onClick={showDetailsDialog}>
          <FontAwesomeIcon icon={faEye} />
        </span>
        <span className={styles.delete} onClick={showDeleteDialog}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );
}
