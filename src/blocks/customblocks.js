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

//Temi block
Blockly.Blocks['speech_say'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Say")
        .appendField(new Blockly.FieldTextInput("hello world"), "utterance")
        .appendField("in")
        .appendField(new Blockly.FieldDropdown([["Thai","TH"], ["English","EN"], ["Japanese","JP"]]), "language_options");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("Type what you want temi to say, select languge either English, Japanese or Thai");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['locations_goto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Go to")
        .appendField(new Blockly.FieldTextInput("kitchen"), "location");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Command temi to go to a pre-defined location");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['follow_unconstrained'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Follow");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("Follow the nearest person in front of temi");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['follow_constrained'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Follow")
        .appendField("(in-place)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("Follow (in-place) the nearest person in front of temi");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement_turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldAngle(90), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("Turn temi by a specified angle");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement_tilt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tilt")
        .appendField(new Blockly.FieldNumber(0, -15, 55), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("Tilt temi by a specified angle. Choose a value between -15 and 55.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement_joystick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move")
        .appendField("X:")
        .appendField(new Blockly.FieldNumber(0), "x")
        .appendField("Y:")
        .appendField(new Blockly.FieldNumber(0), "y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("Move temi along the X and Y axis");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Moves")
        .appendField(new Blockly.FieldDropdown([["forward","FWD"], ["baackward","BWD"]]), "direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("define direction of movement");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['locations_go_home'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Return Home");
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("Command temi to return Home");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['call_person'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Call")
        .appendField(new Blockly.FieldTextInput(""), "contact");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Call a person in contact list");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['event_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Event:")
        .appendField(new Blockly.FieldDropdown([["out of bed","EVT_OUT_OF_BED"], ["sitting","EVT_SIT_ON_BED"]]), "event");
    this.appendStatementInput("event_out_of_bed")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("event for block (none-sequence)");
 this.setHelpUrl("");
  }
};