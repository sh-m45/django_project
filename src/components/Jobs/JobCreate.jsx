import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "./Jobs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import protectedRoute from "../../libs/protectedRoute";

export function JobCreate() {
  let [job, setJob] = useState({
    name: "",
    description: "",
  });
  let [selectedTags, setSelectedTags] = useState([]);
  let [tagsItems, setTagsItems] = useState([]);
  let [error, setError] = useState("");
  let Navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  function getJob(e) {
    let jobCopy = { ...job };
    jobCopy[e.target.name] = e.target.value;
    setJob(jobCopy);
  }

  // ComponentDidMount
  useEffect(() => {
    let userToken = localStorage.getItem("userToken");
    fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: "token " + userToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let tagsArr = [];
        data.tag.forEach((element) => {
          let tagObject = { label: element.name, value: element.id };
          tagsArr.push(tagObject);
        });
        setTagsItems(tagsArr);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  async function formSubmit(e) {
    e.preventDefault();
    job.tags = selectedTags;
    console.log(job);
    let userToken = localStorage.getItem("userToken");
    console.log(job);
    setLoading(true);
    let { data } = await axios.post(
      `http://localhost:8000/api/v1/job/create`,
      job,
      {
        headers: {
          Authorization: `token ${userToken}`,
        },
      }
    );
    if (data.id === "success") {
      setLoading(false);
      Navigate(`/jobs/${data.id}`);
    } else {
      setError(data.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={style.HomeStyle}>
        <div className="container d-flex justify-content-center align-items-center pt-5">
          <form className="w-50" onSubmit={formSubmit}>
            <div className="d-flex justify-content-center text-white">
              <h1>Create A Job</h1>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Job Name
              </label>
              <input
                onChange={getJob}
                type="text"
                className="form-control"
                name="name"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                onChange={getJob}
                type="text"
                className="form-control"
                name="description"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Select Tags
              </label>
              <br />
              <MultiSelect
                value={selectedTags}
                options={tagsItems}
                onChange={(e) => setSelectedTags(e.value)}
              />
            </div>
            <div className="d-flex d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default protectedRoute(JobCreate);
