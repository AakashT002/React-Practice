import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import Verifications from '../../components/desktop/Verifications';
import VerificationDetails from '../../components/desktop/VerificationDetails';

import '../../assets/stylesheets/DesktopVerificationsPage.css';

import {
  sort,
  verifyProductIdentifier,
  clearVerificationResult,
  getVerificationDetails,
  search,
  clearSearchField,
  getVerifications,
} from '../../store/mobile/verification/action';

import {
  setVerificationPerformed,
  updateSelectedDetails
} from '../../store/desktop/dashboard/action';

import DateFormat from '../../utils/dateFormat';

export class VerificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdentifier: null,
      isPIVerificationModalVisible: false,
      disableOnSubmit: false,
      searchText: '',
      verificationList: [],
      selectedStatus: this.props.selectedStatus,
      selectedRequestTime: this.props.selectedRequestTime,
      isModalVisible: false,
    };
    this.handleVerificationDetails = this.handleVerificationDetails.bind(this);
    this.handleBackToVerifications = this.handleBackToVerifications.bind(this);
    this.handleVerifyProduct = this.handleVerifyProduct.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearchText = this.clearSearchText.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleRequestedChange = this.handleRequestedChange.bind(this);
    this.handleBackToDashboard = this.handleBackToDashboard.bind(this);
    this.handleExportData = this.handleExportData.bind(this);
    this.handlePostExportData = this.handlePostExportData.bind(this);
  }

  async componentWillMount() {
    await this.props.dispatch(
      getVerifications(
        this.state.selectedStatus,
        this.state.selectedRequestTime
      )
    );
    this.setState({ verificationList: this.props.data });
  }

  handleSort(isDescending) {
    this.props.dispatch(sort(this.props.data, !isDescending));
  }

  async handleCancel() {
    this.setState({
      isPIVerificationModalVisible: false,
      productIdentifier: null,
    });
    await this.props.dispatch(clearVerificationResult());
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
    this.setState({ disableOnSubmit: true });
    this.props.dispatch(setVerificationPerformed(true));
  }

  handleNextProduct() {
    this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
  }

  async handleVerificationDetails(gtin, srn, requestedTime) {
    await this.props.dispatch(clearVerificationResult());
    await this.props.dispatch(getVerificationDetails(gtin, srn, requestedTime));
    this.setState({ isPIVerificationModalVisible: false });
  }

  async handleBackToVerifications() {
    await this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
    this.setState({ isPIVerificationModalVisible: false });
    this.props.history.push('/verifications');
  }

  handleVerifyProduct() {
    this.setState({
      isPIVerificationModalVisible: true,
      productIdentifier: null,
    });
  }

  async handleFilterChange(value) {
    this.setState({ searchText: value });
    await this.props.dispatch(clearSearchField(this.state.verificationList));
  }

  handleSearch(e) {
    this.props.dispatch(search(this.props.data, this.state.searchText));
    e.preventDefault();
  }

  clearSearchText() {
    this.setState({ searchText: '' });
    this.props.dispatch(clearSearchField(this.state.verificationList));
  }

  handleBackToDashboard() {
    this.props.history.push('/');
  }

  async handleStatusChange(value) {
    await this.setState({ selectedStatus: value });
    await this.props.dispatch(
      updateSelectedDetails(this.state.selectedStatus, this.state.selectedRequestTime)
    );
    this.applySearch(this.state.selectedStatus, this.state.selectedRequestTime);
  }

  async handleRequestedChange(value) {
    await this.setState({ selectedRequestTime: value });

    this.applySearch(this.state.selectedStatus, this.state.selectedRequestTime);
  }

  async applySearch(selectedStatus, selectedRequestTime) {
    await this.props.dispatch(
      getVerifications(selectedStatus, selectedRequestTime)
    );
    this.setState({ verificationList: this.props.data });
    this.props.dispatch(search(this.props.data, this.state.searchText));
  }

  handleExportData() {
    this.setState({ isModalVisible: true });
  }

  handlePostExportData() {
    this.setState({ isModalVisible: false });
  }

  render() {
    let componentToRender = null;

    if (
      this.props.requesting === true &&
      this.props.filterRequesting === false
    ) {
      return (
        <div className="DesktopVerificationsPage__loader">
          <MDSpinner size={50} singleColor="#00b8d4" />
        </div>
      );
    } else {
      if (
        this.props.verificationResult.length === 0 ||
        (this.props.verificationResult.length > 0 &&
          this.state.isPIVerificationModalVisible === true)
      ) {
        componentToRender = (
          <Verifications
            data={this.props.data}
            handleSort={this.handleSort.bind(this)}
            isDescending={this.props.isDescending}
            handleVerificationDetails={this.handleVerificationDetails}
            isPIVerificationModalVisible={
              this.state.isPIVerificationModalVisible
            }
            handleVerifyProduct={this.handleVerifyProduct}
            handleNextProduct={this.handleNextProduct.bind(this)}
            handleCancel={this.handleCancel.bind(this)}
            handleVerify={this.handleVerify.bind(this)}
            verificationResult={this.props.verificationResult}
            handleChange={this.handleChange.bind(this)}
            productIdentifier={this.state.productIdentifier}
            piRequesting={this.props.piRequesting}
            disableOnSubmit={this.state.disableOnSubmit}
            expirationDateFormat={DateFormat.expirationDateFormat}
            transactionEventDateFormat={DateFormat.transactionEventDateFormat}
            deviceType={process.env.REACT_APP_DEVICE_TYPE}
            handleFilterChange={this.handleFilterChange}
            handleSearch={this.handleSearch}
            searchText={this.state.searchText}
            clearSearchText={this.clearSearchText}
            selectedStatus={this.state.selectedStatus}
            handleStatusChange={this.handleStatusChange}
            selectedRequestTime={this.state.selectedRequestTime}
            handleRequestedChange={this.handleRequestedChange}
            filterRequesting={this.props.filterRequesting}
            handleBackToDashboard={this.handleBackToDashboard}
            handleExportData={this.handleExportData}
            handlePostExportData={this.handlePostExportData}
            isModalVisible={this.state.isModalVisible}
          />
        );
      } else {
        componentToRender = (
          <VerificationDetails
            data={this.props.verificationResult}
            handleBackToVerifications={this.handleBackToVerifications}
            expirationDateFormat={DateFormat.expirationDateFormat}
            transactionEventDateFormat={DateFormat.transactionEventDateFormat}
            isPIVerificationModalVisible={
              this.state.isPIVerificationModalVisible
            }
            deviceType={process.env.REACT_APP_DEVICE_TYPE}
            handleExportData={this.handleExportData}
            handlePostExportData={this.handlePostExportData}
            isModalVisible={this.state.isModalVisible}
          />
        );
      }
    }
    return (
      <div className="DesktopVerificationsPage">
        <div className="VerificationsPage__header">{componentToRender}</div>
      </div>
    );
  }
}

VerificationsPage.propTypes = {
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  data: PropTypes.array,
  isDescending: PropTypes.bool,
  verificationResult: PropTypes.array,
  history: PropTypes.object,
  piRequesting: PropTypes.bool,
  deviceType: PropTypes.string,
  filterRequesting: PropTypes.bool,
  selectedStatus: PropTypes.string,
  selectedRequestTime: PropTypes.string,
};

const mapStateToProps = state => ({
  verificationResult: state.verification.verificationResult,
  data: state.verification.verificationList,
  requesting: state.verification.requesting,
  isDescending: state.verification.isDescending,
  piRequesting: state.verification.piRequesting,
  filterRequesting: state.verification.filterRequesting,
  selectedStatus: state.dashboard.selectedStatus,
  selectedRequestTime: state.dashboard.selectedRequestTime,
});

export default connect(mapStateToProps)(VerificationsPage);
