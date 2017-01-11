// @flow
import React, { Component } from 'react';
import R from 'ramda';

import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';

import LinearProgress from 'material-ui/LinearProgress';
import * as Colors from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

import StamAvatar from '../StamAvatar';
import FlightRow from './FlightRow';

import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import ActionAdd from 'material-ui/svg-icons/action/alarm-add';

import F from 'flexbox-react';

import { sectors as envSectors } from '../../../../shared/env';

import AddFlightToStam from './AddFlightToStam';

const boxStyle = {
  padding: 10,
};

type ElementarySector = string;

export type Flight = {
  arcid: string,
  constraint: {
    beacon: string,
    flightLevel: number,
  },
  implementingSector: ElementarySector,
  onloadSector: ElementarySector,
};

type Props = {
  offloadSector: ElementarySector,
  flights: Array<Flight>,
  stamId: string,
};

export class StamCard extends Component {
  props: Props;
  state: {
    formOpen: boolean,
    selectedFlightForForm: ?Flight,
    isAddFlightFormValid: boolean,
    isAddFlightFormSubmitting: boolean,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      formOpen: false,
      isAddFlightFormValid: false,
      isAddFlightFormSubmitting: false,
      selectedFlightForForm: null,
    };
  }

  addFlightForm = null;

  handleOpenForm = (flight: ?Flight) => {
    this.setState({
      formOpen: true,
      selectedFlightForForm: flight,
    });
  };

  handleFormIsValid = () => {
    this.setState({isAddFlightFormValid: true});
  };

  handleFormIsInvalid = () => {
    this.setState({isAddFlightFormValid: false});
  };

  handleAddFlightButton = () => {
    if(!this.addFlightForm) {
      return;
    }

    const { isAddFlightFormValid } = this.state;

    if(!isAddFlightFormValid) {
      return;
    }

    // Trigger the submit in the child component
    this.addFlightForm.submit();
  };

  handleDiscardButton = () => {
    this.setState({
      formOpen: false,
      selectedFlightForForm: null,
      isAddFlightFormValid: false,
      isAddFlightFormSubmitting: false,
    });
  };

  // Handle submit from child component
  handleFormSubmit = (data: Object, resetModel: *, invalidateModel: *) => {
    console.log('Form has been submitted, data is', data);

    this.setState({isAddFlightFormSubmitting: true});
    setTimeout(() => {
      invalidateModel({
        implementingSector: 'Not a valid sector !',
      });
      this.setState({isAddFlightFormSubmitting: false});
    }, 2000);
  };

  _renderForm() {
    const {
      formOpen,
      selectedFlightForForm,
      isAddFlightFormSubmitting,
    } = this.state;

    if(!formOpen) {
      return null;
    }

    const additionalProps = {};
    if(selectedFlightForForm) {
      Object.assign(additionalProps, {flight: selectedFlightForForm});
    }

    return (
      <AddFlightToStam
        ref={(addFlightForm) => {
          this.addFlightForm = addFlightForm;
        }}
        onValid={this.handleFormIsValid}
        onInvalid={this.handleFormIsInvalid}
        onSubmit={this.handleFormSubmit}
        loading={isAddFlightFormSubmitting}
        {...additionalProps}
      />
    );
  }

  _renderFormActions() {
    const {
      formOpen,
      isAddFlightFormValid,
      isAddFlightFormSubmitting,
      selectedFlightForForm,
    } = this.state;

    if(!formOpen) {
      return null;
    }

    const addOrSave = selectedFlightForForm ? 'Save' : 'Add';

    return [
      <RaisedButton
        label="discard"
        backgroundColor={Colors.red500}
        onClick={this.handleDiscardButton}
      />,
      <RaisedButton
        label={isAddFlightFormSubmitting ? 'Loading ...' : addOrSave}
        onClick={this.handleAddFlightButton}
        disabled={!isAddFlightFormValid || isAddFlightFormSubmitting}
      />
    ];
  }


  _renderFlights() {
    const {
      flights,
    } = this.props;


    if(R.isEmpty(flights)) {
      return <div>No flights yet !</div>;
    }

    return flights.map(flight => (
      <FlightRow
        flight={flight}
        onRequestEdit={this.handleOpenForm.bind(this, flight)}
      />
    ));
  }

  _renderInside() {
    const {
      formOpen,
    } = this.state;

    if(formOpen) {
      return this._renderForm();
    }

    // Form is not open, render flight list
    return [
      this._renderFlights(),
      <RaisedButton label="Add" onClick={this.handleOpenForm.bind(this, null)} />,
    ];
  }

  _renderActions() {
    const {
      formOpen,
    } = this.state;

    if(formOpen) {
      return this._renderFormActions();
    }

    return [
      <RaisedButton backgroundColor={Colors.red500} label="remove" />,
      <RaisedButton backgroundColor={Colors.green500} label="send" />,
    ];
  }


  render() {
    const {
      stamId,
      offloadSector,
      flights,
    } = this.props;

    const {
      formOpen,
    } = this.state;

    return (
      <Card>
        <CardHeader
          title={`OFFLOAD ${offloadSector}`}
          subtitle={<i>{stamId}</i>}
          avatar={
            <StamAvatar
              stamId={stamId}
            >
              {offloadSector}
            </StamAvatar>
          }
        />
        <Divider />
        <CardText>
          <F flexDirection="column">
            {this._renderInside()}
          </F>
        </CardText>
        {!formOpen &&
          <LinearProgress mode="determinate" color={Colors.green500} value={50} />
        }
        <CardActions>
          {this._renderActions()}
        </CardActions>
      </Card>
    );
  }
}

export default StamCard;