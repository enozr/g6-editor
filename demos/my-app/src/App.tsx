import * as React from 'react';
import ModelFlowEditor from './FlowDetail';

// import './App.css';

import logo from './logo.svg';

interface AppProps {

}

interface AppState {
  modalVisible: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  handleOk = (e) => {
    this.setState({
      modalVisible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  }

  public edit = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible }, () => {
    })
  }
  public render() {
    return (
      <div className="App">
        <ModelFlowEditor
          edit={this.edit}
          modalVisible={this.state.modalVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default App;
