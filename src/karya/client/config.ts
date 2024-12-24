import { Protocol } from '../entities/constants.js';

export class ClientConfig {
  /**
   * A configuration class for a Karya API client.
   *
   * This class holds the necessary configuration parameters to connect to the Karya API,
   * including the communication protocol, host, and port. It also provides methods for
   * generating the base URL and for returning a default development configuration.
   *
   * @param protocol The communication protocol (e.g., HTTP or HTTPS).
   * @param host The host or domain name of the API server.
   * @param port The port number used to access the API.
   */
  protocol: Protocol;
  host: string;
  port: number;

  constructor(protocol: Protocol, host: string, port: number) {
    this.protocol = protocol;
    this.host = host;
    this.port = port;
  }

  /**
   * Generates and returns the base URL for the API.
   *
   * The base URL is constructed by combining the protocol, host, and port attributes
   * of the ClientConfig. This is useful for constructing full URLs for API requests.
   *
   * @returns The base URL of the Karya API in the format "<protocol>://<host>:<port>".
   */
  getBaseUrl(): string {
    return `${this.protocol}://${this.host}:${this.port}`;
  }

  /**
   * Returns a default configuration for development purposes.
   *
   * This method returns a configuration that uses HTTP as the protocol, "localhost" as the host,
   * and port 8080. It is intended for use in local development environments where the API is
   * running locally.
   *
   * @returns A ClientConfig instance with predefined values for development.
   */
  static dev(): ClientConfig {
    return new ClientConfig(Protocol.HTTP, 'localhost', 8080);
  }
}
