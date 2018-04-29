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
    this.addNewSite = this.addNewSite.bind(this)
    this.requestSuccess = this.requestSuccess.bind(this)
    this.requestFail = this.requestFail.bind(this)
    this.handleJob = this.handleJob.bind(this)
  }

  // Tracks text changes as user types
  handleTextChange(event) {
    this.setState({ pageUrl: event.target.value });
  }

  // Form submission for user's entered URL. Calls POST request
  handleFormSubmit(event) {
    event.preventDefault();
    const payload = {
      urlRequest: this.state.pageUrl,
    };
    this.addNewSite(payload);
  }

  // POST request: Adds new website to DB
  addNewSite(payload) {
    axios.post('http://localhost:3005/v1/website/add', {
      url: payload.urlRequest
    })
      .then(res => {this.requestSuccess(res)})
      .catch(err => {this.requestFail(err)})
    }

  // Messages a success to user
  requestSuccess(res) {
    this.setState({
      urlId: res.data,
      feedback: `Processing Request for: ${res.data}`
    });
  }

  // Messages a failure to user
  requestFail(err) {
    this.setState({
      feedback: 'Request Failed'
    });
    console.log(err);
  }

  // GET request: Retrieves HTML from DB and saves to state
  handleJob() {
    axios.get(`http://localhost:3005/v1/website/${this.state.urlId}`)
      .then(res => {
        this.setState({html: res.data})
        if (this.state.html.length > 0) {
          this.setState({feedback: 'Successfully retrieved HTML'});
        } else {
          this.setState({feedback: 'Sadly, no HTML was saved' });
        }
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
    width: '1000px',
    marginLeft: '250px',
  }
};

export default PageRequest;
