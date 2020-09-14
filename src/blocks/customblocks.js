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

var RobotActionForward = {
  type: 'block_type',
  message0: 'Temi moves forward',
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: '',
  helpUrl: '',
};
Blockly.Blocks['robot_action_move_forward'] = {
  init: function () {
    this.jsonInit(RobotActionForward);
    this.setStyle('loop_blocks');
  },
};

var RobotActionBackward = {
  type: 'block_type',
  message0: 'Temi moves backward',
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: '',
  helpUrl: '',
};
Blockly.Blocks['robot_action_move_backward'] = {
  init: function () {
    this.jsonInit(RobotActionBackward);
    this.setStyle('loop_blocks');
  },
};

var RobotActionLeft = {
  type: 'block_type',
  message0: 'Temi moves left',
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: '',
  helpUrl: '',
};
Blockly.Blocks['robot_action_move_left'] = {
  init: function () {
    this.jsonInit(RobotActionLeft);
    this.setStyle('loop_blocks');
  },
};

var RobotActionRight = {
  type: 'block_type',
  message0: 'Temi moves right',
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: '',
  helpUrl: '',
};
Blockly.Blocks['robot_action_move_right'] = {
  init: function () {
    this.jsonInit(RobotActionRight);
    this.setStyle('loop_blocks');
  },
};

var RobotActionSpeak = {
  type: 'block_type',
  message0: 'Temi speaks %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT_TO_SPEACH',
      check: 'String',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: '',
  helpUrl: '',
};
Blockly.Blocks['robot_action_speak'] = {
  init: function () {
    this.jsonInit(RobotActionSpeak);
    this.setStyle('loop_blocks');
  },
};
