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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';
import { Block } from '../Blockly';

var testReactField = {
  type: 'test_react_field',
  message0: 'custom field %1',
  args0: [
    {
      type: 'field_react_component',
      name: 'FIELD',
      text: 'Click me',
    },
  ],
  previousStatement: null,
  nextStatement: null,
};

Blockly.Blocks['test_react_field'] = {
  init: function () {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
  },
};

var reactDateField = {
  type: 'test_react_date_field',
  message0: 'date field %1',
  args0: [
    {
      type: 'field_react_date',
      name: 'DATE',
      date: '01/01/2020',
    },
  ],
  previousStatement: null,
  nextStatement: null,
};

Blockly.Blocks['test_react_date_field'] = {
  init: function () {
    this.jsonInit(reactDateField);
    this.setStyle('loop_blocks');
  },
};

// var PTNLPImportTokenize = {
//   "type": "ptnlp_word_tokenize_import",
//   "message0": "Use word tokenize of pythainlp",
//   "previousStatement": null,
//   "nextStatement": null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": ""
// }
// Blockly.Blocks['ptnlp_word_tokenize_import'] = {
//   init: function() {
//     this.jsonInit(PTNLPImportTokenize);
//     this.setStyle('loop_blocks');
//   }
// }

// var PTNLPTokenizeWord = {
//   "type": "ptnlp_tokenize_word",
//   "message0": "Tokenize : %1 with engine %2",
//   "args0": [
//     {
//       "type": "input_value",
//       "name": "TEXT_INPUT",
//       "check": "String"
//     },
//     {
//       "type": "field_dropdown",
//       "name": "ENGINE",
//       "options": [
//         [
//           "ICU",
//           "icu"
//         ],
//         [
//           "DICTIONARY",
//           "dict"
//         ],
//         [
//           "PYLEXTO",
//           "pylexto"
//         ],
//         [
//           "MM",
//           "mm"
//         ],
//         [
//           "NEW MM",
//           "newmm"
//         ]
//       ]
//     }
//   ],
//   "inputsInline": true,
//   "output":null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": "https://pythainlp.readthedocs.io/en/latest/pythainlp-1-4-thai/"
// }
// Blockly.Blocks['ptnlp_tokenize_word'] = {
//   init: function() {
//     this.jsonInit(PTNLPTokenizeWord);
//     this.setStyle('loop_blocks');
//   }
// }

//Example of block creation
//create variable that contain a block definition in JSON format
var MeCabImport = {
  "type": "ws_import_mecab",
  "message0": "MeCab import",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
};
//Use the following information to create class
Blockly.Blocks['ws_import_mecab'] = {
  init: function () {
    this.jsonInit(MeCabImport);
    this.setStyle('loop_blocks');
  },
};

var MeCabOwakatiTagger = {
  "type": "ws_tagger",
  "message0": "text to be segmented: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "INPUT_TEXT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
Blockly.Blocks['ws_tagger'] = {
  init: function () {
    this.jsonInit(MeCabOwakatiTagger);
    this.setStyle('loop_blocks');
  },
};


//Single Perceptron for output realize
var SinglePerceptron = {
  "type": "xor_single_perceptron",
  "message0": "Single Perceptron for Logic Realize %1 Input X1 %2 W1 %3 %4 Input X2 %5 W2 %6 %7 Activation function: %8",
  "args0": [
    {
      "type":"input_dummy"
    },
    {
      "type": "field_number",
      "name": "X1",
      "value": 0,
      "min": 0,
      "max": 1
    }, 
    {
      "type": "field_number",
      "name": "W1",
      "value": 0
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "X2",
      "value": 0,
      "min": 0,
      "max": 1
    },
    {
      "type": "field_number",
      "name": "W2",
      "value": 0
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ACTIVATE_FUNC",
      "align": "right"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 44,
  "tooltip": "",
  "helpUrl": ""
}
Blockly.Blocks['single_perceptron'] = {
  init: function () {
    this.jsonInit(SinglePerceptron);
    this.setStyle('loop_blocks')
  }
}
// Activation Functio Block
//Binary Step
var BinaryStepAct = {
  "type": "binary_step_act",
  "message0": "Binary Step %1 param 1 : Zeta %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "ZETA",
      "value": 0
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
Blockly.Blocks['binary_step_act'] = {
  init: function () {
    this.jsonInit(BinaryStepAct);
    this.setStyle('loop_blocks')
    //Although color is already define in JSON, jsonInit function seem not to recognize a 'colour' method
    this.setColour(BinaryStepAct['colour']); //set color using JSON attribute
  }
}

//Sigmoid
var SigmoidAct = {
  "type": "sigmoid_act",
  "message0": "Sigmoid %1 param 1: Zeta  %2 %3 param 2: Alpha %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "ZETA",
      "value": 0,
      "min": -1,
      "max": 1,
      "precision": 0.000001
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "ALPHA",
      "value": 0.5,
      "min": 0,
      "max": 1,
      "precision": 0.000001
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "Zeta (-1,1) define a threshold while Alpha (0,1) define a learning rate of sigmoid from its equation",
  "helpUrl": "https://en.wikipedia.org/wiki/Sigmoid_function"
}
Blockly.Blocks['sigmoid_act'] = {
  init: function () {
    this.jsonInit(SigmoidAct);
    this.setStyle('loop_blocks');
    this.setColour(BinaryStepAct['colour']); //set color using JSON attribute
  }
}