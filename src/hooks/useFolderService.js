import { useEffect, useState } from 'react';
import folderService from '../sevices/FolderService';

const useFolderService = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const response = await folderService.getFolders();
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
    setError(null);
    try {
      const result = await folderService.createFolder(newFolder);
      if (result.statusCode === 201) {
        setMessage(result.message);
        fetchFolders();
      } else {
        setError(new Error(result.message));
      }
    } catch (err) {
      setError(new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const deleteFolder = async (folderId) => {
    setLoading(true);
    try {
      const result = await folderService.deleteFolder(folderId);
      if (result.statusCode === 204) {
        setMessage(result.message);
        fetchFolders(); 
      } else {
        setError(new Error(result.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    folders,loading,error,message,fetchFolders,createFolder,deleteFolder,
  };
};

export default useFolderService;
