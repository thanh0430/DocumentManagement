import { useEffect, useState } from "react";
import folderService from "../sevices/FolderService";
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const useFolderService = (currentUserId) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (currentUserId) {
      fetchFolders(currentUserId);
    }
  }, [currentUserId]);

  const fetchFolders = async (userId) => {
    setLoading(true);
    try {
      const response = await folderService.getFolders(userId);
      if (response.statusCode === 200) {
        setFolders(response.data);
      } else {
        setError(new Error(response.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async (newFolder) => {
    setLoading(true);
    try {
      const result = await folderService.createFolder(newFolder);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const deleteFolder = async (folderId,currentUserId) => {
    setLoading(true);
    try {
      const result = await folderService.deleteFolder(folderId, currentUserId);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const searchFolders = async (userId) => {
    setLoading(true);
    try {
      const result = await folderService.searchFolder(userId);
      if (result.statusCode === 200) {
        setFolders(result.data);
      } else {
        setError(new Error(result.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const editFolder = async (folderId, newName, currentUserId) => {
    setLoading(true);
    try {
      const result = await folderService.EditFolder(folderId, newName, currentUserId);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const shareFolder = async (Search) => {
    setLoading(true);
    try {
      const result = await folderService.shareFolder(Search);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    folders,
    loading,
    error,
    message,
    fetchFolders,
    createFolder,
    deleteFolder,
    searchFolders,
    editFolder,
    shareFolder
  };
};

export default useFolderService;
