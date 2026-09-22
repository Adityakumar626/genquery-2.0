export type DatabaseColumn = {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  references?: {
    table: string;
    column: string;
  };
};

export type DatabaseTable = {
  schema: string;
  name: string;
  columns: DatabaseColumn[];
};

export type DatabaseSchema = {
  tables: DatabaseTable[];
};
