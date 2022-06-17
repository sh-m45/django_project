import React from "react";
import style from "./Profile.module.css";
import protectedRoute from "../../libs/protectedRoute";

export function Profile() {
    return (
        <div>
            <div className={style.parent}>
                <div className="card w-50 h-50">
                    <h3 className="text-center pt-3">Information About You</h3>
                    <div className="container px-4 pt-2">
                        <p>
                            <span className="">Your Name : </span> shrouk mamdoh{" "}
                        </p>
                        <p>
                            <span className="">Your ID : </span> 1{" "}
                        </p>
                        <p>
                            <span className="">Your Email : </span>eng.shrouk.mamdoh@gmail.com
                        </p>
                        <p>
                            <span className="">Your Age : </span>22
                        </p>
                        <p>
                            <span className="">Your CV : </span>shrouk mamdoh
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default protectedRoute(Profile);