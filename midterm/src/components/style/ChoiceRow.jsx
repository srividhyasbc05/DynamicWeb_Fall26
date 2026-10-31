
const ChoiceRow = ({ label, options, value, onPick }) => (
  <label className="mb-3 block text-xs font-semibold">
    {label}
    <select value={value} onChange={(e) => onPick(e.target.value)}
      className="mt-1 block w-full rounded border p-1 font-normal">
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
)

export default ChoiceRow