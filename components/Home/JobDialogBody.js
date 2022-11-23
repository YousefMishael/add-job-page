import { useState } from "react";
import styles from "../../styles/Job.module.css";
import { FilterContent } from "../Filter/FilterContent";
import { useGlobalContext } from "../../Utils/Utils";

export default function DialogDialogBody(props) {
  //prettier-ignore
  const [selectContent,] = useState(FilterContent);
  const globalContext = useGlobalContext();

  //handle all fields changes in child component at same function
  function onFormDetailsChanged(e) {
    globalContext.setGlobalState({
      ...globalContext.globalState,
      dialogContent: {
        ...globalContext.globalState?.dialogContent,
        [e.target.name]: e.target.value,
      },
    });
  }

  function submitPost(e) {
    e.preventDefault();
    props.submitPost(globalContext.globalState?.dialogContent);
  }

  return (
    <form onSubmit={submitPost} className={styles.formWrapper}>
      <div className={styles.dialogContainer}>
        <input
          className={styles.dialogItem}
          placeholder="Job Titel"
          name="jobTitle"
          value={globalContext.globalState?.dialogContent?.jobTitle}
          onChange={onFormDetailsChanged}
        />

        {selectContent.map((element) => {
          return (
            <div className={styles.selectWrapper} key={element.id}>
              <select
                className={styles.dialogItem}
                onChange={onFormDetailsChanged}
                name={element.filterBy}
                value={
                  globalContext.globalState?.dialogContent[element.filterBy]
                    ? globalContext.globalState?.dialogContent[element.filterBy]
                    : element.filterBy
                }
                // defaultValue={element.filterBy}
              >
                <option value={element.filterBy} disabled>
                  {element.filterBy}
                </option>
                {element.filters.map((filter) => {
                  return (
                    <option value={filter.name} key={filter.id}>
                      {filter.name}
                    </option>
                  );
                })}
              </select>
              <span className={styles.dialogSelect} />
              <span
                className={`${styles.placeHolder} ${
                  globalContext.globalState?.dialogContent[element.filterBy]
                    ?.length > 0
                    ? styles.active
                    : ""
                }`}
              >
                {globalContext.globalState?.dialogContent[element.filterBy]
                  ? globalContext.globalState?.dialogContent[element.filterBy]
                  : element.filterBy}
              </span>
            </div>
          );
        })}

        <div className={styles.descWrapper}>
          <textarea
            className={styles.dialogItem}
            placeholder="Description"
            rows={5}
            name="description"
            value={globalContext.globalState?.dialogContent?.description}
            onChange={onFormDetailsChanged}
          />
        </div>
      </div>
    </form>
  );
}
