import './Notifications.css'
import { getLatestNotification } from './utils.js'
import Close from './assets/close-button.png'

function Notifications() {
  return (
    <div class="notification-items">
      <p>Here is the list of notifications</p>
      <button aria-label="Close"><img src={Close}/></button>
      <ul>
        <li data-priority>New course available</li>
        <li data-priority>New resume available</li>
        <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  )
}

export default Notifications
