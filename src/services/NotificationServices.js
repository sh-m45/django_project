import axios from "axios";

export class NotificationServices {
    url = "http://127.0.0.1:8000/api/v1/notifications/"

    get(id) {
        return axios.get(this.url + id).then(response => {
            return response.data;
        }).catch(errors => {
            return errors.response.data
        })
    }
}