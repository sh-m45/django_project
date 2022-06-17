import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

let JobItem = ({jobInfo}) => {
  return (
    <div className="alert bg-dark">
      <Card className="bg-dark" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={"http://localhost:8000" + jobInfo.banner_img}
        />
        <Card.Body className="d-flex align-items-center flex-column">
          <Card.Title className="text-light">{jobInfo.name}</Card.Title>
          <NavLink
            className={"btn btn-success mt-2"}
            to={`/jobs/${jobInfo.id}`}
          >
            Job Details
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobItem;
