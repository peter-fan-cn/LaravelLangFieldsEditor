import { Menubar } from 'primereact/menubar'
import { getCurrent } from '@tauri-apps/api/window'
import logo from '../../assets/logo.svg'
import {  useDispatch } from 'react-redux';
import {  saveFiles, selectFolder } from '../../store/root';


export default function MainMenu () {
    const dispatch = useDispatch();
    const items = [
          {
            label: 'Open',
            icon: 'pi pi-fw pi-folder-open',
            command:()=>{
              dispatch(selectFolder())
            }
          },
          {
            label: 'Add',
            icon: 'pi pi-fw pi-plus',
          
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          
          },
          {
            label: 'Save',
            icon: 'pi pi-fw pi-save',
            command:()=>{
              dispatch(saveFiles())
            }
          },
          {
            label: 'Close',
            icon: 'pi pi-fw pi-power-off',
            command:()=>{
              getCurrent().close()
            }
          }
    ]
    const start = <img src={logo} height="40" className="mr-2 w-10 h-10"/>
    return <Menubar model={items} start={start}/>
  }
  