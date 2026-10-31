import ColorRow from './ColorRow'
import OpacityRow from './OpacityRow'
import { colorOptions } from '../data/styleOptions'

const StyleMenu = ({ styleSettings, onChange }) => (
  <div className="mt-2 w-64 rounded bg-white p-4 text-gray-900 shadow">
    <ColorRow label="Widget color" colors={colorOptions.widget}
      value={styleSettings.widgetColor} onPick={(c) => onChange('widgetColor', c)} />
    <OpacityRow label="Widget opacity"
      value={styleSettings.widgetOpacity} onPick={(v) => onChange('widgetOpacity', v)} />


    <ColorRow label="Page color" colors={colorOptions.page}
        value={styleSettings.pageColor} onPick={(c) => onChange('pageColor', c)} />

    <ColorRow label="Text color" colors={colorOptions.text}
     value={styleSettings.textColor} onPick={(c) => onChange('textColor', c)} />
    
    {/* typeface, heading size + weight, body size + weight: ChoiceRow,
        options={Object.keys(fontFamilies)} / Object.keys(headingSizes) / Object.keys(weights) */}
  </div>
)

export default StyleMenu