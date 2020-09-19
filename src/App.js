/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */


 

import React from 'react';
import './App.css';

import logo from './logo.svg';

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './generator/generator';

import RobotYoutubeLive from './RobotYoutubeLive'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = '';
    code += 'var actionID = 1;\n';
    code += 'var url = \'https://temi-cmd.firebaseio.com/\'\n';

    code += 'function makeRequest(url,json_content) {\n\
      return new Promise(function (resolve, reject) {\n\
          let xhr = new XMLHttpRequest();\n\
          xhr.open(\'PUT\', url,false);\n\
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
  code += 'async function SendCmd(url, content) {\n\
    var result = await makeRequest(url, content)\n\
    console.log(result);\n\
  }\n\n';
  
  code += 'SendCmd(url + "ProgramInfo/status.json", \'{\"status\":\"UPLOADING\"}\')\n';
  var codeFromBlock = BlocklyJS.workspaceToCode(this.simpleWorkspace.current.workspace);
  code += codeFromBlock;
  code += 'SendCmd(url + "ProgramInfo/status.json", \'{\"status\":\"DONE\"}\')\n';

    // code += 'var speak_req = new XMLHttpRequest();\n';
    // code += 'var json_content = \'{"status":"DONE"}\';\n';
    // code += "var url = 'https://test-cmd-queue.firebaseio.com/ProgramInfo/status.json';\n";
    // code += "speak_req.open('PUT', url, true);\n";
    // code += "speak_req.setRequestHeader('Content-Type', 'application/json');\n";
    // code += 'speak_req.send(JSON.stringify(JSON.parse(json_content)));\n';
    console.log(code);
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Virach Labo Blockly </h1>
          <RobotYoutubeLive videoId="QpaL5bVmD5A"/>
          <button onClick={this.generateCode}>Convert</button>
         
        </header>

        <body class="App-body">
        <BlocklyComponent
            ref={this.simpleWorkspace}
            readOnly={false}
            trashcan={true}
            media={'media/'}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
          >
            <Block type="robot_action_speak"></Block>
            <Block type="text"></Block>
            <Block type="robot_action_move_forward"></Block>
            <Block type="robot_action_move_backward"></Block>
            <Block type="robot_action_move_left"></Block>
            <Block type="robot_action_move_right"></Block>
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM">10</Field>
                </Shadow>
              </Value>
            </Block>
            {/* DUMMY
            <Block type="controls_ifelse"></Block>
            <Block type="logic_compare" />
            <Block type="dm_robot_action_start_cov"></Block>
            <Block type="dm_robot_intetion"></Block>
            <Block type="dm_robot_callstaff"></Block>
            <Block type="dm_robot_show_dir"></Block> */}
          </BlocklyComponent>
        </body>
      </div>
    );
  }
}

export default App;

// <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <button onClick={this.generateCode}>Convert</button>
//   <BlocklyComponent ref={this.simpleWorkspace}
//   readOnly={false} trashcan={true} media={'media/'}
//   move={{
//     scrollbars: true,
//     drag: true,
//     wheel: true
//   }}
//   initialXml={`
// <xml xmlns="http://www.w3.org/1999/xhtml">
// <block type="controls_ifelse" x="0" y="0"></block>
// </xml>
// `}>
//     <Block type="test_react_field" />
//     <Block type="test_react_date_field" />
//     <Block type="controls_ifelse" />
//     <Block type="logic_compare" />
//     <Block type="logic_operation" />
//     <Block type="controls_repeat_ext">
//       <Value name="TIMES">
//         <Shadow type="math_number">
//           <Field name="NUM">10</Field>
//         </Shadow>
//       </Value>
//     </Block>
//     <Block type="logic_operation" />
//     <Block type="logic_negate" />
//     <Block type="logic_boolean" />
//     <Block type="logic_null" disabled="true" />
//     <Block type="logic_ternary" />
//     <Block type="text_charAt">
//       <Value name="VALUE">
//         <Block type="variables_get">
//           <Field name="VAR">text</Field>
//         </Block>
//       </Value>
//     </Block>
//   </BlocklyComponent>
// </header>
// </div>
// );
// }
// }
