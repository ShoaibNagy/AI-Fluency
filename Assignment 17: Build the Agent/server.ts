// src/server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { queryPhaseProgress, queryChecklistStatus, queryPhaseHistory } from "./tools/phaseTools.js";

const server = new McpServer({
  name: "phase-gate-validator",
  version: "1.0.0"
});

server.tool(
  "query_phase_progress",
  "Retrieve the current phase state for a project.",
  { projectId: z.string() },
  async ({ projectId }) => {
    const result = await queryPhaseProgress.execute({ projectId });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "query_checklist_status",
  "Retrieve completion status of all checklist items for a phase.",
  { phase: z.string(), projectId: z.string() },
  async ({ phase, projectId }) => {
    const result = await queryChecklistStatus.execute({ phase, projectId });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "query_phase_history",
  "Retrieve historical phase advancement patterns.",
  { projectId: z.string(), limit: z.number().optional().default(10) },
  async ({ projectId, limit }) => {
    const result = await queryPhaseHistory.execute({ projectId, limit });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);