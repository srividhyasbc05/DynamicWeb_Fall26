# My StudySpace: a customizable study workspace

## What it is for
This is an app for users who need to reduce distractions during their study sessions through this adaptable workspace that can be configured to their unique needs for that session. The user can build their page using different preconfigured widgets and style them according to their preferences from a limited palette of options mainly using blues and greens to promote calm and reduce the distracyion of customizing the space before working. The then can use and save their layouts to fit their specific session whether it is completing a reading or studying for a test!

## Who would use it
Any student whose workspace needs change by the subject or task. Ideal for people who are visual learners and prefer and visually organized way to keep track of all of their tasks and for people juggling multiple types of classes (i.e. design vs humanities vs prgramming)

## User Story
As a student whose study needs and preferred environments vary depending on the subject or task, I want to customize my digital study space with the tools and visual atmosphere that work best for me, so that I can create a focused environment without switching between multiple apps.

## How to run it

Create 2 terminals, one to run npm run server, one to run npm run dev

```bash
npm install          # first time only
npm run server       # json-server on http://localhost:3000
npm run dev          # Vite dev server
```
## Props or Context, and why
I took from the class in using context in order to get practice for what I would use it for mainly, which was Workspace-level state. This included the widgets array, style settings, rename/add/remove, templates. and I migrated them to their own context because I was passing them from App down to Widget Shell which followed App -> Layout -> WidgetRender -> WidgetShell, which was prop drilling and made it difficult to trace calls especially when it came to implementing global style settings. State that only one component cares about stays local: the filter choice, the editing toggle, form drafts, and the templates list shown in the panel.Derived values (filtered list, remaining count) are computed while rendering and never stored. I followed the pattern in class to create API calls that would then talk to context and set state, except for test inputs which use delays so that it doesn't fire on every keystroke and doesn't always need a submit button to update

## Revised checklist (what it actually took)
I decided to rebuild the classwork so I started from the todos we did in class before context and then migrated it to useContext to understand how that worked. This project required me to get a lot more comfortable with my database and deciding how that order worked. The way I wanted my widgets to just be populate from. user selection requred em to do a lot more than just a selector, it required me to build a pipeline demonstrated in the heriarchy from widgetShell -> WidgetRenderer-> Layout and then it shows up in app. While I was doing that I noticed a pattern that led me to need to define context. 
Most of the time went to state and persistence, not visuals. I then applied the same pattern to the whole workspace. The server also assigns its own ids to new records, so the provider uses the record that comes back from each save instead of the id it generated. Deleting a widget had to clean up its tasks as well, which took extra requests. Because of all this, the styling work I had planned (layered gradients, textures, and transitions) got the least time.

 Task CRUD against json-server: add, edit, delete, plus a done checkbox
 All / Active / Done filter, computed while rendering, plus a “things left” count
 Loading, error, and empty states for each list
 A todos Provider per list (keyed by listId), a custom hook, and a separate todosAPI.js
 Multiple lists with separate tasks
 (verify) done and edits survive a refresh, and dueTime exists in your code. I never saw dueTime anywhere, so don’t claim it unless it’s built

Other widgets

 Timer: hours/minutes/seconds, play, pause, restart, inputs disabled while running, auto-stop at zero, interval cleanup
 Text widget and journal widget (editable, local state only)
 Controlled EditableTitle reused by every widget

Workspace architecture

 WidgetShell (title, remove button, colors), WidgetRender (type to component), Layout (four columns by type, 1 / 2 / 4 columns responsive)
 widgetTypes.js config and widgets as data: { id, type, title, settings }
 Floating action bar with three panels: add widget, style, templates
 Add and rename widgets, multiple instances of the same type
 (verify) Remove widget. It was broken until the removeWidget(id) fix, so retest it and check that the list’s tasks are gone from db.json

Customization

 Style object, option tables, and toRgba so opacity affects only backgrounds
 Page color and opacity, widget color and opacity
 (verify) Text color row
 Style settings autosave to json-server (debounced)

Templates

 Save the current layout and style under a name (no ids, no content), and reload it
 A starter template (Deep Work) plus user-saved templates
 Apply a template, with the existing widgets replaced

State and persistence

 WorkspaceProvider: widgets, style, templates, with loading and error states at the app level
 API files for widgets, style, templates, todos, and content
 Widgets, style, templates, and todos persist through json-server
 Migration from props to context, removing the drilling through Layout and WidgetRender
 Debounced saves, so titles and sliders don’t send a request per keystroke
 Using the server’s returned record for ids, since the server assigns them
 A README draft with scope decisions and trade-offs

