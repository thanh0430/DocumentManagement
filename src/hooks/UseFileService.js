import { useEffect, useState } from "react";
import fileService from "../sevices/FileService";

const useFileService = (foldersId) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (foldersId) {
      fetchFiles(foldersId);
    }
  }, [foldersId]);

  const fetchFiles = async (foldersId) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fileService.getFiles(foldersId);
      if (response.statusCode === 200) {
        setFiles(response.data);
        setMessage(response.message);
      } else {
        setError(new Error(response.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const createFile = async (newFolder) => {
    setLoading(true);
    try {
      const result = await fileService.createFile(newFolder);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const deleteFile = async (folderId,currentUserId) => {
    setLoading(true);
    try {
      const result = await fileService.deleteFile(folderId, currentUserId);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const searchFiles = async (userId) => {
    setLoading(true);
    try {
      const result = await fileService.searchFile(userId);
      if (result.statusCode === 200) {
        setFiles(result.data);
      } else {
        setError(new Error(result.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const editFile = async (folderId, newName, currentUserId) => {
    setLoading(true);
    try {
      const result = await fileService.EditFile(folderId, newName, currentUserId);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const shareFile = async (Search) => {
    setLoading(true);
    try {
      const result = await fileService.shareFile(Search);
      return result;
    } catch (err) {
      throw new Error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    files,
    loading,
    error,
    message,
    fetchFiles,
    createFile,
    deleteFile,
    searchFiles,
    editFile,
    shareFile
  };
};

export default useFileService;
