import WidgetRenderer from './WidgetRender'
// the ORDER of this array is the left-to-right order of the columns
const columnTypes = ['list', 'timer', 'text', 'journal']

const Layout = ({ widgets, styleSettings, onTitleChange, onRemove }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {columnTypes.map((type) => {
        const columnWidgets = widgets.filter((widget) => widget.type === type)

        return (
          <div key={type} className="flex min-w-0 flex-col gap-4 empty:hidden">
            {columnWidgets.map((widget) => (
              <WidgetRenderer
                key={widget.id}
                widget={widget}
                styleSettings={styleSettings}
                onTitleChange={onTitleChange}
                onRemove={onRemove}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Layout