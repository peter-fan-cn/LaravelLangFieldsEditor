import classnames from 'classnames'
import './Table.css'

export function TableHead ({ columns, classes }) {
  return (
    <thead className={classnames(classes)}>
      <tr>
        {columns.map(column => (
          <Column classes={column.headClasses}>{column.title}</Column>
        ))}
      </tr>
    </thead>
  )
}
export function Column ({ children, classes }) {
  return (
    <th scope='col' className={classnames(classes)}>
      {children}
    </th>
  )
}
export function TableBody ({ columns, data, className, rowClasses }) {
  return (
    <tbody className={className}>
      {data.map(row => (
        <Row columns={columns} row={row} classes={rowClasses} />
      ))}
    </tbody>
  )
}
export function Row ({ columns, row, classes }) {
  return (
    <tr className={classnames(classes)}>
      {columns.map(column => (
        <Cel column={column} classes={column.cellClasses}>
          {column.render
            ? column.render(row[column.data], row)
            : row[column.data]}
        </Cel>
      ))}
    </tr>
  )
}

export function Cel ({ children, classes }) {
  return <td className={classnames( classes)}>{children}</td>
}

export default function Table ({
  columns = [],
  data = [],
  className,
  rowClasses,
  headClasses,
  bodyClasses
}) {
  return (
    <table className={classnames(['table', className])}>
      <TableHead columns={columns} classes={headClasses} />
      <TableBody
        columns={columns}
        data={data}
        className={bodyClasses}
        rowClasses={rowClasses}
      />
    </table>
  )
}
