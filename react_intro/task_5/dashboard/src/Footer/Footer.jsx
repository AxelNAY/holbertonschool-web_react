import './Footer.css'
import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

function Footer() {
  return (
    <div class="Footer">
      <p>Copyright { getCurrentYear() } - { getFooterCopy(true) }</p>
    </div>
  )
}

export default Footer
