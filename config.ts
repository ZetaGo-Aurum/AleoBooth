/**
 * This configuration file provides a secure way to access the API key.
 */

/**
 * Retrieves the Gemini API key from the environment variables.
 *
 * The API key is expected to be set in the `process.env.API_KEY`
 * variable by the execution environment. This is a security best
 * practice to avoid hardcoding secrets in the source code.
 *
 * @returns {string} The API key.
 * @throws {Error} If the API_KEY environment variable is not set.
 */
export function getApiKey(): string {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("FATAL: API_KEY environment variable not found.");
    throw new Error(
      "The Gemini API key is missing. Please ensure it is configured in the environment settings."
    );
  }
  return apiKey;
}