## The GAP
## Gap between my original developer checklist and what I built

### A. Workspace and widgets
- **Responsive grid with different widget sizes**: Changed. Widgets sit in fixed columns by type (list, timer, text, journal), with no sizes. This is simpler and more predictable, and it collapses to one column on mobile.
- **Add and remove widgets**: Done.
- **Multiple instances of the same widget type**: Done.
- **Editable widget titles**: Done, and saved to json-server.
- **Default sizes and configurations per widget type**: Partial. Each type has a default title, but no default size.
- **Timer (start, pause, reset, editable duration, remaining time)**: Done.
- **List (add, edit, complete, delete, editable title, persisted task field)**: Done. The task field is `done`, with an All / Active / Done filter.
- **Table widget**: Dropped to protect time for persistence and templates.
- **Ambience widget (audio, play/pause, volume)**: Dropped for the same reason.
- **Journal (write and save notes)**: Partial. Writing works, but notes aren't saved across a refresh.
- **Plain text (editable title and content)**: Partial. The title saves, but the content doesn't persist.

### B. Workspace customization
- **Collapsible sidebar with workspace and appearance controls**: Changed. A floating action bar opens panels for adding widgets, style, and templates, which keeps the workspace uncovered.
- **Background, widget, and text color**: Done, from a preselected palette.
- **Background textures (gradient, grain, glass)**: Not done.
- **Widget opacity slider**: Done, for both the widgets and the page.
- **Typography with size and weight controls**: Not done. The style object has the fields, but there are no controls and nothing applies them.
- **Appearance stored in a structured object and applied consistently**: Done for colors and opacity. Typography isn't applied.
- **Save mechanism for appearance preferences**: Done. Changes autosave to json-server and are included when saving a template.

### C. Templates and saved layouts
- **Several predefined templates (Deep Work, Plan My Day, Reset & Recharge)**: Partial. There is one starter (Deep Work). The others depended on the table and ambience widgets.
- **Templates as configuration objects**: Done (types, titles, settings, and style). Sizes aren't included.
- **Select a template from the sidebar**: Done, from the templates panel.
- **Applying a template keeps existing tasks and notes**: Not met. Applying a template clears the current widgets and their tasks.
- **Name, save, and reload your own layouts**: Done.

### D. Instructions and usability
- **Instructions or help card**: Not done.
- **Empty state when the workspace has no widgets**: Not done. Empty lists do have an empty state.
- **Loading and error states for server-backed data**: Partial. The workspace and lists have them. Template saving and applying don't.
- **Usable on mobile**: Layout done. The fixed action bar still needs checking on small screens.
- **Readable across color, texture, and opacity combinations**: Not done. Some color combinations have poor contrast.

### E. Visual design
- **Cohesive visual design system**: Partial. There is a limited palette and a shared widget shell.
- **Layered gradient backgrounds**: Not done.
- **Subtle textures, borders, and shadows**: Partial. There are shadows and rounded corners only.
- **Restrained transitions and animations**: Not done.
- **Reduced-motion support and sufficient contrast**: Not done.
- **Testing at desktop and mobile widths**: Needs doing.

### Beyond the original checklist
- Per-list task isolation, and deleting a widget also deletes its tasks.
- Debounced autosave for titles and style settings.
- User-saved templates stored in json-server.
- A shared workspace context to remove prop drilling.

## What is persisted
 
- `todos`: tasks, with `title`, `listId`, `done`, `dueTime`
- `widgets`: which widgets exist, their type and title
- `style`: a single object of appearance settings
- `templates`: saved layouts (widget types, titles and style, with no ids and no content)
Removing a list widget also deletes its todos. Applying a template replaces the current session: the old widgets and their tasks are cleared and the template's widgets are created with fresh ids.


## Known limitations and tradeoffs
 
- Text and journal content are held in local state and do not persist across refresh. 
- No drag-and-drop or resizing; widgets sit in fixed columns by type.
- Style choices are preselected options, not free color pickers.

## What I would add with another week
 
- Persist text and journal content with a debounced autosave.
- A progress-tracker widget showing done/total from a list.
- A start/end session flow with a confirmation modal.
- Text styling controls (typeface, heading and body size and weight).
- Sort tasks by time and show a simple day view for time blocking.
- A full accessibility and contrast check across color, opacity and texture combinations, and reduced-motion support.