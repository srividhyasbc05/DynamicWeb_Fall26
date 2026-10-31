import { useState } from 'react';
//import EditableTitle from '../shared/EditableTitle';

const TextWidget = () => {
  // Store the widget's title.
  //but we'll use the WidgetShell to handle the title.
  //const [title, setTitle] = useState('Intention');

  // Store the text the user writes.
  const [text, setText] = useState('What do I want to accomplish today?');

  const handleChange = (event) => {
    setText(event.target.value);
  }
  return (
    <section className="rounded-xl p-5 shadow-sm">
      {/* Reuse the editable title component. */}
      {/* <EditableTitle value={title} onChange={setTitle} /> */}

      {/* Every keystroke updates the text state. */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Write something..."
        rows={4}
        className="mt-4 w-full resize-y rounded-lg border border-white-200 p-3 outline-none focus:border-blue-500"
      />
    </section>
  );
};

export default TextWidget;