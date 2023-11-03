import { useSelector, useDispatch } from 'react-redux'
import { langPath, columns, records } from '../store/root'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState, useRef, useEffect } from 'react'
import { useResizeListener } from 'primereact/hooks'

export default function Dashboard () {
  const rootPath = useSelector(langPath)
  const [selectedRow, setSelectedRow] = useState(null)
  const onRowSelect = event => {
    setSelectedRow(event.data)
  }
  const [tableHeight, setTableHeight] = useState(460)
  const container = useRef(null)
  const table = useRef(null)

  const [bindResized, unBindResized] = useResizeListener({
    listener: e => {
      setTableHeight(container.current.clientHeight)
      table.current.resetScroll()
    }
  })

  useEffect(() => {
    bindResized()
    return () => {
      unBindResized()
    }
  }, [bindResized, unBindResized])

  return (
    <div className='h-full'>
      {rootPath ? <div className='p-4'>Current Path {rootPath} </div> : null}
      <div className='h-[calc(100%-56px)] overflow-auto' ref={container}>
        <DataTable
          value={useSelector(records)}
          scrollHeight={`${tableHeight}px`}
          virtualScrollerOptions={{ itemSize: 46 }}
          scrollable
          resizableColumns
          onRowSelect={onRowSelect}
          selectionMode='single'
          selection={selectedRow}
          tableStyle={{ minWidth: '50rem' }}
          ref={table}
        >
          {useSelector(columns).map((col, i) => (
            <Column
              key={i}
              field={col.code}
              header={col.label}
              sortable
              footer={col.label}
              style={{ minWidth: '200px' }}
            />
          ))}
        </DataTable>
      </div>
    </div>
  )
}
