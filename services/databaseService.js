import { database } from "./appwrite";

const databaseService = {
  // Lists Documents
  async listDocuments(dbID, colID, queries = []) {
    try {
      console.log(
        `Attempting to fetch documents from DB: ${dbID}, Collection: ${colID}`
      );
      const response = await database.listDocuments(dbID, colID, queries);
      return { data: response.documents || [], error: null };
    } catch (error) {
      console.error("Error fetching documents:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return { error: error.message };
    }
  },
  // Create Documents
  async createDocument(dbID, colId, data, id = null) {
    try {
      return await database.createDocument(dbID, colId, id || undefined, data);
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },
  // Update Document
  async updateDocument(dbID, colId, id, data) {
    try {
      return await database.updateDocument(dbID, colId, id, data);
    } catch (error) {
      console.error("Error updating document:", error.message);
      return { error: error.message };
    }
  },
  // Delete Document
  async deleteDocument(dbID, colId, id) {
    try {
      await database.deleteDocument(dbID, colId, id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
