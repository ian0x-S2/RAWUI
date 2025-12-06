export type DocMetadata = {
 title: string;
 description?: string;
 group: string; // Obrigatório para agrupar
 order?: number; // Opcional para ordenação
 published?: boolean;
 componentId?: string;
};

export type DocItem = {
 slug: string;
 metadata: DocMetadata;
};

export type DocGroup = {
 groupName: string;
 items: DocItem[];
};
