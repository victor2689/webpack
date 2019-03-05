import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';

class sweet extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div>
        <button onClick={()=> this.setState({ show: true })}>Alert</button>
        <SweetAlert 
          show={this.state.show}
          title="demo"
          html
          text={"nuevo"}
          onConfirm={()=> this.setState({show: false})}
        />
      </div>
    );
  }
}

export default sweet;