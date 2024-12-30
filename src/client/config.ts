/**
 * Represents the configuration for a client connection.
 * This configuration includes the protocol, host, and port to use for connecting to a server.
 */
export class ClientConfig {
  /** The url object */
  url: URL;

  /**
   * Creates an instance of the `ClientConfig` class.
   * @param url - The URL object containing the protocol, host, and port to use for the client connection.
   */
  constructor(url: URL) {
    this.url = url;
  }

  /**
   * Static method to create a default client configuration for development.
   * This will use HTTP as the protocol, 'localhost' as the host, and 8080 as the port.
   * @returns A new instance of `ClientConfig` with development settings.
   */
  static dev(): ClientConfig {
    return new ClientConfig(new URL('http://localhost:8080'));
  }
}
