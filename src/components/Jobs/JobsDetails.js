import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const JobDetails = () => {
    const jobId = useParams().id;
    let [job, setJob] = useState({});
    let [errorMsg, setErrorMsg] = useState("");

    //ComponentDidMount
    useEffect(() => {
        let userToken = localStorage.getItem("userToken");
        fetch(`http://localhost:8000/api/v1/job/${jobId}`, {
            headers: {
                Authorization: "token " + userToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setJob(data);
            })
            .catch((err) => {
                setErrorMsg(err);
            });
    }, []);

    const renderJob = () => {
        if (job.name) {
            return (
                <>
                    <h1 className="text-light">Job Details</h1>
                    <div className="card bg-dark w-25">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img
                                src={"http://localhost:8000" + job.banner_img}
                                className="card-img-top"
                                style={{width: "300px"}}
                                alt="job_photo"
                            />
                            <h3 className="card-title my-3 text-light">{job.name}</h3>
                            <p className="card-text text-center text-light">
                                {job.description}
                            </p>
                        </div>
                    </div>
                </>
            );
        } else if (errorMsg) {
            return (
                <h3 className="alert alert-danger w-50">
                    Failed to fetch job data from the server, try refreshing the page.
                </h3>
            );
        } else {
            return <h1>Getting Data...</h1>;
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-3">
            <div className="h1 my-3">Job Details</div>
            {renderJob()}
        </div>
    );
};

export default JobDetails;