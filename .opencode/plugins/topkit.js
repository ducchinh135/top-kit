import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Top-Kit Plugin for OpenCode
 *
 * Injects the Top-Kit bootstrap into the first user message
 * and registers the skills directory.
 *
 * Installation:
 *   1. Copy .opencode/plugins/topkit.js to your project
 *   2. Skills are auto-discovered from skills/ directory
 */
export const TopKitPlugin = async ({ project, client, $, directory, worktree }) => {
  const skillsDir = join(directory, 'skills');
  const bootstrapFile = join(skillsDir, 'using-topkit', 'SKILL.md');

  let bootstrapContent = null;

  return {
    /**
     * Config hook: Add Top-Kit skills directory to OpenCode's skill paths
     */
    config: async (config) => {
      if (config.skills?.paths) {
        config.skills.paths.push(skillsDir);
      }
      return config;
    },

    /**
     * Message transform hook: Inject bootstrap into first user message
     */
    'experimental.chat.messages.transform': async (_input, output) => {
      // Only inject once per session
      if (bootstrapContent === null) {
        try {
          bootstrapContent = readFileSync(bootstrapFile, 'utf-8');
          // Strip YAML frontmatter
          bootstrapContent = bootstrapContent.replace(/^---[\s\S]*?---\n/, '');
        } catch (err) {
          console.error('[topkit] Failed to read bootstrap file:', err.message);
          return output;
        }
      }

      if (output.messages.length === 0) return output;

      // Find the first user message
      const firstUserIdx = output.messages.findIndex(m => m.role === 'user');
      if (firstUserIdx === -1) return output;

      // Inject bootstrap context
      const originalContent = output.messages[firstUserIdx].content;
      output.messages[firstUserIdx].content =
        `<EXTREMELY_IMPORTANT>\n${bootstrapContent}\n</EXTREMELY_IMPORTANT>\n\n${originalContent}`;

      return output;
    }
  };
};

export default TopKitPlugin;
