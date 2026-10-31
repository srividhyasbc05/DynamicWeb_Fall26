// widgetRenderer will decide which component to render based on the widget type.
// there will be a list of widgets
// using the list of widgets the renderer will look at the type to inject the correct component into shell and send it to App

import ListWidget from './widgets/ListWidget'
import JournalWidget from './widgets/JournalWidget'
import TimerWidget from './widgets/TimerWidget'
import TextWidget from './widgets/TextWidget'
import WidgetShell from './WidgetShell'

const WidgetRenderer = ({ widget }) => {
  let content

  switch (widget.type) {
    case 'list':
      content = <ListWidget listId={widget.id} />
      break
    case 'timer':
      content = <TimerWidget />
      break
    case 'text':
      content = <TextWidget />
      break
    case 'journal':
      content = <JournalWidget />
      break
    default:
      content = <p>Unknown widget type: {widget.type}</p>
  }

  return (
    <WidgetShell
    id={widget.id}
      title={widget.title}
    >
      {content}
    </WidgetShell>
  )
}
  export default WidgetRenderer