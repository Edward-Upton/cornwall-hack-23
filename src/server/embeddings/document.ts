export declare interface DocumentMetadata {
  fileId: string;
  userIds: string[];
  hash: string;
  pageNumber: number
}
export declare interface Document {
  pageContent: string;
  metadata: DocumentMetadata;
}
