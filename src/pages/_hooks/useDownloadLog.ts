import ENV from '@/env';
import { useAuth } from '@/auth/hook';

type FileData = {
  file: string;
  file_name: string;
};

export const useDownloadLog = () => {
  const auth = useAuth();

  const handleDownloadLog = async (job_id: string) => {
    try {
      const res = await fetch(`${ENV.API_ENDPOINT}/jobs/${job_id}/sselog`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: 'Bearer ' + auth.idToken,
        },
      });
      if (!res.ok) {
        if (res.status === 404) {
          alert('Log file does not exist');
          return;
        } else {
          alert('Failed to download log');
          return;
        }
      }

      const data: FileData = await res.json();
      const binaryStr = atob(data.file);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data.file_name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      alert('Failed to download log');
    }
  };

  return { handleDownloadLog };
};
