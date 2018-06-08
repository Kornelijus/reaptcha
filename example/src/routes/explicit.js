/* @flow */

import React, { Component, Fragment } from 'react';
import qs from 'query-string';

import Reaptcha from '../../../index';
import Button from '../components/button';
import Container from '../components/container';

const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

type Props = {
  location: {
    search: string
  }
};

type State = {
  ready: boolean,
  rendered: boolean
};

export default class Explicit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ready: false,
      rendered: false
    };
  }

  captcha: ?Reaptcha = null;

  render() {
    const options = qs.parse(this.props.location.search);
    const renderDisabled = !this.state.ready || this.state.rendered;

    return (
      <Fragment>
        <Container>
          <Button
            onClick={() => {
              if (this.captcha) {
                this.captcha.renderRecaptcha();
              }
              this.setState({ rendered: true });
            }}
            disabled={renderDisabled}
          >
            Render
          </Button>
        </Container>
        <Reaptcha
          {...options}
          ref={e => (this.captcha = e)}
          sitekey={SITE_KEY}
          onLoad={() => {
            this.setState({
              ready: true
            });
          }}
          onVerify={() => {
            // Do something
          }}
          explicit
          inject
        />
      </Fragment>
    );
  }
}