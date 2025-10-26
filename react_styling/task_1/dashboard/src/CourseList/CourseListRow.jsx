import React from "react";

export default function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  const rowBg = isHeader
    ? "bg-[var(--color-table-header-66)]"
    : "bg-[var(--color-table-rows-45)]";

  const thBase = "border border-gray-400 px-2 py-2 font-bold text-center";
  const tdBase = "border border-gray-400 text-left pl-2 py-2";

  return (
    <tr className={rowBg}>
      {isHeader ? (
        textSecondCell === null ? (
          <th className={thBase} colSpan="2">{textFirstCell}</th>
        ) : (
          <>
            <th className={thBase} style={{ width: "70%" }}>{textFirstCell}</th>
            <th className={thBase}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={tdBase}>{textFirstCell}</td>
          <td className={tdBase}>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}
