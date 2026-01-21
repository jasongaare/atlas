/**
 * Type definitions for the Atlas stats export format.
 *
 * The stats file (`.expo/atlas-stats.json`) is a lightweight CI-friendly version of
 * the full atlas.jsonl output. It contains package-level size aggregations optimized
 * for diffing and scripting in CI/CD workflows.
 *
 * @example
 * ```json
 * [
 *   {
 *     "platform": "ios",
 *     "environment": "client",
 *     "entryPoint": "/path/to/app/index.js",
 *     "bundleSize": 2458624,
 *     "packages": {
 *       "react": 85234,
 *       "react-native": 456789,
 *       "expo": 123456,
 *       "@company/ui-lib": 234567,
 *       "app": 987654
 *     }
 *   }
 * ]
 * ```
 */

/**
 * Root type for the atlas-stats.json file.
 * Contains an array of bundle stats, one per bundle in the export.
 */
export type AtlasStatsFile = AtlasStatsBundle[];

/**
 * Stats for a single bundle, containing package-level size aggregations.
 *
 * Each bundle in the export (e.g., iOS, Android, different environments)
 * gets its own stats entry with metadata and package size totals.
 */
export type AtlasStatsBundle = {
  /**
   * Target platform for this bundle.
   * Matches the platform specified in Metro's serialization options.
   */
  platform: 'ios' | 'android' | 'web' | 'unknown';

  /**
   * Runtime environment for this bundle.
   * - "client": Standard React Native client bundle
   * - "node": Server-side bundle for Node.js environments
   * - "react-server": React Server Components bundle
   * - "dom": DOM-based web bundle
   */
  environment: 'client' | 'node' | 'react-server' | 'dom';

  /**
   * Absolute path to the bundle's entry point file.
   * This is the starting file from which Metro builds the dependency graph.
   */
  entryPoint: string;

  /**
   * Total size of the entire bundle in bytes (transformed output).
   * This equals the sum of all package sizes.
   */
  bundleSize: number;

  /**
   * Package-level size aggregations.
   *
   * Maps each NPM package (or "app" for local code) to its total size in bytes.
   * Sizes represent transformed/bundled output after Metro processing.
   *
   * Package names are sorted alphabetically for diff-friendly output.
   *
   * @example
   * ```json
   * {
   *   "@babel/runtime": 12345,
   *   "app": 987654,
   *   "expo": 123456,
   *   "react": 85234,
   *   "react-native": 456789
   * }
   * ```
   */
  packages: Record<string, number>;
};
