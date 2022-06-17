import axios from "axios";

export class NotificationServices {
    url = "http://127.0.0.1:8000/api/v1/notifications/";
    token = JSON.stringify(localStorage.getItem("userToken"));

    get(id) {
        return axios.get(this.url + id, {
            headers: {
                'Authorization': 'token ' + this.token.replaceAll("\"", "")
            }
        }).then(response => {
            if (response.data.success) {
                console.log(response)
                return response.data;
            } else
                return []
        }).catch(errors => {
            return errors
        })
    }

    update(id) {
        console.log(id);
        console.log(this.token.replaceAll("\"", ""));
        return axios.put(this.url + "update/" + id, {}, {
            headers: {
                'Authorization': 'token ' + this.token.replaceAll("\"", "")
            }
        }).then(response => {
            if (response.data.success) {
                return response.data;
            } else
                return []
        }).catch(errors => {
            return errors
        })
    }
}