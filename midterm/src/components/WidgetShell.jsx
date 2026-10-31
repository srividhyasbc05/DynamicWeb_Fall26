// Widget Shell handles what all widgets have in common.
// it will be resposible for the title, styling, and the delete button.

import EditableTitle from './shared/EditableTitle'
import {toRgba} from './data/styleOptions'
import useWorkspaceContext from './context/use-workspace-context'

const WidgetShell = ({id, title, children}) => {
      const { styleSettings, renameWidget, removeWidget } = useWorkspaceContext()

  return (
    <section
      style={{
        backgroundColor: toRgba(styleSettings.widgetColor, styleSettings.widgetOpacity),
        color: styleSettings.textColor,
        borderRadius: '0.5rem',
      }}
      className="min-w-0 p-5 shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-2">
        <EditableTitle value={title} onChange={(newTitle) => renameWidget(id, newTitle)} />
        <button type="button" className="shrink-0 cursor-pointer" aria-label={`Remove ${title}`} onClick={() => removeWidget(id)}>×</button>
      </div>

      {/* shell doesn't know what the children are, but it will render them here */}
      {/* the renderer has to pass the children to the shell, and the shell will render them */}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default WidgetShell