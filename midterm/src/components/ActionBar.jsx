import { useState } from 'react'
import {widgetTypes} from './data/widgetTypes'
import StyleMenu from './style/StyleMenu'
import useWorkspaceContext from './context/use-workspace-context'
import TemplatePanel from './TemplatePanel'


const ActionBar = () => {
    const { addWidget, updateStyle, styleSettings } = useWorkspaceContext()
    const [openPanel, setOpenPanel] = useState(null)
    // only one panel can be open at a time

    const togglePanel = (name) => setOpenPanel(openPanel === name ? null : name)

    return (
    <div className="fixed right-4 top-4 z-10">
      <div className="flex gap-3 rounded-full bg-white px-4 py-2 shadow">
        <button type="button" className = "hover: cursor-pointer" aria-label="Add widget" onClick={() => togglePanel('add')}>+</button>
        <button type="button" className = "hover: cursor-pointer"aria-label="Style settings" onClick={() => togglePanel('style')}>⚙</button>
        <button type="button" className = "hover: cursor-pointer"aria-label="Info and templates" onClick={() => togglePanel('templates')}>i</button>
      </div>

      {openPanel === 'add' && (
        <ul className="mt-2 rounded bg-white p-2 shadow">
          {Object.entries(widgetTypes).map(([type, { label }]) => (
            <li key={type}>
              <button
                type="button"
                onClick={() => { addWidget(type); setOpenPanel(null) }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )
      }
      {openPanel === 'style' && 
      <StyleMenu styleSettings={styleSettings} 
      onChange={updateStyle} />}
      
      {openPanel === 'templates' && <TemplatePanel />}


    </div>

  )
}

export default ActionBar