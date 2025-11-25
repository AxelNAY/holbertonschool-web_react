import PropTypes from 'prop-types';
import BodySection from './BodySection';

const BodySectionWithMarginBottom = ({ title, children }) => {
  return (
    <div className="mb-[40px]">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
