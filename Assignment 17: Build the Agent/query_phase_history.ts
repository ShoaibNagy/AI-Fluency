export const queryPhaseHistory: Tool = {
  name: "query_phase_history",
  description: "Retrieve historical phase advancement patterns for a project.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string", description: "The ID of the project" },
      limit: { type: "number", description: "Number of records to return", default: 10 }
    },
    required: ["projectId"]
  },
  execute: async (args: { projectId: string; limit?: number }) => {
    const result = await db.query(
      `SELECT phase, status, changed_at, changed_by 
       FROM phase_history 
       WHERE project_id = $1 
       ORDER BY changed_at DESC 
       LIMIT $2`,
      [args.projectId, args.limit || 10]
    );
    return result.rows;
  }
};