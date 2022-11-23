import styles from "../../styles/Job.module.css";

export default function JobDetailsBody({ job }) {
  return (
    <div className={styles.dialogDetContainer}>
      <div className={styles.dialogImgWrapper}>
        <img
          src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Job image"
          className={styles.img}
        />
      </div>
      <div>
        <span className={styles.dialogName}>{job.jobTitle}</span>
        <span className={styles.dialogSector}>{job.Sector}</span>
      </div>
      <div>
        <span>
          {job.City}, {job.Country}
        </span>
      </div>
      <div className={styles.dialogDescWrapper}>
        <p className={styles.dialogDesc}>{job.description}</p>
      </div>
    </div>
  );
}
