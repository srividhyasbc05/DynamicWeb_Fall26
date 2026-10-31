import Layout from './components/Layout'
import ActionBar from './components/ActionBar'
import { toRgba } from './components/data/styleOptions'
import useWorkspaceContext from './components/context/use-workspace-context'

const App = () => {
  const { widgets, styleSettings, addWidget, updateStyle, removeWidget, renameWidget, isLoading, error } = useWorkspaceContext()
  if (isLoading) {
    return <p className="p-8">Loading your workspace…</p>
  }

  if (error) {
    return <p className="p-8" role="alert">{error}</p>
  }

// useState is used to store the widgets because we want to be able to update the widgets when the user changes the title of a widget. 
// We need to store the widgets in state so that we can update them and re-render the App component when the title of a widget changes.

  return (
    <div className="min-h-screen p-8 pt-20" style={{ backgroundColor: toRgba(styleSettings.pageColor, styleSettings.pageOpacity) }}>
      <ActionBar
        onAddWidget={addWidget}
        onStyleChange={updateStyle}
        styleSettings={styleSettings}
      />
     <Layout
        widgets={widgets}
        styleSettings={styleSettings}
        onTitleChange={renameWidget}
        onRemove={removeWidget}
      />

    </div>
  )
}

export default App