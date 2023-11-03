import { open } from '@tauri-apps/api/dialog'
import { readDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {
  langPath: null,
  entities: [],
  records: [],
  columns: []
}

// json files in lang path
// php file in lang/<code>/ path

export const pathSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setPath: (state, { payload }) => {
      state.langPath = payload
    },
    setLanguageFiles (state, { payload: files }) {
      state.entities = files
    },
    loadJsonFiles (state, { payload: files }) {
      // json files in /lang path

      files.filter(file => _.endsWith(file.path, '.json'))
    },
    conventToTable (state) {
      const { entities } = state
      const data = {}
      const columns = [{code:'key', label:'Message Key',}]
      entities.forEach(({code, language, content, name, path}) => {
        columns.push({code, label: language, name, path})
        if (content) {
          for (const key in content) {
            if (Object.hasOwnProperty.call(content, key)) {
              const message = content[key]
              data[key] = {key, [code]: message, ...data[key] }
            }
          }
        }
      })
      state.columns = [...columns]
      state.records = Object.values(data)
    },
  }
})

export const { setPath, setLanguageFiles, conventToTable } = pathSlice.actions
const languageNames = new Intl.DisplayNames([window.navigator.language, 'en'], {
  type: 'language'
})

export const selectFolder = () => async dispatch => {
  const languageFolder = await open({ directory: true })
  if (!languageFolder) return
  dispatch(setPath(languageFolder))
  const files = await readDir(languageFolder, { recursive: true })
  const languageFiles = files.filter(
    file =>
      file.name.endsWith('.json') &&
      !file.children &&
      !file.name.startsWith('php_')
  )

  for (let i = 0; i < languageFiles.length; i++) {
    const file = languageFiles[i]
    const code = file.name.replace('_', '-').replace('.json', '')
    file.code = code
    file.language = languageNames.of(code)
    const content = await readTextFile(file.path)
    file.content = JSON.parse(content)
  }
  /*
  files
    .filter(file => !!file.children)
    .forEach(file => {
      console.log(file)
      file.children.forEach(child => {
        const code = file.name.replace('_','-')
        languageFiles.push({
          path: child.path,
          code: code,
          language: languageNames.of(code),
          name: child.name
        })
      })
    })
    */
  dispatch(setLanguageFiles(languageFiles))
  dispatch(conventToTable())
}

export const saveFiles = () => async (dispatch, getState) => {
  const {entities} = getState().root
  for (let i = 0; i < entities.length; i++) {
    const file = entities[i];
    const content = file.content
    await writeTextFile(file.path, JSON.stringify(content, null, 4))
  }
}

export const langPath = ({ root }) => root.langPath
export const entities = ({ root }) => root.entities

export const records = ({ root }) => root.records
export const columns = ({ root }) => root.columns

export default pathSlice.reducer
