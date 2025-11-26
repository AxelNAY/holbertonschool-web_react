import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png';

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    const lengthChanged =
      (this.props.notifications?.length || 0) !==
      (nextProps.notifications?.length || 0);
    const drawerChanged = this.props.displayDrawer !== nextProps.displayDrawer;
    return lengthChanged || drawerChanged;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  handleCloseClick = () => {
    console.log('Close button has been clicked');
    this.props.handleHideDrawer?.();
  };

  render() {
    const {
      displayDrawer,
      handleDisplayDrawer,
      notifications = [],
    } = this.props;

    if (!displayDrawer) {
      return (
        <div
          className="menuItem notification-title px-3 py-2 cursor-pointer select-none"
          onClick={() => handleDisplayDrawer?.()}
          data-testid="menu-item"
          role="button"
          tabIndex={0}
          aria-label="Open notifications"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleDisplayDrawer?.();
          }}
        >
          Your notifications
        </div>
      );
    }

    const hasItems = (notifications?.length || 0) > 0;

    return (
      <div
        className={[
          'Notifications notification-drawer',
          'fixed top-0 right-0 w-[380px] max-w-full bg-white border-l-2 border-b-2 shadow p-4',
        ].join(' ')}
        role="region"
        aria-label="Notifications"
        style={{ borderColor: 'var(--main-color)' }}
      >
        <div className="notification-title font-bold px-1 pb-2 border-b">
          Your notifications
        </div>

        <div className="notification-items pt-3">
          {hasItems ? (
            <>
              <p>Here is the list of notifications</p>
              <ul className="list-disc ml-5">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    data-notification-type={n.type}
                    className="py-1 cursor-pointer"
                    onClick={() => this.markAsRead(n.id)}
                  >
                    {n.value ?? <span dangerouslySetInnerHTML={n.html} />}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No new notification for now</p>
          )}
        </div>

        {hasItems && (
          <button
            aria-label="Close"
            title="Close"
            onClick={this.handleCloseClick}
            data-testid="close-btn"
            className="absolute top-2 right-2 h-8 w-8 rounded hover:bg-gray-100 p-0 grid place-items-center"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        )}
      </div>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      type: PropTypes.oneOf(['default', 'urgent']),
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
};

export default Notifications;
