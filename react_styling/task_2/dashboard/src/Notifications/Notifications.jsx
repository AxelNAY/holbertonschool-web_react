import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
        html: PropTypes.shape({ __html: PropTypes.string }),
      })
    ),
    displayDrawer: PropTypes.bool,
  };

  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications, displayDrawer } = this.props;

    const Title = (
      <div
        className="notification-title fixed top-2 right-3 z-[1000]"
        data-testid="notifications-title"
      >
        <p className="m-0 p-0 text-sm font-medium">Your notifications</p>
      </div>
    );

    const Drawer = displayDrawer ? (
      <div
        className="notifications fixed top-10 right-3 z-[999] w-[360px] max-w-[calc(100%-24px)] rounded-none bg-white box-border p-4 pb-3 border-2 border-dashed"
        style={{ borderColor: 'var(--main-color)' }}
      >

        <div className="notification-items">
          {notifications.length > 0 ? (
            <>
              <p className="m-0 mb-3">Here is the list of notifications</p>

              <button
                onClick={() => console.log('Close button has been clicked')}
                aria-label="Close"
                className="notifications-close absolute top-2 right-2 p-1 bg-transparent border-0 cursor-pointer"
                type="button"
              >
                <img src={closebtn} alt="Close" className="block w-3 h-3" />
              </button>

              <ul className="list-disc list-outside pl-4 m-0">
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    id={n.id}
                    type={n.type}
                    value={n.value}
                    html={n.html}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className="notifications-empty m-0">No new notification for now</p>
          )}
        </div>
      </div>
    ) : null;

    return (
      <>
        {Title}
        {Drawer}
      </>
    );
  }
}
