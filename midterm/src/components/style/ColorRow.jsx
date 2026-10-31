const ColorRow = ({ label, colors, value, onPick }) => (
  <div className="mb-3">
    <p className="mb-1 text-xs font-semibold">{label}</p>
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          aria-label={`${label} ${color}`}
          onClick={() => onPick(color)}
          style={{ backgroundColor: color }}
          className={`h-6 w-6 rounded-full border ${value === color ? 'ring-2 ring-blue-600' : ''}`}
        />
      ))}
    </div>
  </div>
)

export default ColorRow