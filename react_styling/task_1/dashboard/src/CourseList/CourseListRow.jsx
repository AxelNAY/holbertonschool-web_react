export default function CourseListRow({ isHeader=false, textFirstCell="", textSecondCell=null }) {
  const bgColor = isHeader ? 'bg-[--color-table-header]' : 'bg-[--color-table-rows]';
  const opacity = isHeader ? 'opacity-66' : 'opacity-45';
  
  return (
    <tr className={`${bgColor} ${opacity}`}>
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
