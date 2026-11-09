# Repository-specific agent instructions

- It's reasonable for agent to ask user for a copy of Sheet1.csv file if existing codebase is insufficient for understanding the input file structure and possible values.
- A request to commit authorizes a local commit only. Never push or publish unless explicitly asked in the current conversation. Treat committing and pushing as separate actions; after a requested commit, stop and report it without pushing.
- Use the Git-configured identity as the commit author. When the user asks to take credit, keep them as author and add Copilot only as a `Co-authored-by` trailer; never replace the author identity with Copilot.
