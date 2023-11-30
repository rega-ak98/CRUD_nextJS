import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddDataModal = ({ isOpen, onClose, queryClient }) => {
  const [formData, setFormData] = useState({
    kode: "",
    gelombang: "",
    keterangan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.kode || !formData.gelombang || !formData.keterangan) {
      Swal.fire({
        title: "Error!",
        text: "Data tidak boleh kosong!",
        icon: "error",
        confirmButtonText: "Oke",
        confirmButtonColor: "#FF3A6E",
      });
      return;
    }

    try {
      await axios.post(
        "https://backend-dev.unsia.ac.id/service-data-referensi/api/management/gelombangs",
        formData
      );
      queryClient.invalidateQueries(["pendaftaran"]);
      Swal.fire({
        title: "Good job!",
        text: "Success Save Data!",
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
          text: "Kode atau Gelombang sudah ada sebelumnya!",
          icon: "error",
          confirmButtonText: "Oke",
          confirmButtonColor: "#FF3A6E",
        });
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  return (
    <div
      className={isOpen ? "block fixed z-10 inset-0 overflow-y-auto" : "hidden"}
    >
      {isOpen && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="z-20 bg-white p-8 w-[516px] mx-auto rounded-[16px] shadow-lg">
            <div className="p-1 modal">
              <h2 className="text-[26px] font-semibold mb-2 text-center">
                Gelombang
              </h2>
              <div className="mb-1">
                <label htmlFor="kode" className="block mb-0">
                  Kode
                </label>
                <input
                  type="text"
                  id="kode"
                  name="kode"
                  value={formData.kode}
                  onChange={handleChange}
                  className="border rounded-[8px] p-[8px] w-full font-[14px]"
                />
              </div>
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
      )}
    </div>
  );
};

export default AddDataModal;
