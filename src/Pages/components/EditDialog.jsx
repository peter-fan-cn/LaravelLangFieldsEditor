import { useState, useRef, useEffect } from 'react'

export default ({ selectedRow, children, ...props }) => {
    const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const tableColumns = useSelector(columns)

  const initForm = () => {
    if (!selectedRow) return null
    return tableColumns
      .filter(field => field.code !== 'key')
      .map(field => (
        <div key={field.code}>
          <label>{field.label}</label>
          <InputTextarea
            value={selectedRow[field.code]}
            rows={2}
            className='w-full'
            onChange={event => onChange(field, event)}
          />
        </div>
      ))
  }

  const footerContent = (
    <div>
      <Button
        label='Cancel'
        icon='pi pi-times'
        onClick={() => setVisible(false)}
        className='p-button-text'
      />
      <Button
        label='Save'
        icon='pi pi-check'
        onClick={handleSaveContent}
        autoFocus
      />
    </div>
  )

  const onRowSelect = event => {
    setSelectedRow(event?.data)
    setVisible(true)
  }
  const onChange = (field, event) => {
    setSelectedRow({
      ...selectedRow,
      [field.code]: event.target.value
    })
  }

  const handleSaveContent = () => {
    // save changed selected row to file content
    const files = languageFiles.map(file => {
      const value = selectedRow[file.code]
      const key = selectedRow.key
      return {
        ...file,
        content: {
          ...file.content,
          [key]: value
        }
      }
    })
    dispatch(setLanguageFiles(files))
    dispatch(conventToTable())
    setVisible(false)
  }

  return (
    <Dialog
      header={'Edit'}
      visible={visible}
      style={{ width: '75vw' }}
      onHide={() => setVisible(false)}
      blockScroll={true}
      footer={footerContent}
    >
      <h4 className='font-bold mb-4'>Curent Message Key</h4>
      <p className='p-4 bg-gray-100 rounded'>{selectedRow?.key}</p>
      <div className='space-y-4 mt-4'>{initForm()}</div>
    </Dialog>
  )
}
