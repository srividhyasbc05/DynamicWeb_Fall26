import { useState } from 'react';

const JournalWidget = () => {

  // Store the journal entry.
  const [entry, setEntry] = useState('');

  return (
    <section className="rounded-xl p-5 shadow-sm">

      <textarea
        value={entry}
        onChange={(event) => setEntry(event.target.value)}
        placeholder="Start writing..."
        rows={8}
        className="mt-4 w-full resize-y rounded-lg border border-white-200 p-3 leading-relaxed outline-none focus:border-blue-500"
      />
    </section>
  );
};

export default JournalWidget;