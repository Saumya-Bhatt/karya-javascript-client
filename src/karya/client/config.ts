import { Protocol } from '../entities/constants.js';

/**
 * Represents the configuration for a client connection.
 * This configuration includes the protocol, host, and port to use for connecting to a server.
 */
export class ClientConfig {
  /** The protocol used for the client connection (e.g., HTTP, HTTPS). */
  protocol: Protocol;

  /** The host or domain name of the server. */
  host: string;

  /** The port number for the connection. */
  port: number;

  /**
   * Creates an instance of the `ClientConfig` class.
   * @param protocol - The protocol to use for the connection (e.g., HTTP, HTTPS).
   * @param host - The host or domain name of the server.
   * @param port - The port number for the connection.
   */
  constructor(protocol: Protocol, host: string, port: number) {
    this.protocol = protocol;
    this.host = host;
    this.port = port;
  }

  /**
   * Returns the base URL for the client connection based on the current configuration.
   * @returns The base URL as a string (e.g., `http://localhost:8080`).
   */
  getBaseUrl(): string {
    return `${this.protocol}://${this.host}:${this.port}`;
  }

  /**
   * Static method to create a default client configuration for development.
   * This will use HTTP as the protocol, 'localhost' as the host, and 8080 as the port.
   * @returns A new instance of `ClientConfig` with development settings.
   */
  static dev(): ClientConfig {
    return new ClientConfig(Protocol.HTTP, 'localhost', 8080);
  }
}
