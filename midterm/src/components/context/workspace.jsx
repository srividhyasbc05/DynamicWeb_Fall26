import { createContext, useState, useRef } from 'react'
import { widgetTypes } from '../data/widgetTypes' 
import {fetchWidgets as fetchWidgetsRequest,
    createWidget as createWidgetRequest,
    updateWidget as updateWidgetRequest,
    deleteWidget as deleteWidgetRequest} from '../shared/widgetsAPI'
import {fetchStyle as fetchStyleRequest, 
    updateStyle as updateStyleRequest} from '../shared/styleAPI'
import { useEffect } from 'react'
import { fetchTodos as fetchTodosRequest, deleteTodo as deleteTodoRequest } from '../list/todosAPI'
import { createTemplate as createTemplateRequest } from '../shared/templatesAPI'



const WorkspaceContext = createContext()
export default WorkspaceContext

const WorkspaceProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
  const load = async () => {
    try {
      const [loadedWidgets, loadedStyle] = await Promise.all([ fetchWidgetsRequest(), fetchStyleRequest() ])
      setWidgets(loadedWidgets)
      setStyleSettings(loadedStyle)
    } catch (err) {
      console.error(err)
      setError('Could not reach the server. Is `npm run server` running?')
    } finally {
      setIsLoading(false)
    }
  }
  load()
}, [])

  const [styleSettings, setStyleSettings] = useState({
    pageColor: '#f4efe8', pageOpacity: 1,
    widgetColor: '#ffffff', widgetOpacity: 1,
    textColor: '#292929',
    fontFamily: 'sans',
    headingSize: 'md', headingWeight: 'bold',
    bodySize: 'md', bodyWeight: 'normal',
  })
  const [widgets, setWidgets] = useState([])

  // move these four from App; rename handleTitleChange to renameWidget
  const saveTimer = useRef(null)

 const updateStyle = (key, value) => {
  const next = { ...styleSettings, [key]: value }
  setStyleSettings(next)                     // UI updates instantly
  clearTimeout(saveTimer.current)
  saveTimer.current = setTimeout(() => updateStyleRequest(next), 800)
}

const renameTimer = useRef(null)

const renameWidget = (widgetId, newTitle) => {
  setWidgets((previous) =>
    previous.map((w) => (w.id === widgetId ? { ...w, title: newTitle } : w))
  )
  clearTimeout(renameTimer.current)
  renameTimer.current = setTimeout(() => {
    updateWidgetRequest(widgetId, { title: newTitle }).catch((err) => console.error(err))
  }, 800)
}

// needed to mutate the widgets array when a new widget is added or removed, so we need to use the setWidgets function to update the state of the widgets array.
const addWidget = async (type) => {
  const newWidget = { id: `${type}-${crypto.randomUUID()}`, type, title: widgetTypes[type].defaultTitle, settings: {} }
  try {
    const saved = await createWidgetRequest(newWidget)
    setWidgets((previous) => [...previous, saved])
  } catch (err) { console.error('Error adding widget:', err) }
}


const deleteWidgetandContent = async (widget) => {
    if (widget.type === 'list') {
      const todos = await fetchTodosRequest(widget.id)          
      await Promise.all(todos.map((t) => deleteTodoRequest(t.id))) 
    }
    await deleteWidgetRequest(widget.id)
    setWidgets((previous) => previous.filter((w) => w.id !== widget.id))
  }

const removeWidget = async (widgetId) => {
  const widget = widgets.find((w) => w.id === widgetId)
  if (!widget) return
  try {
    await deleteWidgetandContent(widget)   // it already updates state at the end
  } catch (err) {
    console.error('Error removing widget:', err)
  }
}


const saveTemplate = async (name) => {
  const template = {
    name,
    widgets: widgets.map(({ type, title, settings }) => ({ type, title, settings })),
    style: styleSettings,   // Q2: which value, and does it matter that it may be mid-debounce?
  }
  await createTemplateRequest(template)
}

const applyTemplate = async (template) => {
  clearTimeout(saveTimer.current)     // Q3: why cancel these first?
  clearTimeout(renameTimer.current)

  await Promise.all(widgets.map(deleteWidgetandContent))

  const created = []
  for (const w of template.widgets) {
    const widget = { id: `${w.type}-${crypto.randomUUID()}`, ...w }
    created.push(await createWidgetRequest(widget))
  }
  await updateStyleRequest(template.style)

  setWidgets(created)
  setStyleSettings(template.style)
}

  const valuesToShare = {
    isLoading,
    error,
    widgets,
    styleSettings,
    updateStyle,
    renameWidget,
    addWidget,
    removeWidget,
    deleteWidgetandContent,
    saveTemplate,
    applyTemplate,
    isLoading,
    error,
  }


  return (
    <WorkspaceContext.Provider value={valuesToShare}>
      {children}
    </WorkspaceContext.Provider>
  )
}


export { WorkspaceProvider }