# Task

### Properties

- `title`, string: Title / name of the task, short text.
- `description`, string: Longer text, used to describe the task.
- `state`, string: Used to represent the current state of the task, e.g. `todo`, `blocked`, `done`.
  Open for discussion: Static status vs dynamically calculated status?

### Relations

- `(:User)-[:CREATED]->(:Task)`
- `(:User|Group|Organisation)-[:OWNS]->(:Task)`
- `(:User)-[:WATCHES]->(:Task)`



- `(:Task)-[:HAS_TASK]->(:Task)`
  `HAS_TAG` can have the following properties:
  - `required`, bool: Used to mark a sub task as optional or required.
- `(:Task)-[:HAS_TAG]->(:Tag)`
- `(:Task)-[:IS_ASSIGNED_TO]->(:User|Group|Organisation)`
- `(:Task)-[:DEPENDS_ON]->(:Task)`
  Used for dependencies between non hierarchical tasks. Tasks dependent upon are implicitly marked as required. For optional tasks use `:RELATES_TO`.
- `(:Task)-[:RELATES_TO]->(:Task)`
  Used for any other relationships between tasks.











