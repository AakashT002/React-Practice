import React from 'react';
import {
  Button,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Card,
  TextField,
  SelectField,
} from 'react-md';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import moment from 'moment';

import ExportData from './ExportData.js';

import PIVerificationModal from '../../components/common/PIVerificationModal';
import Pagination from '../../containers/desktop/Pagination';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

import 'font-awesome/css/font-awesome.min.css';
import '../../assets/stylesheets/DesktopVerifications.css';

import {
  ERROR,
  ERROR_LABEL,
  EXPORT_DATA_LIST_INSTRUCTION,
  NINETY_DAY,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  ONE_DAY,
  PAST_24_HOURS,
  PAST_7_DAYS,
  PAST_30_DAYS,
  PAST_90_DAYS,
  PAST_6_MONTHS,
  PAST_12_MONTHS,
  PENDING,
  PENDING_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
  VERIFICATIONS_HEADER,
  SEARCH_QUERY_LABEL,
  SEVEN_DAY,
  SIX_M,
  SORT_FIELD_REQUESTED,
  STATUS,
  STATUS_LABEL,
  THIRTY_DAY,
  TWELVE_M,
  REQUESTED_TIME,
  REQUESTED_TIME_LABEL,
  ALL_STATUS,
  ALL_TIME,
} from '../../utils/constants';

