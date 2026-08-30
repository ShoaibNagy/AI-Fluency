// src/tools/phaseTools.ts
export const queryPhaseProgress: Tool = {
  name: "query_phase_progress",
  description: "Retrieve the current phase state for a project.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string", description: "The ID of the project" }
    },
    required: ["projectId"]
  },
  execute: async (args: { projectId: string }) => {
    const result = await db.query(
      "SELECT phase, status, started_at FROM phase_progress WHERE project_id = $1",
      [args.projectId]
    );
    return result.rows[0] || { error: "Project not found" };
  }
};