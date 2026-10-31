const OpacityRow = ({ label, value, onPick }) => (
  <label className="mb-3 block text-xs font-semibold">
    {label}
    <input type="range" min="0.2" max="1" step="0.05" value={value}
      onChange={(e) => onPick(Number(e.target.value))} className="block w-full" />
  </label>
)

export default OpacityRow