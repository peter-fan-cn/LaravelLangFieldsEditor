import { open } from '@tauri-apps/api/dialog'
import { readDir, readTextFile } from '@tauri-apps/api/fs'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {
  path: null,
  entities: []
}

// json files in lang path
// php file in lang/<code>/ path

export const pathSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setPath: (state, { payload: path }) => {
      state.path = path
    },
    setLanguageFiles (state, { payload: files }) {
      state.entities = files
    },
    loadJsonFiles(state, { payload: files }) {
      // json files in /lang path

      files.filter(file => _.endsWith(file.path, '.json'));


    }
  }
})

export const { setPath, setLanguageFiles } = pathSlice.actions

export const selectFolder = () => async dispatch => {
  const path = await open({
    directory: true
  })
  dispatch(setPath(path))
  const files = await readDir(path, { recursive: true })
  console.log(files)
  dispatch(setLanguageFiles( files ))
}

export const path = ({ root }) => root.path
export const entities = ({ root }) => root.entities

export default pathSlice.reducer
