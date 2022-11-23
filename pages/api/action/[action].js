import { jobs } from "../../../Data/Data";
import { generateUUID } from "../../../Utils/Utils";

export default async function handler(req, res) {
  const { action, id } = req.query;
  if (req.method === "POST") {
    //delete or add
    try {
      switch (action) {
        case "add-post":
          let _job = JSON.parse(req.body);
          jobs.push({
            id: generateUUID(),
            ..._job,
          });
          res.status(200).json(jobs);
          break;
        case "delete":
          jobs.splice(
            jobs.findIndex((job) => job.id === id),
            1
          );
          res.status(200).json(jobs);
          break;
        default:
          res.status(404);
      }
    } catch (e) {
      res.status(501);
    }
  } else {
    switch (action) {
      case "get-all":
        res.status(200).json(jobs);
        break;
      case "search":
        const query = req.query;
        let filteredJobs = jobs.filter((job) => {
          for (let key in job) {
            if (
              query[key]?.includes(job[key]) ||
              job["jobTitle"]
                ?.toUpperCase()
                .includes(query["jobTitle"]?.toUpperCase())
            )
              return job;
          }
        });

        res.status(200).json(filteredJobs);
        break;
      default:
        res.status(404).json({ data: "no data found" });
    }
  }
}