const Verifications = ({
  data,
  handleSort,
  isDescending,
  handleVerificationDetails,
  handleVerifyProduct,
  handleNextProduct,
  handleCancel,
  handleVerify,
  verificationResult,
  handleChange,
  productIdentifier,
  isPIVerificationModalVisible,
  piRequesting,
  disableOnSubmit,
  expirationDateFormat,
  transactionEventDateFormat,
  deviceType,
  handleSearch,
  handleFilterChange,
  searchText,
  clearSearchText,
  selectedStatus,
  handleStatusChange,
  handleRequestedChange,
  selectedRequestTime,
  filterRequesting,
  handleBackToDashboard,
  handleExportData,
  handlePostExportData,
  isModalVisible,
  items,
  onChangePage,
  pageOfItems
}) => {
  const renderStatusText = status => {
    if (status === VERIFIED) {
      return VERIFIED_LABEL;
    } else if (status === PENDING) {
      return PENDING_LABEL;
    } else if (status === ERROR) {
      return ERROR_LABEL;
    } else if (status === NOT_VERIFIED) {
      return NOT_VERIFIED_LABEL;
    } else if (status === ALL_STATUS) {
      return ALL_STATUS;
    }
  };

  const renderClassName = status => {
    if (status === VERIFIED) {
      return 'DesktopVerifications__table--column-verifiedStatusText';
    } else if (status === PENDING) {
      return 'DesktopVerifications__table--column-pendingStatusText';
    } else if (status === ERROR) {
      return 'DesktopVerifications__table--column-errorStatusText';
    } else if (status === NOT_VERIFIED) {
      return 'DesktopVerifications__table--column-notVerifiedStatusText';
    }
  };

  const renderOnHoverClassName = status => {
    if (status === VERIFIED) {
      return 'DesktopVerifications__table--row-verified';
    } else if (status === PENDING) {
      return 'DesktopVerifications__table--row-pending';
    } else if (status === ERROR) {
      return 'DesktopVerifications__table--row-error';
    } else if (status === NOT_VERIFIED) {
      return 'DesktopVerifications__table--row-notVerified';
    }
  };

  const getRequestedTimeLabel = requestedTime => {
    if (requestedTime === ONE_DAY) {
      return PAST_24_HOURS;
    } else if (requestedTime === SEVEN_DAY) {
      return PAST_7_DAYS;
    } else if (requestedTime === THIRTY_DAY) {
      return PAST_30_DAYS;
    } else if (requestedTime === NINETY_DAY) {
      return PAST_90_DAYS;
    } else if (requestedTime === SIX_M) {
      return PAST_6_MONTHS;
    } else if (requestedTime === TWELVE_M) {
      return PAST_12_MONTHS;
    } else if (requestedTime === ALL_STATUS) {
      return ALL_TIME;
    }
  };

  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return (
        <img
          src={check_circle}
          alt="check_circle"
          className="DesktopVerifications__status--icon"
        />
      );
    } else if (status === PENDING) {
      return (
        <img
          src={access_time}
          alt="access_time"
          className="DesktopVerifications__status--icon"
        />
      );
    } else if (status === ERROR) {
      return (
        <img
          src={error_outline}
          alt="error_outline"
          className="DesktopVerifications__status--icon"
        />
      );
    } else if (status === NOT_VERIFIED) {
      return (
        <img
          src={not_interested}
          alt="not_interested"
          className="DesktopVerifications__status--icon"
        />
      );
    }
  };

  const renderHeaderAndSortable = (header, isDescending) => {
    if (header === SORT_FIELD_REQUESTED) {
      return (
        <label className="DesktopVerifications__requested--label">
          {header}
          <i
            className="material-icons DesktopVerifications__table--header-icon"
            onClick={() => handleSort(isDescending)}
          >
            {isDescending ? 'arrow_downward' : 'arrow_upward'}
          </i>
        </label>
      );
    } else {
      return header;
    }
  };

  var exportData = [];

  exportData.push(
    [SEARCH_QUERY_LABEL, searchText],
    [STATUS_LABEL, renderStatusText(selectedStatus)],
    [REQUESTED_TIME_LABEL, getRequestedTimeLabel(selectedRequestTime)],
    [],
    VERIFICATIONS_HEADER
  );

  data.forEach(verification => {
    exportData.push([
      `'${verification.gtin}${verification.srn}'`,
      renderStatusText(verification.status),
      transactionEventDateFormat(verification.requestSentTime),
      `${verification.firstName} ${verification.lastName}`,
      verification.returnedBy,
      verification.shippedBy,
    ]);
  });

  var currentDateFormat = moment().format('YYYY-MM-DD HH:mm:ss');
  return (
    <div className="DesktopVerifications">
      <div className="DesktopVerifications__inner">
        <div className="DesktopVerifications__title">
          {sessionStorage.getItem('userRole') === 'manager' ? (
            <i
              className="material-icons DesktopVerifications__arrow-back"
              onClick={handleBackToDashboard}
            >
              arrow_back
            </i>
          ) : null}
          <span className="DesktopVerifications__title--text">
            Verifications
          </span>
          <Button
            flat
            onClick={handleVerifyProduct}
            className="DesktopVerifications__verify-product-button"
          >
            VERIFY PRODUCT
          </Button>
          <Button
            flat
            className="DesktopVerifications__export-data-button"
            onClick={handleExportData}
            disabled={filterRequesting}
          >
            EXPORT DATA
          </Button>
          <form onSubmit={handleSearch}>
            <TextField
              id="search-query-with-icon-right"
              className="DesktopVerifications__search-query md-text-field-container"
              placeholder="Search Query"
              value={searchText}
              leftIcon={
                <i className="material-icons DesktopVerifications__search-icon">
                  search
                </i>
              }
              rightIcon={
                searchText !== '' ? (
                  <i
                    className="material-icons DesktopVerifications__search-cancel-icon"
                    onClick={clearSearchText}
                  >
                    cancel
                  </i>
                ) : null
              }
              fullWidth={false}
              onChange={value => handleFilterChange(value)}
            />
          </form>
          <SelectField
            id="select-field-default-value-menu"
            className="DesktopVerifications__status--select-field"
            label="Status"
            itemLabel="title"
            menuItems={STATUS}
            defaultValue={ALL_STATUS}
            value={selectedStatus}
            onChange={value => handleStatusChange(value)}
          />
          <SelectField
            id="select-field-default-value-menu"
            className="DesktopVerifications__requested--select-field"
            label="Requested"
            itemLabel="title"
            menuItems={REQUESTED_TIME}
            defaultValue={ALL_TIME}
            value={selectedRequestTime}
            onChange={value => handleRequestedChange(value)}
          />
          <ExportData
            handlePostExportData={handlePostExportData}
            isModalVisible={isModalVisible}
            data={exportData}
            fileName={`exportList_${currentDateFormat}.csv`}
            infoText={EXPORT_DATA_LIST_INSTRUCTION}
            modal="vrsList"
          />
          <PIVerificationModal
            isPIVerificationModalVisible={isPIVerificationModalVisible}
            verificationResult={verificationResult}
            handleVerify={handleVerify}
            deviceType={deviceType}
            expirationDateFormat={expirationDateFormat}
            transactionEventDateFormat={transactionEventDateFormat}
            handleChange={handleChange}
            isDescending={isDescending}
            handleVerificationDetails={handleVerificationDetails}
            handleNextProduct={handleNextProduct}
            handleCancel={handleCancel}
            productIdentifier={productIdentifier}
            piRequesting={piRequesting}
            disableOnSubmit={disableOnSubmit}
            modal='verifications'
            selectedRequestTime={selectedRequestTime}
          />
        </div>
      </div>
      {filterRequesting ? (
        <div className="DesktopVerifications__search-loader">
          <MDSpinner size={50} singleColor="#00b8d4" />
        </div>
      ) : (
          <Card className="DesktopVerifications__card">
            <DataTable className="DesktopVerifications__table" plain>
              <TableHeader>
                <TableRow className="DesktopVerifications__table--header">
                  {VERIFICATIONS_HEADER.map(header => (
                    <TableColumn
                      key={header}
                      className="DesktopVerifications__table--header-data"
                    >
                      {renderHeaderAndSortable(header, isDescending)}
                    </TableColumn>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageOfItems.length !== 0 ? (
                  pageOfItems.map((verification, index) => (
                    <TableRow
                      key={index}
                      className={`DesktopVerifications__table--row ${renderOnHoverClassName(
                        verification.status
                      )}`}
                      onClick={() => {
                        handleVerificationDetails(
                          verification.gtin,
                          verification.srn,
                          selectedRequestTime
                        );
                      }}
                    >
                      <TableColumn className="DesktopVerifications__table--column">
                        <font className="DesktopVerifications__sni">
                          {verification.gtin}
                          {verification.srn}
                        </font>
                      </TableColumn>
                      <TableColumn className="DesktopVerifications__table--column">
                        {renderStatusIcon(verification.status)}
                        <span className={renderClassName(verification.status)}>
                          <font className="DesktopVerifications__status">
                            {renderStatusText(verification.status)}
                          </font>
                        </span>
                      </TableColumn>
                      <TableColumn className="md-table-column--plain DesktopVerifications__table--column">
                        <font className="DesktopVerifications__requested">
                          {transactionEventDateFormat(
                            verification.requestSentTime
                          )}
                        </font>
                      </TableColumn>
                      <TableColumn className="DesktopVerifications__table--column">
                        <font className="DesktopVerifications__user">
                          {verification.firstName} {verification.lastName}
                        </font>
                      </TableColumn>
                      <TableColumn className="DesktopVerifications__table--column">
                        <font className="DesktopVerifications__returned-by">
                          {verification.returnedBy}
                        </font>
                      </TableColumn>
                      <TableColumn className="DesktopVerifications__table--column">
                        <font className="DesktopVerifications__shipped-by">
                          {verification.shippedBy}
                        </font>
                      </TableColumn>
                    </TableRow>
                  ))
                ) : (
                    <span className="DesktopVerifications__no-data-found">
                      No Verifications Data Found
                </span>
                  )}
              </TableBody>
            </DataTable>
            {/* {pageOfItems.map(item =>
              <div key={item.id}>{item.name}</div>
            )} */}
            {console.log("items in verification => "+JSON.stringify(items))}
            <Pagination 
            items={items} 
            onChangePage={onChangePage} 
            />
          </Card>
        )}
      <br />
    </div>
  );
};

Verifications.propTypes = {
  data: PropTypes.array,
  requesting: PropTypes.bool,
  piRequesting: PropTypes.bool,
  handleSort: PropTypes.func,
  isDescending: PropTypes.bool,
  handleVerificationDetails: PropTypes.func,
  handleVerifyProduct: PropTypes.func,
  handleNextProduct: PropTypes.func,
  handleNextCancel: PropTypes.func,
  verificationResult: PropTypes.array,
  handleVerify: PropTypes.func,
  handleChange: PropTypes.func,
  productIdentifier: PropTypes.string,
  handleCancel: PropTypes.func,
  isPIVerificationModalVisible: PropTypes.bool,
  disableOnSubmit: PropTypes.bool,
  expirationDateFormat: PropTypes.func,
  transactionEventDateFormat: PropTypes.func,
  deviceType: PropTypes.string,
  handleSearch: PropTypes.func,
  handleFilterChange: PropTypes.func,
  searchText: PropTypes.string,
  clearSearchText: PropTypes.func,
  selectedStatus: PropTypes.string,
  handleStatusChange: PropTypes.func,
  handleRequestedChange: PropTypes.func,
  selectedRequestTime: PropTypes.string,
  filterRequesting: PropTypes.bool,
  handleBackToDashboard: PropTypes.func,
  handleExportData: PropTypes.func,
  handlePostExportData: PropTypes.func,
  isModalVisible: PropTypes.bool,
};
export default Verifications;
