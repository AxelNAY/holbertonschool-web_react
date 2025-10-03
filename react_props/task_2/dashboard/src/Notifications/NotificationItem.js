function NotificationItem({ type = 'default', html, value }) {
  const style = type === 'urgent' ? { color: 'red' } : { color: 'blue' };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li data-notification-type={type} style={style}>
      {value}
    </li>
  );
}

export default NotificationItem;
export { NotificationItem };
