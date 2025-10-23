export default function CourseListRow({ isHeader=false, textFirstCell="", textSecondCell=null }) {
  const headerStyle = {
    backgroundColor: 'var(--color-table-header)',
    opacity: '0.66'
  };
  
  const rowStyle = {
    backgroundColor: 'var(--color-table-rows)',
    opacity: '0.45'
  };
  
  const rowStyles = isHeader ? headerStyle : rowStyle;
  
  return (
    <tr style={rowStyles}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan="2" className="border border-gray-400">{textFirstCell}</th>
        ) : (
          <>
            <th style={{ width: '70%'}} className="border border-gray-400">{textFirstCell}</th>
            <th className="border border-gray-400">{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className="border border-gray-400 pl-2">{textFirstCell}</td>
          <td className="border border-gray-400 pl-2">{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}
