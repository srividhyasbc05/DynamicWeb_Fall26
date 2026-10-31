import useWorkspaceContext from './context/use-workspace-context';
import { useEffect, useState } from 'react';
import { fetchTemplates } from './shared/templatesAPI';

// TemplatesPanel.jsx
const TemplatesPanel = () => {
  const { saveTemplate, applyTemplate } = useWorkspaceContext()
  const [templates, setTemplates] = useState([])   // local: only this panel needs it
  const [name, setName] = useState('')             // local: form draft

  const load = async () => setTemplates(await fetchTemplates())
  useEffect(() => { load() }, [])                  // runs each time the panel opens. Q6: why?

  const handleSave = async () => {
    await saveTemplate(name)
    setName('')
    await load()
  }
  // render: input + "Save current layout" button,
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Templates</h2>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template name"
          className="border border-gray-300 rounded px-3 py-2 mr-2"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save current layout
        </button>
      </div>
      <div>
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 mb-2"
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplatesPanel;