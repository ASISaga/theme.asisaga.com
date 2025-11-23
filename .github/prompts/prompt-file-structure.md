## Header
The header is formatted as YAML frontmatter with the following fields:

description: A short description of the prompt.
name: The name of the prompt, used after typing / in chat. If not specified, the file name is used.
argument-hint: Optional hint text shown in the chat input field to guide users on how to interact with the prompt.
agent: The agent used for running the prompt: ask, edit, agent (default), or the name of a custom agent.
model: The language model used when running the prompt. If not specified, the currently selected model in model picker is used.
tools: A list of tool or tool set names that are available for this prompt. Can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. To include all tools of an MCP server, use the <server name>/* format.

## Body
The prompt file body contains the prompt text that is sent to the LLM when running the prompt in chat. Provide specific instructions, guidelines, or any other relevant information that you want the AI to follow.

You can reference other workspace files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the prompt file.

To reference agent tools in the body text, use the #tool:<tool-name> syntax. For example, to reference the githubRepo tool, use #tool:githubRepo.

Within a prompt file, you can reference variables by using the ${variableName} syntax. You can reference the following variables:

Workspace variables - ${workspaceFolder}, ${workspaceFolderBasename}
Selection variables - ${selection}, ${selectedText}
File context variables - ${file}, ${fileBasename}, ${fileDirname}, ${fileBasenameNoExtension}
Input variables - ${input:variableName}, ${input:variableName:placeholder} (pass values to the prompt from the chat input field)