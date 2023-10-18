import { open } from '@tauri-apps/api/dialog';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/button/Button';
import { path, entities,  selectFolder } from '../store/root';

export default function Dashboard () {
    const rootPath = useSelector(path);
    const fileEntities = useSelector(entities);
    const dispatch = useDispatch();

    const handlerSelect = ()=> dispatch(selectFolder())

    return (<div>
        <Button onClick={handlerSelect} className='btn-primary'>
            Select language path
        </Button>
        {rootPath}
        <ul>
        {fileEntities.map((entity, i)=><li key={i}>{entity}</li>)}
        </ul>
        Dashboard
    </div>)
}