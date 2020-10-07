import React, { useRef, useState } from "react";
import BlocklyComponent, { Block, Value, Field, Category } from "./Blockly";
import BlocklyPython from "blockly/python";
import { babyAiService, exportWorkspace, downloadSavedWorkspace } from "./services/babyAiService";
import { CodeBlock, dracula } from "react-code-blocks";
import Blockly from 'blockly'

import "./blocks/customblocks";
import "./generator/generator";
import "./App.css";

//Container of result from server
const ConsoleComponent = ({ data = [] }) => {
  const items = data.map((val, index) => {
    return (
      <div className="itemsResult" key={index}>
        {val}
      </div>
    );
  });
  return (
    <>
      <p style={{ padding: "0 5px" }}>
        <b>Output Result</b>
      </p>
      <div className="wrapperItemResult">{items}</div>
    </>
  );
};

//Top bar componenet NOTE that save and load is in developed
const NavbarComponent = ({ generateCode, toggle, save, load, input}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #d2d2d2",
      }}
    >
      <div style={{ flex: 1 }}>
        <h3
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          Blockly Editor
        </h3>
      </div>
      <div style={{}}>
        <button onClick={toggle} className="previewBtn">
          Preview
        </button>
        <button onClick={generateCode} className="compileBtn">
          Execute
        </button>
        {/* Wait for API Line to save and download xml file */}
        <button onClick={save} className="saveBtn">
          Save
        </button>
        <button onClick={load} className="loadBtn">
          Load
        </button>
        <input type="file" name="file" onChange={input} display="none"/>
        
      </div>
    </div>
  );
};

//Blockly workspace html, you may add your defined block here
const WorkspaceComponent = ({ initWorkspaceRef }) => {
  return (
    <BlocklyComponent
      ref={(instanceRef) => {
        initWorkspaceRef(instanceRef);
      }}
      readOnly={false}
      trashcan={true}
      media={"media/"}
      move={{ scrollbars: true, drag: true, wheel: true }}
    >
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
          </Value>
        </Block>
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

      {/* Add our custom block category, tou can place it outside category as well */}
      <Category name="MeCab" colour="30">
        <Block type="ws_import_mecab"></Block>
        <Block type="ws_tagger"></Block>
        <Block type="text"></Block>
        <Block type="text_print"></Block>
      </Category>
    </BlocklyComponent>
  );
};

//Main application window
const App = () => {
  var loadedContent = ""
  var savedFilename = ""
  const workspaceRef = useRef(null); //workspace ref

  const [togglePreviewCode, setTogglePreviewCode] = useState(false);
  const [executeCodeResponse, setExecuteCodeResponse] = useState([]);
  const [codePreview, setCodePreview] = useState("");

  const getCode = () => {
    let codeFromBlock = BlocklyPython.workspaceToCode(
      workspaceRef.current.workspace
    );

    setCodePreview(codeFromBlock);
    return codeFromBlock;
  };

  //Test function 
  //save workspace
  const saveWorkspace = () => {
    try {
    var xml = Blockly.Xml.workspaceToDom(workspaceRef.current.workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    // setWorkspaceContent(xml_text);
    console.log("This is your workspace as text");
    console.log("Copy the following line, create a new file and save as .txt")
    console.log(xml_text);


    const response =  exportWorkspace(xml_text).then(res => {
      // data_content = res.data;
      savedFilename = res.data.split(',')[1].split(':')[1];
      //TEST
      const BASE_URL = `http://babyai.org:5000/workspace/export/download/` + savedFilename.replace(/'/g, '');
      const HEADERS = {
        "Accept" : "*/*",
      };
      window.open(BASE_URL, '_blank')
      // console.log(data_content.split(',')[1].split(':')[1])
    });

    }catch(e) {
      console.log(e)
    }
  }
  //load workspace
  const loadWorkspace = () => {
    // const test = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_repeat_ext" id="{]bu2.d];];(p7qjm0tL" x="290" y="96"><value name="TIMES"><block type="math_number" id="?Jdii%THAK4XU=9ex77A"><field name="NUM">10</field></block></value><statement name="DO"><block type="text_print" id="*iL-qlAy/xh%4aB#zPMj"><value name="TEXT"><block type="text" id="Y9ph%[APaN)B$+_grX}7"><field name="TEXT">test</field></block></value></block></statement></block></xml>'
    // const saved = Blockly.Xml.textToDom(test)
    // Blockly.Xml.clearWorkspaceAndLoadFromXml(saved, workspaceRef.current.workspace)
    const XML = Blockly.Xml.textToDom(loadedContent)
    Blockly.Xml.clearWorkspaceAndLoadFromXml(XML, workspaceRef.current.workspace)
  }

  const onFileChangeHandle = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target.result)
      loadedContent = text;
    }
    reader.readAsText(event.target.files[0])
  }

  //END test function------

  //Generate code from block connection
  const generateCode = async () => {
    const codeFromBlock = getCode();
    try{
    const response = await babyAiService(codeFromBlock);
    setExecuteCodeResponse(response.data.split("\n"));
    }catch(e) {
      alert('Cannot execute a code for reason: ' + e)
    }
  };

  //Toggle preview code besied OUTPUT tab
  const onHandlerTogglePreviewCode = () => {
    const toggle = togglePreviewCode ? false : true;
    getCode();
    setTogglePreviewCode(toggle);
  };

  //Main rendered window, blockly workspace reference object is called here
  return (
    <>
      <NavbarComponent
        generateCode={generateCode}
        toggle={onHandlerTogglePreviewCode}
        save={saveWorkspace}
        load={loadWorkspace}
        input={onFileChangeHandle}
      />
        <WorkspaceComponent
          initWorkspaceRef={(ref) => {
            workspaceRef.current = ref;
          }}/>
      <div>
      {/* PREVIEW button is press (toggle state), disply output*/}
      <div style={{ display: togglePreviewCode ? "none" : "initial" }}> 
        <ConsoleComponent data={executeCodeResponse.map((val) => `> ${val}`)} />
      </div>
 
      {/* PREVIEW button is press (toggle state), display python code and output side by side*/}
      <div style={{ display: togglePreviewCode ? "initial" : "none" }}> 
          <div className="wrapperToggleView">
            <div className="box">
              <ConsoleComponent data={executeCodeResponse.map((val) => `> ${val}`)} />
            </div>

            <div className="box">    
            <p style={{ padding: "0 5px" }}>
              <b>Python Code</b>
            </p>      
              <CodeBlock
                 text={
                    codePreview === ""
                      ? "🔥 #Let's Started 🔥 \n\n\n\n\n\n\n\n\n"
                      : codePreview
                  }
                  language={"python"}
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
              />
            </div>
          </div>
      </div>
      
      </div>
      
    </>
  );
};

export default App;
