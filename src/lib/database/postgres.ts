import postgres from "postgres";

type DatabaseConfig = {
  host: string;
  port: string;
  databaseName: string;
  username: string;
  password: string;
};

export function createPostgresClient(config: DatabaseConfig) {
  const isLocal = config.host === "localhost" || config.host === "127.0.0.1";

  return postgres({
    host: config.host,
    port: Number(config.port),
    database: config.databaseName,
    username: config.username,
    password: config.password,
    max: 1,
    connect_timeout: 5,
    ssl: isLocal ? false : "require",
    prepare: false, // Required for PgBouncer/Transaction poolers to work
  });
}
