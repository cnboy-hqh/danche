import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjs from 'draftjs-to-html';

export default class Rich extends Component {

  state = {

  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  handleClearContent = () => {
    this.setState({
      editorState: ''
    })
  }

  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

  onEditorChange = contentState => {
    this.setState({
      contentState  //内容状态
    })
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClearContent} style={{ marginRight: 10 }}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title="富文本编辑器" className='card-wrap'>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    )
  }
}