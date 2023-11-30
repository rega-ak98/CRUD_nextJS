import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditDataModal = ({ isOpen, onClose, queryClient, dataId }) => {
  const [formData, setFormData] = useState({
    kode: "",
    gelombang: "",
    keterangan: "",
  });

  useEffect(() => {
    if (isOpen && dataId) {
      fetchDataById(dataId);
    }
  }, [isOpen, dataId]);

  const fetchDataById = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-dev.unsia.ac.id/service-data-referensi/api/management/gelombangs/${id}`
      );
      const { kode, gelombang, keterangan } = response.data;

      setFormData({
        ...formData,
        kode,
        gelombang,
        keterangan,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://backend-dev.unsia.ac.id/service-data-referensi/api/management/gelombangs/${dataId}`,
        formData
      );
      queryClient.invalidateQueries(["pendaftaran"]);
      Swal.fire({
        title: "Good job!",
        text: "Success Update Data!",
        icon: "success",
        confirmButtonText: "Oke",
        confirmButtonColor: "#0BD72C",
      });
      setFormData({
        kode: "",
        gelombang: "",
        keterangan: "",
      });
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire({
          title: "Error!",
          text: "Gelombang sudah ada sebelumnya!",
          icon: "error",
          confirmButtonText: "Oke",
          confirmButtonColor: "#FF3A6E",
        });
      } else {
        console.error("Terjadi kesalahan saat update:", error);
      }
    }
  };

  return (
    <div className={isOpen ? "block" : "hidden"}>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="z-20 bg-white p-8 w-[516px] h-[294px] mx-auto rounded-[16px] shadow-lg">
              <div className="p-1 modal">
                <h2 className="text-[26px] font-semibold mb-2 text-center">
                  Edit Gelombang
                </h2>
                <div className="mb-1">
                  <label htmlFor="gelombang" className="block mb-0">
                    Nama Gelombang
                  </label>
                  <input
                    type="text"
                    id="gelombang"
                    name="gelombang"
                    value={formData.gelombang}
                    onChange={handleChange}
                    className="border rounded-[8px] p-[8px] w-full font-[14px]"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="keterangan" className="block mb-0">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    id="keterangan"
                    name="keterangan"
                    value={formData.keterangan}
                    onChange={handleChange}
                    className="border rounded-[8px] p-[8px] w-full font-[14px]"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={onClose}
                    type="button"
                    className="w-[114px] h-[36px] bg-[#FF3A6E] rounded-[4px] text-white me-1 font-[14px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="w-[114px] h-[36px] bg-[#10487A] rounded-[4px] text-white font-[14px]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDataModal;
