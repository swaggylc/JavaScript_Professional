function request(parms, successCallback, failCallback) {
  setTimeout(() => {
    if (parms === "123") {
      let result = "success";
      successCallback(result);
    } else {
      let result = "fail";
      failCallback(result);
    }
  }, 2000);
}

request(
  "123",
  (result) => {
    console.log(result);
  },
  (result) => {
    console.log(result);
  }
);
