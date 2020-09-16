

var actionID = 0;
var url = 'https://temi-cmd.firebaseio.com/'
function makeRequest(url,json_content) {
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open('PUT', url,true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                  resolve(xhr.response);
              } else {
                  reject({
                      status: this.status,
                      statusText: xhr.statusText
                  });
              }
          };
          xhr.onerror = function () {
              reject({
                  status: this.status,
                  statusText: xhr.statusText
              });
          };
          xhr.send(JSON.stringify(JSON.parse(json_content)));
      });
  }
async function SendCmd(url, content) {
    var result = await makeRequest(url, content)
    
  }

SendCmd(url + "ProgramInfo/status.json", '{"status":"UPLOADING"}')
SendCmd(url + "ProgramInfo/status.json", '{"status":"DONE"}')  