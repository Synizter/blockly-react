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

import BlocklyComponent, { Block, Value, Field, Shadow, Category } from './Blockly';

import BlocklyJS from 'blockly/javascript';
import BlocklyPython from 'blockly/python'

import './blocks/customblocks';
import './generator/generator';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
      var codeFromBlock = BlocklyPython.workspaceToCode(this.simpleWorkspace.current.workspace);
      console.log('---------- PYTHON CODE ------------')
      console.log(codeFromBlock);

      Axios('http://babyai.org:5000/execute',{
      method: 'POST',
      mode: 'no-cors',
      data : codeFromBlock,
      // data: 'print("Shark-きさめ")\r\nprint("Wow-ビックリ！")\r\n',
      headers: {
        "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
      },
      withCredentials: true,
      credentials: 'same-origin',
      }).then(reponse => {
        console.log('\n\n---------- OUTPUT------------')
        console.log(reponse.data)
      });
  };

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={this.generateCode}>Convert to Python</button>

      </header>
      <div className="Workspace">
      <body>
        <BlocklyComponent ref={this.simpleWorkspace}
          readOnly={false} trashcan={true} media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}>

            <Category name="Logic" colour="210">
              <Block type="controls_if"></Block>
              <Block type="logic_compare"></Block>
              <Block type="logic_operation"></Block>
              <Block type="logic_negate"></Block>
              <Block type="logic_boolean"></Block>
            </Category>
            <Category name="Loops" colour="120">
              <Block type="controls_repeat_ext">
                <Value name="TIMES">
                  <Block type="math_number">
                    <Field name="NUM">10</Field>
                  </Block>
                    </Value></Block>
              <Block type="controls_whileUntil"></Block>
            </Category>
            <Category name="Text" colour="20">
              <Block type="text"></Block>
              <Block type="text_length"></Block>
              <Block type="text_print"></Block>
            </Category>
            <Category name="Math" colour="230">
              <Block type="math_number"></Block>
              <Block type="math_arithmetic"></Block>
              <Block type="math_single"></Block>
            </Category>

            <Category name="MeCab Japanese Word Segmentation" colour="30">
              <Block type="ws_import_mecab"></Block>
              <Block type="ws_tagger"></Block> 
              <Block type="text"></Block>
              <Block type="text_print"></Block>
            </Category>

          </BlocklyComponent>
          
      </body>
      </div>
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
