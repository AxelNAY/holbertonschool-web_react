import React from "react";
import PropTypes from "prop-types";

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const rowStyle = {
    background: isHeader
      ? "color-mix(in srgb, var(--color-table-header) 66%, transparent)"
      : "color-mix(in srgb, var(--color-table-rows) 45%, transparent)",
  };

  if (isHeader) {
    if (textSecondCell === null || textSecondCell === undefined) {
      return (
        <tr style={rowStyle}>
          <th className="border border-gray-400 text-left" colSpan={2}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr style={rowStyle}>
        <th className="border border-gray-400 text-left">{textFirstCell}</th>
        <th className="border border-gray-400 text-left">{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
