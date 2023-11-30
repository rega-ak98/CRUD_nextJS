import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaAngleDown, FaEdit, FaRegEye, FaTrashAlt } from "react-icons/fa";
import styles from "./RegistrationTable.module.css";
import { FaFileImport, FaNetworkWired } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa6";
import ViewModal from "./ViewModal";
import AddDataModal from "./AddDataModal";
import EditDataModal from "./EditDataModal";
import ImportDataModal from "./ImportDataModal";
import { FaPlus, FaArrowDownShortWide } from "react-icons/fa6";

const postTodo = async () => {
  try {
    const response = await fetch(
      "https://backend-dev.unsia.ac.id/service-data-referensi/api/management/gelombangs?page=&per_page=&kode=&gelombang=&keterangan=",
      {
        method: "GET",
      }
    );

    return response.json();
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error.message}`);
  }
};

const RegistrationTable = () => {
  // Access the client

  // Queries
  const { data } = useQuery({ queryKey: ["pendaftaran"], queryFn: postTodo });
  const queryClient = useQueryClient();

  const [setFormData] = useState({
    id: "",
    kode: "",
    gelombang: "",
    keterangan: "",
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#0BD72C",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://backend-dev.unsia.ac.id/service-data-referensi/api/management/gelombangs/${id}`
          );
          queryClient.invalidateQueries(["pendaftaran"]);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonText: "Oke",
            confirmButtonColor: "#0BD72C",
          });
        } catch (error) {
          console.error("Terjadi kesalahan saat menghapus:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the file.",
            icon: "error",
          });
        }
      }
    });
  };

  const getDataById = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-dev.unsia.ac.id/service-data-referensi/api/management/gelombangs/${id}`
      );
      const { kode, gelombang, keterangan, id: dataId } = response.data;

      setFormData({
        id: dataId,
        kode,
        gelombang,
        keterangan,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
    setIsEditModalOpen(false);
  };

  const toggleEditModal = async (id) => {
    setIsEditModalOpen(!isEditModalOpen);
    setIsAddModalOpen(false);

    if (id) {
      setUpdateId(id);
      await getDataById(id);
    } else {
      setUpdateId(null);
      setFormData({
        id: "",
        kode: "",
        gelombang: "",
        keterangan: "",
      });
    }
  };

  const [updateId, setUpdateId] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState({});

  const toggleViewModal = (id) => {
    const selectedData = data?.data?.data.find((todo) => todo.id === id);

    setViewData(selectedData);
    setIsViewModalOpen(!isViewModalOpen);
  };

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const toggleImportModal = () => {
    setIsImportModalOpen(!isImportModalOpen);
  };

  return (
    <div className=" h-[100vh] bg-[#CCCCCC]">
      <div className="mx-auto w-[1200px]">
        <h1 className="text-[26px] text-[#333333] font-semibold py-3 flex">
          <FaNetworkWired className="my-auto me-1" /> Pendaftaran
        </h1>
        <div className=" p-5 bg-[#ffffff] rounded-[8px]">
          <div className="flex justify-between mb-3">
            <h2 className="text-[20px] text-[#333333] my-auto">Gelombang</h2>
            <h3 className="text-[14px] text-[#999999] flex my-auto">
              <FaArrowDownShortWide className="me-3 my-auto" />
              Short By <FaAngleDown className="mt-1 ms-3 me-5" />
            </h3>
          </div>
          <hr class="w-full border-t-2 border-[#CCCCCC] mb-3" />
          <div className="flex">
            <button
              onClick={() => toggleAddModal()}
              className="flex w-[104px] font-[14px] text-[#999999] border-[2px] p-1 rounded-[4px] me-3"
            >
              <FaPlus className="w-5 h-5 me-2" /> Tambah
            </button>
            <button
              onClick={toggleImportModal}
              className="flex w-[104px] font-[14px] text-[#999999] border-[2px] p-1 rounded-[4px] me-3"
            >
              <FaFileImport className="w-5 h-5 me-2" /> Import
            </button>
            <button
              onClick={() => toggleAddModal()}
              className="flex w-[104px] font-[14px] text-[#999999] border-[2px] p-1 rounded-[4px] me-3"
            >
              <FaFileExport className="w-5 h-5 me-2" /> Export
            </button>
          </div>

          <div className={styles.userList}>
            <div className="py-2">
              <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-md">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Kode Gelombang
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Gelombang
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Keterangan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.data?.map((todo, index) => (
                      <tr
                        className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-gray-100"
                        key={todo.id}
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{todo.kode}</td>
                        <td className="px-6 py-4">{todo.gelombang}</td>
                        <td className="px-6 py-4">{todo.keterangan}</td>
                        <td className="px-6 py-4 cursor-pointer flex">
                          {/* <button onClick={() => handleUpdate(todo.id, formData)}>
                        <FaEdit className="w-5 h-5" />
                      </button> */}
                          <button onClick={() => toggleEditModal(todo.id)}>
                            <FaEdit className="w-5 h-5" />
                          </button>
                          <button onClick={() => toggleViewModal(todo.id)}>
                            <FaRegEye className="w-5 h-5 mx-2" />
                          </button>
                          <button onClick={() => handleDelete(todo.id)}>
                            <FaTrashAlt className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {isAddModalOpen && (
            <AddDataModal
              isOpen={isAddModalOpen}
              onClose={toggleAddModal}
              queryClient={queryClient}
            />
          )}

          {isEditModalOpen && (
            <EditDataModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              queryClient={queryClient}
              dataId={updateId}
            />
          )}

          {isViewModalOpen && (
            <ViewModal
              data={viewData}
              onClose={() => setIsViewModalOpen(false)}
            />
          )}

          {isImportModalOpen && (
            <ImportDataModal
              isOpen={isImportModalOpen}
              onClose={toggleImportModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationTable;
