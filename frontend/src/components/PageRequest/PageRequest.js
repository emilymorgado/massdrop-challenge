import React, { Component } from 'react';
import axios from 'axios';
import { Header, Input, Button } from '../common';

class PageRequest extends Component {
  constructor(props) {
    super (props);
    this.state = {
      pageUrl: '',
      urlId: '',
      feedback: '',
      html: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.authenticateText = this.authenticateText.bind(this)
    this.requestSuccess = this.requestSuccess.bind(this)
    this.requestFail = this.requestFail.bind(this)
    this.handleJob = this.handleJob.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const payload = {
      urlRequest: this.state.pageUrl,
    };
    this.authenticateText(payload);
  }

  handleTextChange(event) {
    this.setState({ pageUrl: event.target.value });
  }

  authenticateText(payload) {
    axios.post('http://localhost:3005/v1/website/add', {
      url: payload.urlRequest
    })
      .then(res => {this.requestSuccess(res)})
      .catch(err => {this.requestFail(err)})
    }

  requestSuccess(res) {
    this.setState({
      urlId: res.data,
      feedback: `Processing Request for: ${res.data}`
    });
  }

  requestFail(err) {
    this.setState({
      feedback: 'Request Failed'
    });
    console.log(err);
  }

  handleJob() {
    axios.get(`http://localhost:3005/v1/website/${this.state.urlId}`)
      .then(res => {
        this.setState({
          html: res.data,
          feedback: 'Successfully retrieved HTML'
        })
      })
      .catch(err => {this.requestFail(err)})
  }


  render() {
    return (
      <div>
        <Header headerText={'Enter a Website'} />
        <div style={styles.feedbackTextStyle}>
            {this.state.feedback}
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <Input
            placeholder={'somewhere.com'}
            type={'text'}
            content={this.state.value}
            onChange={this.handleTextChange}
          />
          <Button buttonText='Request it'>
            <input
              type={'submit'}
              value={'Submit'}
            />
           </Button>
        </form>

        <Button buttonText='Check Job' onClick={this.handleJob}>
          <input
            type={'submit'}
            value={'Submit'}
          />
         </Button>


        <div style={styles.showHTML}>
          {this.state.html}
        </div>

      </div>
    );
  }
}

const styles = {
  feedbackTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'blue',
  },
  showHTML: {
    backgroundColor: 'yellow',
    color: 'black',
  }
};

export default PageRequest;
