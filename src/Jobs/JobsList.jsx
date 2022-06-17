import { useEffect, useState } from "react";
import JobItem from "./JobsItem";
import axios from "axios";

const JobsList = () => {
  let [jobs, setJobs] = useState([]);
  let [errorMsg, setErrorMsg] = useState("");

  // ComponentDidMount
  useEffect(() => {
    let userToken = localStorage.getItem("userToken");
    fetch("http://localhost:8000/api/v1/job/", {
      headers: {
        Authorization: "token " + userToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  }, []);

  const renderJobs = () => {
    if (jobs.length) {
      return jobs.map((job) => {
        return (
          <div className="mx-2">
            <JobItem key={job.id} jobInfo={job} />
          </div>
        );
      });
    } else if (errorMsg) {
      return (
        <h3 className="alert alert-danger w-50">
          Failed to fetch jobs data from the server, try refreshing the page
        </h3>
      );
    } else {
      return <h1>Getting Data...</h1>;
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className="h1 my-3">All Jobs</div>
      <div className="card-group" style={{ width: "90vw" }}>
        {renderJobs()}
      </div>
    </div>
  );
};

export default JobsList;
