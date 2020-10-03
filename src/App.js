import React, { useRef, useState } from "react";
import BlocklyComponent, { Block, Value, Field, Category } from "./Blockly";
import BlocklyPython from "blockly/python";
import { babyAiService } from "./services/babyAiService";
import { CodeBlock, dracula } from "react-code-blocks";
import "./blocks/customblocks";
import "./generator/generator";
import "./App.css";

const NavbarComponent = ({ generateCode, toggle }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #d2d2d2",
      }}
    >
      <div style={{ flex: 1 }}>
        <h3
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          Blockly
        </h3>
      </div>
      <div style={{}}>
        <button onClick={toggle} className="previewBtn">
          Preview Code
        </button>
        <button onClick={generateCode} className="compileBtn">
          Compile Code
        </button>
      </div>
    </div>
  );
};

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

      <Category name="MeCab Japanese Word Segmentation" colour="30">
        <Block type="ws_import_mecab"></Block>
        <Block type="ws_tagger"></Block>
        <Block type="text"></Block>
        <Block type="text_print"></Block>
      </Category>
    </BlocklyComponent>
  );
};

const App = () => {
  const workspaceRef = useRef(null);
  const [togglePreviewCode, setTogglePreviewCode] = useState(false);
  const [executeCodeResponse, setExecuteCodeResponse] = useState(null);
  const [codePreview, setCodePreview] = useState("");

  const getCode = () => {
    const codeFromBlock = BlocklyPython.workspaceToCode(
      workspaceRef.current.workspace
    );

    setCodePreview(codeFromBlock);
    return codeFromBlock;
  };

  const generateCode = async () => {
    const codeFromBlock = getCode();
    const response = await babyAiService(codeFromBlock);
    setExecuteCodeResponse(response.data);
  };

  const onHandlerTogglePreviewCode = () => {
    const toggle = togglePreviewCode ? false : true;
    getCode();
    setTogglePreviewCode(toggle);
  };

  return (
    <>
      <NavbarComponent toggle={onHandlerTogglePreviewCode} />
      <div style={{ display: togglePreviewCode ? "initial" : "none" }}>
        <div style={{ padding: "20px" }}>
          <CodeBlock
            text={codePreview}
            language={"python"}
            showLineNumbers={true}
            theme={dracula}
            codeBlock
          />
        </div>
      </div>
      <div style={{ display: togglePreviewCode ? "none" : "initial" }}>
        <WorkspaceComponent
          initWorkspaceRef={(ref) => {
            workspaceRef.current = ref;
          }}
        />
      </div>
    </>
  );
};

export default App;
