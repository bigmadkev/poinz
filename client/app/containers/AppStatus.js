import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import appConfig from '../services/appConfig';
import {formatDateTime, secondsToDaysHoursMinutes, timeAgo} from '../services/timeUtil';
import {fetchStatus} from '../actions';
import {StyledAppStatus, StyledRoomsList} from '../styled/AppStatus';

/**
 * Our "operations" view. Displays application status (which is fetched from the backend via REST).
 * How many rooms, how many users.
 * Does not display room names, since this page is publicly accessible.
 */
class AppStatus extends React.Component {
  componentDidMount() {
    const {fetchStatus, appStatus} = this.props;

    if (!appStatus) {
      fetchStatus();
    }
  }

  render() {
    const {fetchStatus, appStatus} = this.props;
    if (!appStatus) {
      // this is an operations UI, it's ok to display an empty page during data loading...
      return null;
    }

    const uptime = secondsToDaysHoursMinutes(appStatus.uptime);

    const sortedActiveRooms = appStatus.rooms
      .filter((room) => room.userCount > room.userCountDisconnected)
      .sort(roomComparator);

    const sortedInActiveRooms = appStatus.rooms
      .filter((room) => room.userCount <= room.userCountDisconnected)
      .sort(roomComparator);

    return (
      <StyledAppStatus>
        <div className="top-bar">
          <div className="left-logo-container">
            <div className="poinz-logo">PoinZ</div>
          </div>
        </div>

        <button className="pure-button pure-button-primary" onClick={fetchStatus}>
          <i className="fa fa-refresh"></i>
        </button>

        <h4>PoinZ Application Status</h4>

        <p>
          Version: {appConfig.version} {formatDateTime(appConfig.buildTime)}
        </p>
        <p>Uptime: {uptime}</p>
        <p>Total rooms: {appStatus.roomCount}</p>

        <h5>Active Rooms</h5>

        <StyledRoomsList>
          <TableHeaders />
          {sortedActiveRooms.map((room, index) => (
            <RoomItem key={index} index={index} room={room} />
          ))}
        </StyledRoomsList>

        <h5>Inactive Rooms</h5>
        <StyledRoomsList>
          <TableHeaders />
          {sortedInActiveRooms.map((room, index) => (
            <RoomItem key={index} room={room} />
          ))}
        </StyledRoomsList>
      </StyledAppStatus>
    );
  }
}

AppStatus.propTypes = {
  fetchStatus: PropTypes.func,
  appStatus: PropTypes.object
};

function roomComparator(rA, rB) {
  const roomOneTimestamp = rA.lastActivity;
  const roomTwoTimestamp = rB.lastActivity;
  return roomOneTimestamp < roomTwoTimestamp ? 1 : roomTwoTimestamp < roomOneTimestamp ? -1 : 0;
}

export default connect(
  (state) => ({
    appStatus: state.appStatus
  }),
  {fetchStatus}
)(AppStatus);

const TableHeaders = () => (
  <li className="headers">
    <div>Active users</div>
    <div>Disconnected users</div>
    <div>Stories</div>
    <div>Created</div>
    <div>Last Activity</div>
    <div>Marked for deletion</div>
  </li>
);

const RoomItem = ({room}) => (
  <li>
    <div>
      {room.userCount - room.userCountDisconnected} / {room.userCount}
    </div>
    <div>
      {room.userCountDisconnected} / {room.userCount}
    </div>
    <div>{room.storyCount}</div>
    <div title={formatDateTime(room.created)}>{timeAgo(room.created)}</div>
    <div title={formatDateTime(room.lastActivity)}>{timeAgo(room.lastActivity)}</div>
    <div>{room.markedForDeletion && <i className="fa fa-circle-o"></i>}</div>
  </li>
);

RoomItem.propTypes = {
  room: PropTypes.object
};
