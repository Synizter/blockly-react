    code += 'function makeRequest(method, url,json_content) {\n\
      return new Promise(function (resolve, reject) {\n\
          let xhr = new XMLHttpRequest();\n\
          xhr.open(method, url,false);\n\
          xhr.setRequestHeader(\'Content-Type\', \'application/json\');\n\
          xhr.onload = function () {\n\
              if (this.status >= 200 && this.status < 300) {\n\
                  resolve(xhr.response);\n\
              } else {\n\
                  reject({\n\
                      status: this.status,\n\
                      statusText: xhr.statusText\n\
                  });\n\
              }\n\
          };\n\
          xhr.onerror = function () {\n\
              reject({\n\
                  status: this.status,\n\
                  statusText: xhr.statusText\n\
              });\n\
          };\n\
          xhr.send(JSON.stringify(JSON.parse(json_content)));\n\
      });\n\
  }\n';
  code += 'async function SendCmd(method ,url, content) {\n\
    var result = await makeRequest(method, url, content)\n\
    console.log(result);\n\
  }\n\n';