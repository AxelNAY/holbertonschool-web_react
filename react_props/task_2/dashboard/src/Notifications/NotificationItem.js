export default function NotificationItem({ type = 'default', html, value }) {
  const style = { color: type === 'urgent' ? 'red' : 'blue' };
  if (value) {
    return (
      <li data-notification-type={type} style={style}>
        {value}
      </li>
    );
  }
  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={html}
      />
    );
  }
  return null;
}
