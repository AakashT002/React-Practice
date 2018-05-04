import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, SelectField } from 'react-md';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import VerificationDetails from '../../components/desktop/VerificationDetails';
import PercentageStats from '../../components/desktop/PercentageStats';
import NumberStats from '../../components/desktop/NumberStats';
import PIVerificationModal from '../../components/common/PIVerificationModal';

import responseTime from '../../assets/images/responseTime.png';
import alerts from '../../assets/images/alerts.png';

import DateFormat from '../../utils/dateFormat';
import {
  getStatsForUser,
  getStatsForDevices,
  getStatsForNumbers,
  updateSelectedDetails,
  setVerificationPerformed,
} from '../../store/desktop/dashboard/action';

import {
  sort,
  verifyProductIdentifier,
  clearVerificationResult,
  getVerificationDetails,
} from '../../store/mobile/verification/action';

import '../../assets/stylesheets/Dashboard.css';

import { REQUESTED_TIME_DASHBOARD } from '../../utils/constants';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdentifier: null,
      isPIVerificationModalVisible: false,
      selectedRequestTime: this.props.selectedRequestTime,
      disableOnSubmit: false,
      isVerifyUsed: false,
    };
    this.handleVerifyProduct = this.handleVerifyProduct.bind(this);
    this.handleRequestedChange = this.handleRequestedChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.handleVerificationDetails = this.handleVerificationDetails.bind(this);
    this.handleBackToVerifications = this.handleBackToVerifications.bind(this);
    this.handleStatsClick = this.handleStatsClick.bind(this);
  }

  async componentWillMount() {
    if (sessionStorage.getItem('userRole') !== 'manager') {
      this.props.history.push('/verifications');
    }
    if (this.props.fetchStats) {
      await Promise.all([
        this.props.dispatch(getStatsForUser(this.state.selectedRequestTime)),
        this.props.dispatch(getStatsForDevices(this.state.selectedRequestTime)),
        this.props.dispatch(getStatsForNumbers(this.state.selectedRequestTime)),
      ]);
    }
    this.props.dispatch(setVerificationPerformed(false));
  }

  async handleRequestedChange(value) {
    await this.setState({ selectedRequestTime: value });
    await this.props.dispatch(getStatsForUser(this.state.selectedRequestTime));
    await this.props.dispatch(
      getStatsForDevices(this.state.selectedRequestTime)
    );
    await this.props.dispatch(
      getStatsForNumbers(this.state.selectedRequestTime)
    );
  }

  handleVerifyProduct() {
    this.setState({
      isPIVerificationModalVisible: true,
      productIdentifier: null,
    });
  }

  handleChange(value) {
    this.setState({ productIdentifier: value, disableOnSubmit: false });
  }

  async handleVerify(e) {
    e.preventDefault();
    var deviceId = null;
    await this.props
      .dispatch(
        verifyProductIdentifier(
          this.state.productIdentifier.trim(),
          process.env.REACT_APP_DEVICE_TYPE,
          deviceId
        )
      );
    await this.props.dispatch(sort(this.props.data, this.props.isDescending));
    this.setState({ disableOnSubmit: true, isVerifyUsed: true });
  }

  async handleCancel() {
    this.setState({
      isPIVerificationModalVisible: false,
      productIdentifier: null,
    });
    await this.props.dispatch(clearVerificationResult());
    if (this.state.isVerifyUsed) {
      await Promise.all([
        this.props.dispatch(getStatsForUser(this.state.selectedRequestTime)),
        this.props.dispatch(getStatsForDevices(this.state.selectedRequestTime)),
        this.props.dispatch(getStatsForNumbers(this.state.selectedRequestTime)),
      ]);
    }
  }

  handleNextProduct() {
    this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
  }

  async handleVerificationDetails(gtin, srn, requestedTime) {
    await this.props.dispatch(getVerificationDetails(gtin, srn, requestedTime));
    this.setState({ isPIVerificationModalVisible: false });
  }

  handleStatsClick(status) {
    this.props.dispatch(
      updateSelectedDetails(status, this.state.selectedRequestTime)
    );
    this.props.history.push('/verifications');
  }

  async handleBackToVerifications() {
    await this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
    this.setState({ isPIVerificationModalVisible: false });
    this.props.history.push('/dashboard');
    await Promise.all([
      this.props.dispatch(getStatsForUser(this.state.selectedRequestTime)),
      this.props.dispatch(getStatsForDevices(this.state.selectedRequestTime)),
      this.props.dispatch(getStatsForNumbers(this.state.selectedRequestTime)),
    ]);
  }

  renderStatsForNumbers(statsForNumbers) {
    return Object.keys(statsForNumbers).map(key => {
      return (
        <div
          className={`Dashboard__numberstats-${key}`}
          key={key}
          onClick={() => {
            this.handleStatsClick(key);
          }}
        >
          <NumberStats status={key} count={statsForNumbers[key]} />
        </div>
      );
    });
  }

  render() {
    if (
      this.props.userRequesting ||
      this.props.deviceRequesting ||
      this.props.numberRequesting ||
      this.props.requesting
    ) {
      return (
        <div className="Dashboard__loader">
          <MDSpinner size={50} singleColor="#00b8d4" />
        </div>
      );
    } else {
      if (
        this.props.verificationResult.length === 0 ||
        (this.props.verificationResult.length > 0 &&
          this.state.isPIVerificationModalVisible === true)
      ) {
        return (
          <div className="Dashboard">
            <div className="Dashboard__header">
              <div>
                <SelectField
                  id="select-field-default-value-menu"
                  className="Dashboard__requested--select-field"
                  label=""
                  itemLabel="title"
                  menuItems={REQUESTED_TIME_DASHBOARD}
                  value={this.state.selectedRequestTime}
                  onChange={value => this.handleRequestedChange(value)}
                />
                <Button
                  flat
                  onClick={this.handleVerifyProduct}
                  className="Dashboard__verify-product--button"
                >
                  VERIFY PRODUCT
                </Button>
                <PIVerificationModal
                  isPIVerificationModalVisible={
                    this.state.isPIVerificationModalVisible
                  }
                  verificationResult={this.props.verificationResult}
                  handleVerify={this.handleVerify}
                  deviceType={process.env.REACT_APP_DEVICE_TYPE}
                  expirationDateFormat={DateFormat.expirationDateFormat}
                  transactionEventDateFormat={
                    DateFormat.transactionEventDateFormat
                  }
                  handleChange={this.handleChange}
                  isDescending={this.props.isDescending}
                  handleVerificationDetails={this.handleVerificationDetails}
                  handleNextProduct={this.handleNextProduct.bind(this)}
                  handleCancel={this.handleCancel.bind(this)}
                  productIdentifier={this.state.productIdentifier}
                  piRequesting={this.props.piRequesting}
                  disableOnSubmit={this.state.disableOnSubmit}
                  modal='dashboard'
                  selectedRequestTime={this.state.selectedRequestTime}
                />
                {this.renderStatsForNumbers(this.props.statsForNumbers)}
                <div className="Dashboard__responsetimes">
                  <img src={responseTime} alt="responseTime" />
                </div>
                <div className="Dashboard__alerts">
                  <img src={alerts} alt="alerts" />
                </div>
                <div className="Dashboard__users">
                  <PercentageStats stats={this.props.statsForUser} />
                </div>
                <div className="Dashboard__devices">
                  <PercentageStats stats={this.props.statsForDevices} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="Dashboard__verification-details">
            <VerificationDetails
              data={this.props.verificationResult}
              handleBackToVerifications={this.handleBackToVerifications}
              expirationDateFormat={DateFormat.expirationDateFormat}
              transactionEventDateFormat={DateFormat.transactionEventDateFormat}
              isPIVerificationModalVisible={
                this.state.isPIVerificationModalVisible
              }
              deviceType={process.env.REACT_APP_DEVICE_TYPE}
            />
          </div>
        );
      }
    }
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  statsForUser: PropTypes.object,
  statsForDevices: PropTypes.object,
  statsForNumbers: PropTypes.object,
  userRequesting: PropTypes.bool,
  deviceRequesting: PropTypes.bool,
  numberRequesting: PropTypes.bool,
  selectedRequestTime: PropTypes.string,
  handleRequestedChange: PropTypes.func,
  handleVerify: PropTypes.func,
  handleNextProduct: PropTypes.func,
  requesting: PropTypes.bool,
  history: PropTypes.object,
  data: PropTypes.array,
  isDescending: PropTypes.bool,
  verificationResult: PropTypes.array,
  piRequesting: PropTypes.bool,
  fetchStats: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    statsForUser: state.dashboard.statsForUser,
    statsForDevices: state.dashboard.statsForDevices,
    statsForNumbers: state.dashboard.statsForNumbers,
    userRequesting: state.dashboard.userRequesting,
    deviceRequesting: state.dashboard.deviceRequesting,
    numberRequesting: state.dashboard.numberRequesting,
    verificationResult: state.verification.verificationResult,
    piRequesting: state.verification.piRequesting,
    data: state.verification.verificationList,
    requesting: state.verification.requesting,
    fetchStats: state.dashboard.fetchStats,
    selectedRequestTime: state.dashboard.selectedRequestTime,
  };
}

export default connect(mapStateToProps)(Dashboard);
