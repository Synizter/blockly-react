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

//Example
//Define how the block should be translated to code
//Node that the code is in string fomrat (javascirpt)
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

Blockly.Python['single_perceptron'] = function(block) {
  var number_x1 = block.getFieldValue('X1');
  var number_w1 = block.getFieldValue('W1');
  var number_x2 = block.getFieldValue('X2');
  var number_w2 = block.getFieldValue('W2');
  var value_activation_funciton = Blockly.Python.valueToCode(block, 'ACTIVATE_FUNC', Blockly.Python.ORDER_NONE);
  // TODO: Assemble Python into code variable.
  //This implementation is quite staic in variable name since there's no variable block implemented 
  var code = "#-----Simple NN Block---------\n"
  code += 'in_x1 = {}\n'.replace(/{}/g, number_x1);
  code += 'in_x2 = {}\n'.replace(/{}/g, number_x2);
  code += 'w1 = {}\n'.replace(/{}/g, number_w1);
  code += 'w2 = {}\n'.replace(/{}/g, number_w2);
  code += 'out = (w1 * in_x1) + (w2 * in_x2)\n';

  code += value_activation_funciton;
  return code;
};

//Activation Function Block
//Binary Step
Blockly.Python['binary_step_act'] = function(block) {
  var number_zeta = block.getFieldValue('ZETA');
  // TODO: Assemble Python into code variable.
  var code = "#-----Binary step Block---------\n"
  code += 'zeta = {}\n'.replace(/{}/g, number_zeta);
  code += 'if out > zeta:\n'
  code += '\tprint("Output is 1")\r\n'
  code += 'else:\n'
  code += '\tprint("Output is 0")\r\n'
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['sigmoid_act'] = function(block) {
  var number_zeta = block.getFieldValue('ZETA');
  var number_alpha = block.getFieldValue('ALPHA');
  Blockly.Python.provideFunction_('sigmoid_act', ['import math'])//Auto import math
  // TODO: Assemble Python into code variable.
  var code = "#-----Sigmoid Block---------\n"
  code += 'zeta  = {}\n'.replace(/{}/g, number_zeta);
  code += 'alpha = {}\n'.replace(/{}/g, number_alpha);
  code += 'y = (1 / (1 + math.exp(-1 * (out - zeta) * alpha)))\n'
  code += 'print(\'Output is : {}\'.format(y))\n'
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};