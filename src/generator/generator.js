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
import 'blockly/python';

Blockly.JavaScript['test_react_field'] = function (block) {
  return "console.log('custom block');\n";
};

Blockly.JavaScript['test_react_date_field'] = function (block) {
  return 'console.log(' + block.getField('DATE').getText() + ');\n';
};

// Blockly.Python['ptnlp_word_tokenize_import'] = function(block) {
//   var code = 'from pythainlp.tokenize import word_tokenize\n';
//   return code;
// };

// Blockly.Python['ptnlp_tokenize_word'] = function(block) {
//   var value_text_input = Blockly.Python.valueToCode(block, 'TEXT_INPUT', Blockly.Python.ORDER_ATOMIC);
//   var dropdown_engine = block.getFieldValue('ENGINE');
//   var mapObj = {
//     TEXT: value_text_input,
//     ENGINES: dropdown_engine
//   };
//   var code = 'word_tokenize(TEXT, engine=\'ENGINES\')'.replace(/TEXT|ENGINES/gi, function(matched) {
//     return mapObj[matched];
//   });
//   return [code, Blockly.Python.ORDER_NONE];
// };

Blockly.Python['ws_import_mecab'] = function(block) {
  var code = 'import MeCab\n';
  code += 'wakati = MeCab.Tagger("-Owakati")\n';
  return code;
};

Blockly.Python['ws_tagger'] = function(block) {
  var value_input_text = Blockly.Python.valueToCode(block, 'INPUT_TEXT', Blockly.Python.ORDER_ATOMIC);
  var code = 'wakati.parse("TEXT").split()'.replace(/TEXT/gi,value_input_text.replace(/\'/g, ''));
  return [code, Blockly.Python.ORDER_NONE];
};
