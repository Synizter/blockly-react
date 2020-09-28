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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = '# start of python program\n\n';
    //Extract blockly to python, in case of Javascript, use BlocklyJS instead 
    var codeFromBlock = BlocklyPython.workspaceToCode(this.simpleWorkspace.current.workspace);
    code += codeFromBlock;
    code += '\n\n# end of pythong program\n';
    console.log(code);
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

            <Category name="Tokenize" colour="30">
              <Block type="ptnlp_word_tokenize_import"></Block>
              <Block type="ptnlp_tokenize_word"></Block>
              <Block type="text"></Block>
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
