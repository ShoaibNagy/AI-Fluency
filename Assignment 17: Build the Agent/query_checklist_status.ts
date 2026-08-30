export const queryChecklistStatus: Tool = {
  name: "query_checklist_status",
  description: "Retrieve completion status of all checklist items for a phase.",
  inputSchema: {
    type: "object",
    properties: {
      phase: { type: "string", description: "The phase name" },
      projectId: { type: "string", description: "The ID of the project" }
    },
    required: ["phase", "projectId"]
  },
  execute: async (args: { phase: string; projectId: string }) => {
    const result = await db.query(
      `SELECT id, description, is_complete, is_mandatory 
       FROM checklist_items 
       WHERE phase = $1 AND project_id = $2`,
      [args.phase, args.projectId]
    );
    return result.rows;
  }
};