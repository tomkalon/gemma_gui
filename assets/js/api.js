import commonFunctions from "../react/common/funtions";

const apiAddressSrc = "/api";

// send data to API
function sendDataAPI(method, id, send, target) {
    if (typeof send['value'] === 'boolean') {
        if (send['value']) {
            send['value'] = 1;
        } else {
            send['value'] = 0;
        }
    }

    let apiAddress = apiAddressSrc;
    apiAddress += target;

    // console.log(apiAddress);
    // console.log(id);
    // console.log(send);

    fetch(apiAddress, {
        method: method, headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(send),
    })
        .then((response) => response.json())
        .then(data => {})
        .catch((error) => {
            console.log("API communication error!");
            console.error("Error:", error);
        });
}

const apiFunctions = {
    sendDataAPI
}

export default apiFunctions;