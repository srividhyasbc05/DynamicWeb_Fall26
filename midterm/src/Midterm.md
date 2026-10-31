# 1. What is your my for?

A customizable digital study space that adapts to students' different study needs, goals, and preferences. Users can combine tools like timers, task lists, journals, and ambient sounds while personalizing the workspace's appearance to create an environment that helps them focus. They can also save and revisit their preferred layouts for different types of study sessions.

# 2. My user story

As a student whose study needs and preferred environments vary depending on the subject or task, I want to customize my digital study space with the tools and visual atmosphere that work best for me, so that I can create a focused environment without switching between multiple apps.

# 3. My developer checklist

## A. Workspace and widgets

- [ ] Create a responsive, grid-based workspace that accommodates different widget sizes.
- [ ] Allow users to add and remove widgets.
- [ ] Allow multiple instances of the same widget type.
- [ ] Allow users to edit widget titles so they can repurpose generic components for different needs.
- [ ] Define default sizes and configurations for each widget type.

### Widget components

- [ ] **Timer**
  - Start, pause, and reset functionality.
  - Allow users to edit the timer duration.
  - Display the remaining time.
- [ ] **List**
  - Allow users to add, edit, complete, and delete items.
  - Allow users to edit the list title.
  - Add a task field that supports the primary user story and persists through JSON Server.
- [ ] **Table**
  - Create an editable table for time blocking or organizing information.
  - Allow users to edit the table title.
- [ ] **Journal**
  - Provide a text area for writing and saving notes.
- [ ] **Ambience**
  - Provide a simple audio player for royalty-free ambient sounds, such as brown noise or rain.
  - Include play/pause and volume controls.
- [ ] **Plain text**
  - Allow users to write a personal intention, quote, prompt, or reminder.
  - Allow users to edit the widget title and text content.

## B. Workspace customization

- [ ] Add a collapsible sidebar containing workspace and appearance controls.
- [ ] Allow users to customize the workspace background color.
- [ ] Allow users to customize widget surface color and text color.
- [ ] Provide a selection of background textures or treatments, such as gradients, grain, and glass.
- [ ] Allow users to adjust widget opacity using a slider.
- [ ] Provide a small selection of typography options, with controls for text size and weight where appropriate.
- [ ] Store appearance preferences in a structured JavaScript object.
- [ ] Apply appearance settings consistently across the workspace.
- [ ] Add a save mechanism for custom appearance preferences.

## C. Templates and saved layouts

- [ ] Create several predefined templates for different study scenarios, such as Deep Work, Plan My Day, and Reset & Recharge.
- [ ] Define templates as reusable configuration objects specifying widget types, titles, sizes, and settings.
- [ ] Allow users to select a template from the sidebar.
- [ ] Ensure that applying a template changes the workspace configuration without deleting existing tasks or notes.
- [ ] If time permits, allow users to name, save, and reload their own layouts using JSON Server.

## D. Instructions and usability

- [ ] Add an instructions card or help section explaining the available widgets and how they can be used.
- [ ] Provide a meaningful empty state when the workspace has no widgets.
- [ ] Provide loading and error states for server-backed data.
- [ ] Ensure that the workspace remains usable on mobile screens.
- [ ] Check that text remains readable across different color, texture, and opacity combinations.

## E. Visual design

- [ ] Establish a cohesive visual design system.
- [ ] Use layered CSS gradients to create a soft, atmospheric background.
- [ ] Use subtle textures, borders, and shadows to distinguish widget surfaces.
- [ ] Add restrained transitions and animations for interactions and visual changes.
- [ ] Respect reduced-motion preferences and maintain sufficient contrast.
- [ ] Test the interface at desktop and mobile widths.