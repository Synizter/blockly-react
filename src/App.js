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
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

//react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = '';
    code += 'var actionID = 1;\n';
    code += 'var locationID = 1\n' // Location ID
    code += 'var url = \'https://temi-cmd.firebaseio.com/\'\n';

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
  
  code += 'SendCmd(\'PATCH\', url + "ProgramInfo.json", \'{\"uploaded_status\":\"UPLOADING\"}\')\n';
  var codeFromBlock = BlocklyJS.workspaceToCode(this.simpleWorkspace.current.workspace);
  code += codeFromBlock;
  code += 'SendCmd(\'PATCH\' ,url + "ProgramInfo.json", \'{\"UPLOADED_STATUS\":\"DONE\"}\')\n';

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
          {/* <RobotYoutubeLive videoId="wtKkjIbU5hg"/> */}
          <ReactTwitchEmbedVideo channel="virachlabo" />
          
        </header>

        <body class="App-body">
        <button onClick={this.generateCode}>Convert</button>
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
            <Block type="robot_action_save_location"></Block>
            <Block type="robot_action_goto"></Block>
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM">10</Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="controls_ifelse"></Block>
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
