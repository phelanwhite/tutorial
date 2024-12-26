import { axiosBase } from "@/configs/axios.config";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

type FileType = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  api_key: string;
};

const UploadPage = () => {
  // single
  const [file, setFile] = useState<File | null>(null);
  const uploadSingleFileResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      const response = await axiosBase.post(`/upload/single`, formData);
      return response.data;
    },
  });

  // array
  const [files, setFiles] = useState<FileList | null>(null);
  const uploadArrayFileResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (files && files?.length > 0) {
        for (const element of files) {
          formData.append("files", element);
        }
      }
      const response = await axiosBase.post(`/upload/array`, formData);
      return response.data;
    },
  });

  // fields
  const [files1, setFiles1] = useState<FileList | null>(null);
  const [files2, setFiles2] = useState<FileList | null>(null);
  const uploadFieldsFileResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (files1 && files1?.length > 0) {
        for (const element of files1) {
          formData.append("files1", element);
        }
      }
      if (files2 && files2?.length > 0) {
        for (const element of files2) {
          formData.append("files2", element);
        }
      }
      const response = await axiosBase.post(`/upload/fields`, formData);
      return response.data;
    },
  });

  // delete
  const [url, setUrl] = useState<string>("");
  const deleteFileResult = useMutation({
    mutationFn: async () => {
      const response = await axiosBase.delete(`/upload/delete?url=${url}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  return (
    <div className="space-y-4">
      {(uploadSingleFileResult.isPending ||
        uploadArrayFileResult.isPending ||
        uploadFieldsFileResult.isPending ||
        deleteFileResult.isPending) && <p>Loading...</p>}

      <div className="space-y-1">
        <h4>Upload single</h4>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] as File)}
        />
        <button onClick={() => uploadSingleFileResult.mutate()}>Upload</button>
        <div className="flex flex-wrap items-center gap-2">
          {uploadSingleFileResult.data?.data && (
            <div
              key={uploadSingleFileResult.data?.data?.url}
              className="aspect-video w-32"
            >
              <img
                src={uploadSingleFileResult.data?.data?.url}
                alt=""
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h4>Upload array</h4>
        <input
          multiple
          type="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button onClick={() => uploadArrayFileResult.mutate()}>Upload</button>
        <div className="flex flex-wrap items-center gap-2">
          {uploadArrayFileResult.data?.data?.map((item: FileType) => (
            <div key={item?.url} className="aspect-video w-32">
              <img src={item?.url} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <h4>Upload fields</h4>
        <input
          multiple
          type="file"
          onChange={(e) => setFiles1(e.target.files)}
        />
        <input
          multiple
          type="file"
          onChange={(e) => setFiles2(e.target.files)}
        />
        <button onClick={() => uploadFieldsFileResult.mutate()}>Upload</button>
        <div className="flex flex-wrap items-center gap-2">
          {uploadFieldsFileResult.data?.data?.files1?.map((item: FileType) => (
            <div key={item?.url} className="aspect-video w-32">
              <img src={item?.url} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {uploadFieldsFileResult.data?.data?.files2?.map((item: FileType) => (
            <div key={item?.url} className="aspect-video w-32">
              <img src={item?.url} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <h4>Delete image</h4>
        <input
          placeholder="Url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={() => deleteFileResult.mutate()}>Delete</button>
      </div>
    </div>
  );
};

export default UploadPage;
