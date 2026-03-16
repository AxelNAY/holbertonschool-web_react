import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from '../NotificationItem/NotificationItem.jsx';

class Notifications extends PureComponent {
  static defaultProps = {
    displayDrawer: false,
    notifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
  };

  static propTypes = {
    displayDrawer: PropTypes.bool,
    notifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        type: PropTypes.oneOf(['default', 'urgent']),
        value: PropTypes.string,
        html: PropTypes.shape({ __html: PropTypes.string }),
      })
    ),
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
  };

  render() {
    const {
      displayDrawer,
      notifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;

    const shouldBounce = notifications.length > 0 && !displayDrawer;

    if (!displayDrawer) {
      return (
        <div
          className={[
            'notification-title px-3 py-2 cursor-pointer',
            shouldBounce ? 'animate-bounce' : '',
          ].join(' ').trim()}
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
      );
    }

    const hasItems = notifications.length > 0;

    return (
      <div
        className={[
          'Notifications notification-drawer',
          'fixed top-0 right-0 w-[380px] max-w-full bg-white border-l-2 border-b-2 shadow',
          'max-[912px]:inset-0 max-[912px]:w-screen max-[912px]:h-screen max-[912px]:border-0',
          'max-[912px]:p-4 max-[912px]:overflow-y-auto',
        ].join(' ')}
        role="region"
        aria-label="Notifications"
        style={{ borderColor: 'var(--main-color)' }}
      >
        <div className="notification-title font-bold px-4 py-3 border-b max-[912px]:px-2">
          Your notifications
        </div>

        <div className="notification-items p-4 max-[912px]:p-2">
          {hasItems ? (
            <>
              <p className="mb-3">Here is the list of notifications</p>
              <ul className="ml-5 list-disc max-[912px]:list-none max-[912px]:ml-0">
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id ?? `${n.type}-${n.value ?? 'html'}`}
                    id={n.id}
                    type={n.type}
                    value={n.value}
                    html={n.html}
                    markAsRead={markNotificationAsRead}
                  />
                ))}
              </ul>
              <button
                aria-label="Close"
                title="Close"
                onClick={() => {
                  console.log('Close button has been clicked');
                  handleHideDrawer();
                }}
                className="absolute top-2 right-2 h-8 w-8 rounded hover:bg-gray-100"
              >
                ✕
              </button>
            </>
          ) : (
            <p>No new notification for now</p>
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;
