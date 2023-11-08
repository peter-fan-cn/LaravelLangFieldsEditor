import { useSelector, useDispatch } from 'react-redux'
import { langPath, columns, records, entities, setLanguageFiles, conventToTable } from '../store/root'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState, useRef, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { FilterMatchMode, FilterOperator } from 'primereact/api';

export default function Dashboard () {
  const dispatch = useDispatch();
  const rootPath = useSelector(langPath)
  const languageFiles = useSelector(entities)
  const [selectedRow, setSelectedRow] = useState(null)
  const container = useRef(null)
  const table = useRef(null)
  const [visible, setVisible] = useState(false)
  const tableColumns = useSelector(columns)
  const tableRecords = useSelector(records)

  const onRowSelect = event => {
    setSelectedRow(event?.data)
    setVisible(true)
  }
  const onChange = (field, event) => {
    setSelectedRow({
      ...selectedRow,
      [field.code]:event.target.value,
    })
  }
  
  const handleSaveContent = ()=>{
    // save changed selected row to file content
    const files = languageFiles.map(file => {
      const value = selectedRow[file.code]
      const key = selectedRow.key
      return {
        ...file,
        content : {
          ...file.content,
          [key]: value
        }
      }
    });
    dispatch(setLanguageFiles(files))
    dispatch(conventToTable())
    setVisible(false)
  }

  const initForm = () => {
    if (!selectedRow) return null
    return tableColumns.filter(field=>field.code !== 'key').map(field=><div key={field.code}>
      <label>{field.label}</label>
      <InputTextarea value={selectedRow[field.code]} rows={2} className='w-full' onChange={event=>onChange(field, event)}/>
    </div>)
  }

  const footerContent = (
    <div>
        <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button label="Save" icon="pi pi-check" onClick={handleSaveContent} autoFocus />
    </div>
);

const [filters, setFilters] = useState(null);
const [globalFilterValue, setGlobalFilterValue] = useState('');
const clearFilter = () => {
  initFilters();
};
useEffect(() => {
  initFilters();
}, []);
const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const initFilters = () => {
  setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      key: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    
  });
  setGlobalFilterValue('');
};
const renderHeader = () => {
  return (
      <div className="flex justify-between w-full">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
      </div>
  );
};

const searchFilterTemplate = (options) => {
  return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
};
  return (
    <div className='h-full'>
      {rootPath ? <div className='p-4'>Current Path {rootPath} </div> : null}
      <div className='h-[calc(100%-56px)] overflow-auto' ref={container}>
        <DataTable
          value={tableRecords}
          virtualScrollerOptions={{ itemSize: 46 }}
          scrollable
          scrollHeight={`flex`}
          showGridlines
          onRowClick={onRowSelect}
          selectionMode='single'
          selection={selectedRow}
          tableStyle={{ minWidth: '50rem' }}
          globalFilterFields={['key']}
          header={renderHeader()}
          filters={filters}
          ref={table}
        >
          {tableColumns.map((col, i) => (
            <Column
              key={i}
              field={col.code}
              header={col.label}
              sortable
              footer={col.label}
              style={{ minWidth: '200px' }}
              className='truncate'
            />
          ))}
        </DataTable>
      </div>
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
        <div className='space-y-4 mt-4'>
          {initForm()}
        </div>
      </Dialog>
    </div>
  )
}
