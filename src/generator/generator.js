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
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['test_react_field'] = function (block) {
  return "console.log('custom block');\n";
};

Blockly.JavaScript['test_react_date_field'] = function (block) {
  return 'console.log(' + block.getField('DATE').getText() + ');\n';
};

// Blockly.JavaScript['robot_action_speak'] = function (block) {
//   var code = '';
//   var tts = Blockly.JavaScript.valueToCode(
//     block,
//     'TEXT_TO_SPEACH',
//     Blockly.JavaScript.ORDER_ATOMIC
//   );
//   code += 'var speak_req = new XMLHttpRequest();\n';
//   code += 'var json_content = \'{"SPEAK":"' + tts.replace(/'/g, '') + '"}\';\n';
//   code += "var url = 'https://temi-cmd.firebaseio.com/ActionList/action_' + actionID + '.json';\n";
//   code += "speak_req.open('PUT', url, true);\n";
//   code += "speak_req.setRequestHeader('Content-Type', 'application/json');\n";
//   code += 'speak_req.send(JSON.stringify(JSON.parse(json_content)));\n';
//   code += 'actionID += 1;\n\n\n';
//   return code;
// };

Blockly.JavaScript['robot_action_speak'] = function(block) {
  var lang = block.getField('LANG').getValue();
  var tts = Blockly.JavaScript.valueToCode(block, 'TTS', Blockly.JavaScript.ORDER_ATOMIC);

  var content = '\'{"order":<>, "action":"SPEAK", "lang":"{}", "content":"><"}\'.replace(/<>/g, actionID)\n'.replace(/></g, tts.replace(/'/g, ''));
  content = content.replace(/{}/g, lang.replace(/'/g, ''));
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';


  return code;
}

Blockly.JavaScript['robot_action_move_forward'] = function (block) {
  var content = '\'{"order":<>, "action":"MOVE", "content":"FORWARD"}\'.replace(/<>/g, actionID)\n'
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';
  return code;
}

Blockly.JavaScript['robot_action_move_backward'] = function (block) {
  var content = '\'{"order":<>, "action":"MOVE", "content":"BACKWARD"}\'.replace(/<>/g, actionID)\n'
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';
  return code;
}

Blockly.JavaScript['robot_action_move_left'] = function (block) {
  var content = '\'{"order":<>, "action":"MOVE", "content":"LEFT"}\'.replace(/<>/g, actionID)\n'
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';
  return code;
}


Blockly.JavaScript['robot_action_move_right'] = function (block) {
  var content = '\'{"order":<>, "action":"MOVE", "content":"RIGHT"}\'.replace(/<>/g, actionID)\n'
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';
  return code;
}

Blockly.JavaScript['robot_action_save_location'] = function(block) {
  var location = Blockly.JavaScript.valueToCode(block, 'LOCATION', Blockly.JavaScript.ORDER_ATOMIC);
  var content = '\'{"order":<>, "action":"SAVE LOCATION", "content":"{}"}\'.replace(/<>/g, actionID)\n'.replace(/{}/g, location.replace(/\'/g, ""));
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';

  content = '\'{"L><":"<>"}\'.replace(/></g, locationID)'.replace(/<>/g, location.replace(/\'/g, ""));
  code += 'SendCmd(\'PATCH\', url+"/ProgramInfo/SavedLocation.json", {})\n'.replace(/{}/g, content);
  code += 'locationID += 1;\n\n';

  return code;
};

Blockly.JavaScript['robot_action_goto'] = function (block) {
  var goto_location = Blockly.JavaScript.valueToCode(block, 'GOTO_LOCATION', Blockly.JavaScript.ORDER_ATOMIC);

  //action as save location
  
  //save location to fb
  var content = '\'{"order":<>, "action":"GOTO", "content":"><"}\'.replace(/<>/g, actionID)\n'.replace(/></g, goto_location.replace(/\'/g, ""));
  var code = 'SendCmd(\'PUT\', url+"/ActionList/action_<>".replace(/<>/g, actionID) + ".json", {})\n'.replace(/{}/g, content);
  code += 'actionID += 1;\n\n';
  return code;
}

Blockly.JavaScript['test_block'] = function(block) {
  var value_text_input = Blockly.JavaScript.valueToCode(block, 'text_input', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'console.log(\'test\')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// curl --header "Content-Type: application/json" \
//   --request PATCH \
//   --data '{"L2":"test2"}' \
//   https://temi-cmd.firebaseio.com/ProgramInfo/SavedLocation.json
