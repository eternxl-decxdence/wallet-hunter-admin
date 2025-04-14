export interface User {
  username: string;
  password: string;
  subscription: Date;
  createdAt: Date;
  servers: Array<Server>;
  serverCount?: number;
  foundCount?: number;
}
interface Server {
  serverName: string;
  setupSettings: SetupSettings; //null if serverName: 'local'
  stats: ServerStats;
  lastActive: Date;
  startedAt: Date;
  founds: Array<Found>;
}
interface ServerStats {
  addressesPerHour: number;
  requestsPerHour: number;
  totalAddresses: number;
  totalRequests: number;
}

interface SetupSettings {
  maxThreads: number;
  batchSize: number;
}

export interface Found {
  address: string;
  seedPhrase: string;
  balance: string;
}
